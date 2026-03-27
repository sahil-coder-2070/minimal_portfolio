---
title: "tcxcommit - AI Git Commit Message Generator"
description: "AI-powered git commit message generator that writes your commit messages for you using OpenRouter AI."
image: "/comingsoon.webp"
technologies:
  - Node.js
  - TypeScript
  - OpenRouter AI
  - Chalk
github: "https://github.com/sahilcodexx/tcxcommit"
live: "https://tcxcommit.vercel.app/"
npm: "https://www.npmjs.com/package/tcxcommit"
timeline: "2 Weeks"
role: "Creator"
team: "Solo"
status: "Completed"
featured: true
challenges:
  - CLI Interaction Design
  - Git Integration
  - API Key Management
  - Terminal UI
learnings:
  - Node.js CLI Development
  - OpenRouter API Integration
  - Package Publishing
isPublished: true
---

# tcxcommit

AI-powered git commit message generator that writes your commit messages for you!

## Description

tcxcommit is a command-line tool that uses artificial intelligence to generate meaningful and conventional git commit messages. Simply stage your changes and let tcxcommit create the perfect commit message for you. It supports both free trials and your own OpenRouter API key.

## Features

- AI-powered commit message generation
- Conventional commit format support (feat:, fix:, docs:, refactor:, etc.)
- Free to start with 5 trial commits
- Option to use your own OpenRouter API key for unlimited usage
- Automatic change staging
- Git push support after commit
- Clean and beautiful terminal interface
- Rate limit handling
- Network error handling

## Installation

### Install via npm

```bash
npm install -g tcxcommit
```

### Install via npx (no installation required)

```bash
npx tcxcommit
```

## Usage

1. Navigate to your git repository
2. Make some changes to your files
3. Run `tcxcommit`
4. Follow the interactive prompts

## How It Works

1. Checks for git repository in current directory
2. Stages all changes automatically using `git add .`
3. Gets the staged diff using `git diff --cached`
4. Sends the diff to OpenRouter AI API
5. AI generates a conventional commit message
6. Displays the suggested message
7. User accepts, regenerates, or exits
8. If accepted, commits with the generated message
9. Optionally pushes to remote repository

## Technologies Used

- Node.js - JavaScript runtime
- TypeScript - Programming language
- OpenRouter - AI API provider
- Chalk - Terminal string styling
- Prompts - Interactive CLI prompts

## License

ISC License
