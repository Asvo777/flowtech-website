# FlowTech Website

This repository contains the FlowTech company website built with React, TypeScript, and Vite.

## Current Website Content

The website currently includes:

- A shared application layout with:
  - `Navbar` component at the top
  - `Footer` component at the bottom
- Route-based pages using React Router:
  - Home page at `/`
  - Contact page at `/contact`
- Basic page headings rendered on both pages:
  - `Home`
  - `Contact`

## Current Structure

Main files and folders:

- `src/main.tsx`: App bootstrap and `BrowserRouter` setup
- `src/App.tsx`: Global layout and route declarations
- `src/pages/Home.tsx`: Home page component
- `src/pages/Contact.tsx`: Contact page component
- `src/components/Navbar.tsx`: Top navigation container (currently empty content)
- `src/components/Footer.tsx`: Footer container (currently empty content)
- `src/components/Services.tsx`: Services component scaffold (currently not routed)

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Framer Motion

## Available Scripts

Run the following from the project root:

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Notes

- This is an early scaffold of the FlowTech website.
- Navbar, footer, and page sections are set up and ready to be filled with company content and styling.

## Deploying to Vercel

This project is ready to be deployed to Vercel using the static build output from Vite.

Steps:

1. Push the repository to a Git provider (GitHub, GitLab, or Bitbucket).
2. In Vercel, create a new project and import this repository.
3. Ensure the build command is `npm run build` and the output directory is `dist` (these are set automatically by `vercel.json`).
4. Optionally set any environment variables in the Vercel dashboard.

Local build preview:

```bash
npm install
npm run build
npm run preview
```

