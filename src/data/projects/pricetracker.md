---
title: "Price Tracker - Automated  Price Tracker"
description: "An open-source web application that allows users to monitor product prices from e-commerce platforms. It enables users to track price changes over time, receive updates, and make smarter purchasing decisions through automated tracking and data visualization features."
image: "/projects/trackhatke.avif"
technologies:
  - TypeScript
  - Firecrawl
  - Next.js
  - SupaBase
github: "https://github.com/sahilcodexx/price-tracker"
live: "https://trackhatke.vercel.app/"
timeline: "2 months"
role: "Full-Stack Developer"
team: "Solo Project"
status: "In Development"
featured: true
challenges:
  - "Reliable Web Scraping Across Different E-commerce Sites"
  - "Real-time Data Synchronization and Cron Job Management"
  - "Database Schema Design for Historical Price Data"
  - "Implementing a Robust User Notification System"
learnings:
  - "Advanced Web Scraping Techniques with Firecrawl"
  - "Full-stack Application Development with Next.js Server Actions"
  - "Serverless Database Management and Authentication with Supabase"
  - "Building Data-Intensive, User-Facing Applications"
isPublished: true
---

# Price Tracker: Your Smart Shopping Assistant

**Price Tracker** is a powerful, open-source web application designed to help you save money by monitoring product prices from your favorite e-commerce websites.

In a world of fluctuating online prices, this tool empowers users to make informed purchasing decisions. By automatically tracking price changes, visualizing historical data, and sending timely alerts, Price Tracker ensures you never miss a good deal.

This project showcases a full-stack architecture using modern, serverless-first technologies to build a scalable and efficient data-driven application.

---

## What Users Can Do

- **Track Any Product**: Simply paste a product URL to start monitoring its price.
- **View Price History**: Analyze beautiful, interactive charts showing how a product's price has changed over time.
- **Get Price Drop Alerts**: Receive email notifications as soon as a tracked product's price drops.
- **Set Target Prices**: Define a desired price for a product and get notified when it's reached.
- **Manage a Personal Watchlist**: Keep all your tracked products organized in a personal, secure dashboard.
- **Discover Trends**: Identify the best times to buy certain products based on historical data patterns.
- **No Manual Checking**: The app automates the entire process of checking prices daily.

---

## Key Features

- **Automated Web Scraping**: Utilizes **Firecrawl** to reliably parse and extract product information (name, price, currency, image) from complex e-commerce sites.
- **Scheduled Data Fetching**: Implements cron jobs or scheduled serverless functions to automatically update prices for all tracked products on a regular basis.
- **Secure User Authentication**: Leverages **Supabase Auth** to provide secure user accounts, allowing users to manage their own private list of tracked products.
- **Historical Data Visualization**: Renders price history using modern charting libraries to give users clear insights into price trends.
- **Robust Notification System**: Integrates with an email service to send out customized alerts for price drops and target price achievements.
- **Full-Stack Next.js Architecture**: Built entirely with **Next.js**, using Server Actions and API routes for backend logic and React Server Components for a fast, dynamic frontend.
- **PostgreSQL Database**: Uses a **Supabase** PostgreSQL database to efficiently store user data, product information, and historical price entries.

---

## Why I Built This

- To solve a personal need for a simple, effective tool to **avoid overpaying for online purchases**.
- To explore the challenges of **large-scale, automated web scraping** and data management.
- To deepen my skills in building **full-stack, data-intensive applications** with a modern, serverless-focused tech stack.
- To create a practical, open-source project that others can use, contribute to, and learn from.
- To experiment with the power of Next.js App Router, Server Actions, and serverless platforms like Supabase.

---

## Tech Stack

### Frontend & Backend

- **Next.js**: The core framework, used for building the React-based frontend, server-side rendering (SSR), and all backend logic via API routes and Server Actions.
- **TypeScript**: Ensures type safety and improves developer experience across the entire codebase, from frontend components to backend logic.
- **Tailwind CSS**: For utility-first styling, enabling rapid development of a clean and responsive user interface.

### Data & Infrastructure

- **Supabase**: The all-in-one backend platform providing:
    - **PostgreSQL Database**: For storing users, products, and price history.
    - **Authentication**: For managing secure user sign-up and login.
    - **Serverless Functions**: (Potential use for) running scheduled tasks for price checking.
- **Firecrawl**: A specialized, AI-powered scraping service used to reliably extract structured data from any website, handling complexities like JavaScript rendering and anti-scraping measures.
- **Vercel**: The primary platform for deploying and hosting the Next.js application, offering seamless integration and scalability.

---

## Development Experience

### Architecting the Data Model
Designing the database schema in Supabase was a critical first step. I focused on creating normalized tables for `users`, `products`, and a `price_history` table to efficiently store timestamped price data. This structure allows for flexible querying and analysis of price trends over time.

### Building the Scraping Engine
The biggest challenge was reliably extracting data from diverse e-commerce sites. Integrating Firecrawl solved this by offloading the complexities of scraping. The backend logic focuses on managing Firecrawl API calls, validating the returned data, and storing it in the database.

### Implementing User-Facing Features
With the data infrastructure in place, I used Next.js and React Server Components to build the user dashboard. Server Actions were used extensively to handle form submissions for adding new products and managing the user's watchlist, leading to a seamless and interactive user experience with minimal client-side JavaScript.

---

## Future Enhancements

- **Multi-Platform Support**: Add support for a wider range of e-commerce websites.
- **Browser Extension**: Create a companion browser extension to add products to the watchlist directly from the product page.
- **Advanced Analytics**: Provide users with more detailed insights, such as "best time to buy" predictions.
- **Social Sharing**: Allow users to share their tracked product lists or great deals with friends.
- **Price Comparison**: Compare prices for the same product across different retailers.
- **Support for More Currencies**: Expand the application to be more useful for international users.

---

## Key Learnings

- **End-to-End Full-Stack Development**: Gained extensive experience building a complete application from database design to frontend deployment using Next.js and Supabase.
- **Resilient Web Scraping**: Learned the importance of using specialized services like Firecrawl for robust data extraction instead of building fragile, site-specific scrapers.
- **Serverless-First Mindset**: Embraced a serverless architecture, which reduces infrastructure management overhead and improves scalability.
- **Data-Driven UX**: Focused on how to best present complex historical data to users in a way that is intuitive and actionable.