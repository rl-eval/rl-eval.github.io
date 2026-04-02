# RLEVal Workshop Website (GitHub Pages)

Static website for:

**Evaluating AI Agents: Methods and Reinforcement Learning Environments**
(ACM CAIS 2026 workshop)

## Quick publish (GitHub Pages)

1. Create a GitHub repository named `rleval.github.io` and push these files.
2. In GitHub: `Settings -> Pages`.
3. Under **Build and deployment**, select:
   - Source: `Deploy from a branch`
   - Branch: `main` (or `master`), folder `/ (root)`
4. Save, then open `https://rleval.github.io/`.

## Optional custom domain (CNAME)

If you later want a custom domain (for example `rleval.org`):

1. Create a file named `CNAME` in repo root with one line:
   - `rleval.org`
2. In GitHub repo settings: `Settings -> Pages -> Custom domain`, confirm the same domain.
3. Add DNS records at your domain provider:
   - `A` records for GitHub Pages IPs (apex/root domain), or
   - `CNAME` record to `rleval.github.io` (subdomain like `www`).
4. Enable HTTPS in Pages once DNS is propagated.

## Files

- `index.html`: all workshop content/sections.
- `styles.css`: visual theme, layout, mobile responsiveness.
- `script.js`: countdown and reveal animation.

## Customize before launch

- Replace keynote placeholders in `index.html`.
- Update submission portal URL.
- Confirm timeline dates (currently marked tentative).
