# Madhumitha M — Personal Portfolio

A responsive, single-page personal portfolio built with HTML5, CSS3 and vanilla JavaScript.

## Design direction

**The Citrus Atelier** — a warm editorial visual identity using porcelain, eucalyptus, apricot, marigold and powder blue. The layout intentionally limits imagery: one hero portrait area, illustrated interest cards, a family illustration and a compact hobby gallery.

## Technology

- HTML5 semantic markup
- CSS3 (Grid, Flexbox, custom properties, transitions and responsive media queries)
- Vanilla JavaScript (ES6+)
- GitHub Actions
- GitHub Pages

No frontend frameworks or runtime packages are used.

## Run locally

1. Download or clone this repository.
2. Open the `profile-website` folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension if available.

The website does not require a build step.

## Personalise the content

Edit `index.html` to update:
- Hero introduction and professional title.
- Education and career milestones.
- Personal interests.
- Family descriptions.
- Hobby descriptions.
- Social profile URLs and email address.

The supplied illustrated profile image is stored at `images/hero/madhumitha-portrait.png`. The supplied biryani, coastal travel and painting images are stored under `images/interests/` and `images/hobbies/`. Replace these files or update their `<img>` paths in `index.html` whenever you want to use different images.

The family illustrations are CSS-based placeholders and can later be replaced with approved family illustrations or photographs.

## Theme system

All theme tokens are in `css/theme.css`. This file contains the colour palette, typography, spacing, layout, border-radius, shadows and motion tokens. Use the Light / Dark control in the navigation to switch themes; the choice is remembered in the browser. Both palettes are defined in `theme.css`.

`css/style.css` uses the variables from `theme.css`. To create a new theme, change the token values in `theme.css` only. Do not hardcode theme colours in `style.css`.

## Project structure

```text
profile-website/
├── index.html
├── css/
│   ├── theme.css
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── hero/
│   ├── journey/
│   ├── interests/
│   ├── family/
│   └── hobbies/
├── .github/
│   └── workflows/
├── .htmlhintrc
├── .gitignore
└── README.md
```

## Git branching workflow

Suggested sequence:

```bash
git checkout -b develop
git push -u origin develop

git checkout -b feature/hero-section
# make changes
git add .
git commit -m "Build editorial hero section"
git push -u origin feature/hero-section
```

Open a pull request from the feature branch into `develop`. Request at least one peer review before merging.

Repeat for:
- `feature/journey-timeline`
- `feature/interests-cards`
- `feature/family-section`
- `feature/hobbies-gallery`
- `theme/dark-mode`
- `theme/warm-tones`
- `ci/setup-validation`
- `ci/setup-deploy`
- `ci/setup-pr-checks`
- `ci/setup-lighthouse`
- `ci/setup-notifications`

Do not commit directly to `main`. Merge `develop` into `main` through a pull request after review and successful checks.

## GitHub Actions

Five workflows are provided in `.github/workflows/`:

1. `validate.yml` — HTMLHint and CSSLint validation on pushes and pull requests.
2. `deploy.yml` — deploys the repository to GitHub Pages when `main` is updated.
3. `pr-checks.yml` — checks page titles, image alt attributes and leftover `console.log` statements.
4. `lighthouse.yml` — runs Lighthouse after deployment and weekly; stores the report as an artifact.
5. `notify.yml` — reports deployment success or failure in the workflow log and optionally sends a webhook notification.

Validation tools are installed inside GitHub Actions only; no package manager is required to run the website.

## GitHub Pages setup

1. Push the repository to GitHub.
2. In repository Settings → Pages, choose GitHub Actions as the build and deployment source.
3. Ensure the `main` branch is protected and requires the PR status check.
4. Merge an approved pull request into `main`.
5. Check the Actions tab for the deployment result.
6. Open the Pages URL shown in the deployment job.

## Accessibility and performance

- Semantic landmarks and headings.
- Skip link for keyboard users.
- Descriptive image alternative text.
- Keyboard-operable navigation and hobby details.
- Reduced-motion support.
- No external JavaScript libraries.

## Interactive cards

- Personal-interest and family cards flip when clicked, tapped, or activated with Enter / Space.
- The navigation theme control switches between light and dark palettes.
- All interactions are implemented with CSS and vanilla JavaScript; no frontend libraries are required.

## Images used
- images/hero/madhumitha-portrait.png (profile photo)
- images/interests/music.png, movies.png, chicken-biryani.png, travel-coast.png
- images/journey/learning.png (Still learning card)
- images/hobbies/painting.png, sports.png

## Theming
Every colour lives in `css/theme.css` (light palette in `:root`, dark palette in `html[data-theme="dark"]`). `css/style.css` contains no hardcoded colours.

## Before you push
Replace the LinkedIn, GitHub and email links in the footer of `index.html` with your own.
