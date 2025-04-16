# Falling Upward - Physiotherapy Consultation Website

Falling Upward is a comprehensive physiotherapy consultation website built with Next.js, featuring user authentication, appointment booking, admin dashboard, and workbook management.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Features

- **User Authentication**: Secure login and registration system with role-based access control
- **Appointment Booking**: Online booking system for physiotherapy consultations
- **Admin Dashboard**: Comprehensive dashboard for managing appointments, users, and workbooks
- **Workbook Management**: System for assigning and tracking patient workbooks and exercises
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **MongoDB Integration**: Data storage and retrieval using MongoDB and Mongoose

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - Reusable UI components
- `/lib` - Utility functions and configuration
- `/models` - MongoDB schema definitions
- `/public` - Static assets
- `/types` - TypeScript type definitions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# falling-upward
