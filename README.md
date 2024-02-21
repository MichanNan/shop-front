# Overview
This is an online shop website that provide a mount of knitting projects from myself. You can register and login to explore all the products, add to shopping cart and use stripe to place your order. At user account you can also check all your orders.

## Demo
[Check the deployment](https://shop-front-sor7.vercel.app/)

## Tech Stack
- react
- React Hooks
- Next.js
- Node.js
- NextAuth
- MongoDB Atlas
- prisma
- tailwind
- npm
- stripe

## Getting Started
- clone this repository
- install all npm dependencies npm install
- to run the app in development mode npm run dev, then open http://localhost:3000 to view it in the browser
- to run React Testing Library & Jest npm test
- You need to add
  - NEXT_PUBLIC_API_URL
  - NEXT_PUBLIC_ORDER_API_URL
  - NEXTAUTH_URL
  - DATABASE_URL
  - STRIPE_API_KEY
  - FRONTEND_STORE_URL
 to .env.local - please check to have added env.local in your .gitignore

