import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing email or password');
          throw new Error("Invalid credentials");
        }

        try {
          await connectDB();
          console.log(`Attempting to authenticate user: ${credentials.email}`);

          // For mock database, we handle this differently
          const isUsingMockDb = process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI;
          console.log(`Using mock database: ${isUsingMockDb}`);
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            console.log(`User not found: ${credentials.email}`);
            throw new Error("Invalid credentials");
          }

          console.log(`User found: ${user.name}, role: ${user.role}`);

          // For mock database users, accept any password in development mode
          let isPasswordCorrect = false;
          
          if (isUsingMockDb) {
            // In development mode, accept 'password123' for all mock users
            isPasswordCorrect = credentials.password === 'password123';
            console.log(`Mock DB password check: ${isPasswordCorrect}`);
            
            // If the password is not 'password123', try using the comparePassword method
            if (!isPasswordCorrect && typeof user.comparePassword === 'function') {
              try {
                isPasswordCorrect = await user.comparePassword(credentials.password);
                console.log(`Mock DB comparePassword method check: ${isPasswordCorrect}`);
              } catch (err) {
                console.error('Error using comparePassword method:', err);
              }
            }
          } else {
            // Real database comparison
            isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            console.log(`Real DB password check: ${isPasswordCorrect}`);
          }

          if (!isPasswordCorrect) {
            console.log('Password incorrect');
            throw new Error("Invalid credentials");
          }

          console.log(`Authentication successful for: ${user.email}, role: ${user.role}`);
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error("Authentication failed");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Ensure user ID and role are properly set in the token
        token.id = user.id;
        token.role = user.role;
        // Add additional logging for debugging
        console.log('JWT callback - Setting token:', { id: user.id, role: user.role });
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // Ensure user ID and role are properly set in the session
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        // Add additional logging for debugging
        console.log('Session callback - Setting session:', { id: token.id, role: token.role });
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallingupsecret",
};
