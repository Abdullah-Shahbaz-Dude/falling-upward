# Falling Upward - Backend Files

This directory contains backend code that has been moved from the Next.js application to be implemented as a separate Node.js backend service.

## Directory Structure

- `/api` - API route handlers from Next.js
- `/lib` - Database connection and mock database utilities
- `/models` - Mongoose models for MongoDB
- `/admin` - Admin-related functionality
- `/app` - App-specific components (workbooks, etc.)

## Setting Up the Node.js Backend

1. Create a new directory for your Node.js backend:
   ```
   mkdir falling-upward-backend
   cd falling-upward-backend
   ```

2. Initialize a new Node.js project:
   ```
   npm init -y
   ```

3. Install required dependencies:
   ```
   npm install express mongoose dotenv cors bcrypt jsonwebtoken nodemailer multer
   npm install --save-dev typescript ts-node @types/express @types/node @types/mongoose @types/cors @types/bcrypt @types/jsonwebtoken @types/nodemailer @types/multer
   ```

4. Create a TypeScript configuration file:
   ```
   npx tsc --init
   ```

5. Set up your environment variables in a `.env` file:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_email_app_password
   CORS_ORIGIN=http://localhost:3000
   ```

6. Create the following directory structure:
   ```
   src/
   ├── config/
   ├── controllers/
   ├── middleware/
   ├── models/
   ├── routes/
   ├── services/
   ├── types/
   ├── utils/
   └── app.ts
   ```

7. Implement the Express.js app in `app.ts`

8. Migrate the models from the provided files in `/models`

9. Create API routes based on the route handlers in `/api`

10. Implement authentication middleware

11. Set up the workbook system and assignment functionality

## Features to Implement

1. User Authentication
   - Registration
   - Login
   - JWT Token management

2. Workbook Management
   - Create workbooks
   - Assign workbooks to users
   - Track workbook progress
   - Submit workbooks
   - Review workbooks

3. Appointment Scheduling
   - Create appointments
   - Manage appointment status

4. Email Notifications
   - Appointment confirmations
   - Workbook assignments
   - Feedback notifications

5. Admin Dashboard
   - User management
   - Workbook overview
   - Appointment tracking

## Connecting to the Next.js Frontend

Update your Next.js frontend to make API calls to the Node.js backend instead of using Next.js API routes. Replace calls like `/api/workbooks` with `http://localhost:5000/api/workbooks` (or your production backend URL).

## Deployment

For production, deploy your Node.js backend separately from your Next.js frontend. Options include:

- Heroku
- DigitalOcean App Platform
- AWS EC2/ECS
- Google Cloud Run
- Vercel (Frontend) + Backend Hosting Service 