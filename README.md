# JEET — Interactive Personal Video Editor Portfolio

A responsive personal portfolio website for a video editor/creator, built using **HTML5, CSS3 and vanilla JavaScript (ES6+)**.

The project also includes a small browser-based interactive editing lab using the **Canvas API, Drag & Drop API and localStorage**.

## Features

- Semantic HTML5 structure
- Responsive CSS Grid/Flexbox layout
- Cinematic portfolio UI
- Interactive project cards
- Drag-and-drop image/video upload
- Canvas-based live preview
- Brightness, contrast, saturation and blur controls
- Grayscale effect toggle
- Video play/pause preview
- Clickable timeline seeking for videos
- localStorage for saving edit settings
- Mobile navigation
- Scroll reveal animations
- No backend required
- GitHub Pages compatible

## Technologies

- HTML5
- CSS3
- JavaScript ES6+
- Canvas API
- Drag & Drop API
- File API
- localStorage
- IntersectionObserver API

## Project structure

```text
interactive-video-editor-portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
```

## Run locally

1. Download or clone the repository.
2. Open the project folder.
3. Double-click `index.html`.

For the best development experience, use VS Code with the **Live Server** extension.

## How to use the editor

1. Open the **Editor** section.
2. Drag an image/video onto the upload area or click it.
3. Adjust brightness, contrast, saturation and blur.
4. Toggle grayscale if desired.
5. For a video, use **Play preview** and click the timeline to seek.
6. Click **Save edit settings**. The settings are saved in your browser using localStorage.

## Customize the portfolio

Open `index.html` and replace:

- `JEET` with your preferred portfolio name.
- About text with your own introduction.
- Project titles/descriptions.
- `hello@example.com` with your real email.
- Visual concept blocks with your own images/video thumbnails.

You can also add real project media inside `assets/`.

## GitHub setup

Create a new GitHub repository, then run:

```bash
git init
git add .
git commit -m "Initial portfolio project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## GitHub Pages deployment

1. Open your GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Click **Save**.
6. GitHub will provide your live website URL.

## Academic requirements checklist

| Requirement | Implementation |
|---|---|
| HTML5 | Semantic sections, header, nav, main, article, footer |
| CSS3 | Grid, Flexbox, animations, responsive media queries |
| JavaScript ES6+ | DOM manipulation, state, events, functions |
| Browser APIs | Canvas, File, Drag & Drop, localStorage, IntersectionObserver |
| Responsive | Desktop, tablet and mobile layouts |
| Git/GitHub | Repository-ready structure and commands |
| Documentation | This README.md |
| Free deployment | GitHub Pages compatible |

## Notes

The editor performs client-side preview effects. It does not permanently render/export a new processed MP4 file; this keeps the project lightweight and fully browser-based without a backend.

---

**Project:** Interactive Personal Video Editor Portfolio  
**Year:** 2026  
**Stack:** HTML5 • CSS3 • JavaScript ES6+
