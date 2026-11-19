# Personal Website

A professional website for two engineering software projects: **EigenPlot3D** and **SLIME**.

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
- `/projects/eigenplot3d`
- `/projects/slime`
- `/projects/slime/methods`
- `/about`

## Language selection

The header offers **Language → English / 简体中文** on every page. The chosen
language is saved in browser local storage and restored on later visits.
Both SLIME pages and the EigenPlot3D project detail page have Simplified Chinese
translations, including section navigation, diagram labels, figure captions,
and image viewer controls. Project names, code API identifiers, and source
figures remain unchanged. The homepage hero and Projects cards are bilingual,
and the dedicated Projects listing shares bilingual summaries, tags, images,
and typography. The About page still displays its original English body text.
Shared navigation and footer labels are translated.
SLIME translations live in `lib/slime-home-copy.ts` and
`lib/slime-methods-copy.ts`; language selection state is managed by
`components/language-provider.tsx`.
EigenPlot3D translations live in `lib/eigenplot-copy.ts`.

## Editing

- Change the placeholder name in `components/site-header.tsx`, `app/layout.tsx`, and `app/page.tsx`.
- Edit project text in `lib/projects.ts`.
- Change visual styling in `app/globals.css`.
- Illustrations in `components/visual.tsx` are conceptual SVG graphics, **not scientific results**.
- The WR19 benchmark summary on the SLIME page is based on the existing presentation; add primary plots and complete test conditions before publication.

The site deliberately omits Writings and Hybrid for now. No external project source code is copied into the website.
