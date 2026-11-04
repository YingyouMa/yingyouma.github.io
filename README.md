# Personal Website

An initial professional website for three engineering software projects: **Nematics3D**, **EigenPlot3D**, and **SLIME**.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` — landing page
- `/projects` — project collection
- `/projects/nematics3d`
- `/projects/eigenplot3d`
- `/projects/slime`
- `/about`

## Editing

- Change the placeholder name in `components/site-header.tsx`, `app/layout.tsx`, and `app/page.tsx`.
- Edit project text in `lib/projects.ts`.
- Change visual styling in `app/globals.css`.
- Illustrations in `components/visual.tsx` are conceptual SVG graphics, **not scientific results**.
- The WR19 benchmark summary on the SLIME page is based on the existing presentation; add primary plots and complete test conditions before publication.

The site deliberately omits Writings and Hybrid for now. No external project source code is copied into the website.
