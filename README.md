# 📰 Newspaper Website

A **full-stack news publishing platform** built with **Next.js, Prisma, MongoDB, and Tailwind CSS**, deployed on **Vercel**.  
It allows admins and editors to manage articles, upload daily e-papers, set breaking news banners, and provide readers with category-based filtering and search features.

🌐 **Live Demo:** [Visit Here](https://newspaper-cfnt.vercel.app/)

---

## ✨ Features

- 🔑 **Authentication & Role-Based Access**
  - Built with **NextAuth.js (Credentials Provider)**
  - Roles: `admin`, `editor`, `user`
  - Secure session management with JWT

- 📰 **Article Management (CRUD)**
  - Create, edit, and delete articles
  - Articles include **title, description, content, image, category, author**
  - Images uploaded to **Cloudinary**

- 📂 **Category-Based Filtering**
  - Users can browse articles by category (e.g., Politics, Sports, Business, Travel)

- 📑 **E-Newspaper (PDF Upload)**
  - Admin can upload a **daily e-paper PDF** using UploadThing
  - Old PDF automatically removed, only latest one available
  - Users can download via navbar

- 🚨 **Breaking News Banner**
  - Admin sets breaking news with expiration (days/minutes)
  - Auto-expires and disappears after set time

- 🔍 **Search Functionality**
  - Search by keywords in **title/description**
  - Supports date-based queries (e.g., *21 June 2025*)
  - Fuzzy and partial search supported

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React, Tailwind CSS, Shadcn UI
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** MongoDB
- **Authentication:** NextAuth.js (JWT sessions)
- **File Uploads:** UploadThing (PDF), Cloudinary (Images)
- **Hosting:** Vercel

---

## 🚀 Getting Started (Local Setup)

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Newspaper.git
   cd Newspaper


Install dependencies
Write "npm install" command on your terminal


Setup Environment Variables
Create a .env.local file in the root directory and add:


DATABASE_URL="your-mongodb-url"
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-secret"
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

Run the development server
npm run dev
