---
title: "ChefyAI: AI-Powered Recipe Generator"
description: "Type in whatever’s in your fridge, get back a recipe. React + Framer Motion on the front, Puter.js for the AI call and client-side storage."
image: "https://raw.githubusercontent.com/sahilcodexx/ai-recipe/refs/heads/main/public/stage-1768141052622.webp"
technologies:
  - React
  - Tailwind CSS
  - Framer Motion
  - Lucide Icons
  - Puter.js
  - Vite
github: "https://github.com/sahilcodexx/ai-recipe"
live: "https://chefyai.vercel.app/"
timeline: "1 month"
role: "Frontend Developer"
team: "Solo Project"
status: "Completed"
featured: true
challenges:
  - AI Integration
  - Smooth UI Animations
  - Client-side DB Architecture
learnings:
  - AI-first UX design
  - Advanced React Animations
  - Lightweight NoSQL integration
isPublished: true
---

# ChefyAI: AI-Powered Recipe Generator

ChefyAI is a web app that generates recipes from whatever ingredients you have on hand. You type in a prompt, the AI returns a full recipe with steps, ingredients, and timing. Recipes save to a client-side database so you can come back to them later.

I built it because I kept ending up with half a bag of something and no idea what to do with it. Most recipe apps assume I already know what I want to cook. I wanted one that worked from whatever was in the fridge.

---

## What users can do

- **Instant recipe generation.** Enter a prompt or idea, receive a custom AI-generated recipe.
- **Clear instructions.** Recipes include step-by-step guidance.
- **Fast, responsive UI.** Smooth interactive experience powered by Framer Motion.
- **Mobile-friendly layout.** Works on phones and tablets.
- **No backend required.** Fully client-side using Puter.js NoSQL database.
- **Visual feedback.** Clean icons and transitions.

---

## Key features

- **AI integration.** Generate unique recipes using the Puter AI API.
- **Interactive UI.** Built with React and Tailwind CSS for fast interactions.
- **Framer Motion animations.** Smooth motion throughout the application.
- **Lucide icons.** Clean iconography.
- **Client-side database.** Uses Puter.js NoSQL for storing user interactions and saved recipes.
- **Vercel deployment.** Fast, globally distributed hosting.

---

## Why I built this

- I wanted to make cooking easier by using AI to suggest recipes from what I already had.
- There are many recipe apps, but few offer instant personalized recipes from a free-form prompt.
- I wanted to blend AI, UX, and performance in a single app.
- I wanted to explore React animations and client-side database architecture.

---

## Tech stack

### Frontend

- **React.** Component-based UI logic.
- **Tailwind CSS.** Utility-first styling.
- **Framer Motion.** UI animations for fluid interactions.
- **Lucide icons.** Lightweight and expressive icons.

### Database and deployment

- **Puter.js NoSQL DB.** Simple client-side data store.
- **Vite.** Fast development and build tooling.
- **Vercel.** Continuous deployment and hosting.

---

## Development experience

### Building the UI with React

- Designed reusable components for the input, the recipe display, and the saved-recipe list.
- Focused on accessibility and responsive layouts.
- Built real-time UI feedback for user actions.

### AI workflow

- Connected the app with the Puter AI API.
- Kept prompt inputs clean and results fast.
- Managed loading states and error handling gracefully.

### Animation and UX

- Used Framer Motion for the per-step reveal animation as the AI streams the recipe.
- Added subtle animations to make the UI feel alive without slowing it down.

---

## Impact and results

- **Live deployment.** Successfully deployed on Vercel.
- **User engagement.** Smooth recipe generation flow.
- **Minimal dependencies.** No backend server needed.
- **Scalable UI.** Built with performance in mind.

---

## Future enhancements

- **User accounts and favorites.** Save recipes to a personal account.
- **Save and share recipes.** Share via link.
- **Diet and cuisine filters.** Filter by what you can eat and what you’re in the mood for.
- **Image generation for recipes.** Generate a photo for each recipe.
- **Offline support with IndexedDB.** Work without a network.
- **Analytics dashboard for user trends.** See which recipes get used.

---

## Key learnings

- **AI-integrated frontend.** Combining AI APIs with React and a streaming response.
- **Client-side DB.** Using Puter.js for simple state persistence.
- **Responsive and animated UI.** Using Framer Motion for polished interfaces.
- **Deploying modern web apps.** From local builds to production on Vercel.
