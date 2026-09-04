# Dimitar Stoyanov — Portfolio

A clean, single-page website for an independent software engineer available for remote contract, part-time, and project-based work. Built on top of the Techfolio template with Next.js, React, TypeScript, and Tailwind CSS.

## Stack

- Next.js
- React
- Tailwind CSS
- TypeScript

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customize Your Content

Almost all content lives in a single file:

- `app/data/portfolio.ts` — name, headline, hero copy, services, projects, experience, technologies, about text, contact info, email, GitHub, LinkedIn, and metadata

Edit that file to update the site without touching UI components.

Other files worth knowing about:

- `app/layout.tsx` — global metadata and app shell
- `app/opengraph-image.tsx` — generated social share image
- `components/` — one component per page section (Nav, Hero, Services, SelectedWork, Experience, Technologies, About, Contact, Footer)
- `public/` — static assets (favicon, images)

## Project Structure

- `app/data/portfolio.ts` — centralized, typed site content
- `app/page.tsx` — one-page composition of sections
- `components/` — section components
- `app/layout.tsx` — metadata and app shell

## Deployment

This project is set up to deploy easily on Vercel.

1. Push your repository to GitHub.
2. Import the repository into Vercel.
3. Update content, assets, metadata, and domain settings for your own site.

## License

The source code is licensed under the [MIT License](./LICENSE).

Portfolio template adapted from Brittne Valdivia: https://github.com/brittnebaila/techfolio
