# Makarab Hussain Shah: Portfolio

Full-Stack Developer • Cybersecurity • Python • AI/ML. Plain HTML, CSS and JavaScript. No build step, no dependencies.

## Structure

```
portfolio/
├── index.html      page content and SEO metadata
├── style.css       all styling
├── script.js       content data (SKILLS, PROJECTS) and interactions
├── assets/
│   ├── profile.jpg   your photo (replace the placeholder)
│   └── project1.png  project 1 preview (replace the placeholder)
└── README.md
```

## Run locally

Double-click `index.html`, or from this folder run `python -m http.server 8000` and open http://localhost:8000.

## Deploy

- **GitHub Pages:** push this folder to a repo, then Settings → Pages → Branch `main` → `/ (root)`.
- **Vercel:** import the repo at vercel.com. It is a static site, so no build settings are needed.

## Fill in your details

| What | Where |
|---|---|
| LinkedIn URL | `index.html`: search `YOUR-USERNAME` (contact section and footer) |
| Deployed URL and share image | `index.html` `<head>`: `og:url` and `og:image` (`YOUR-DOMAIN`) |
| Project GitHub, demo, image | `script.js`: `PROJECTS` array (`github`, `demo`, `image`); leave empty to show "coming soon" |
| Case study text | `script.js`: `PROJECTS[n].study` |
| Skills | `script.js`: `SKILLS` array |
| Team members and HackCBS details | `index.html`: `#hackathon` and `#team` sections |
| Photo and project image | replace `assets/profile.jpg` and `assets/project1.png` (same names) |

Email, GitHub and X links are already set.
