# Markdown Features Starter (MkDocs Material)

A starter docs site that demonstrates GUI features you can add to `.md` files.

## Run it

```bash
pip install -r requirements.txt
mkdocs serve        # live preview at http://127.0.0.1:8000
mkdocs build        # creates the final site in ./site
mkdocs gh-deploy    # publishes to GitHub Pages
```

## Where things are

- `mkdocs.yml`: site title, menu, theme, plugins, enabled features
- `docs/`: all pages (plain Markdown)
- `docs/stylesheets/extra.css`: layout (fit-to-screen), panel and component styles
- `docs/javascripts/ui.js`: settings panel, themes, zoom, shortcuts. **Defaults are at the top.**
- `docs/javascripts/mathjax.js`: makes LaTeX math render
- `overrides/main.html`: announcement bar at the top of every page

## Quick customisation

| I want to...                         | Edit                                            |
|:-------------------------------------|:------------------------------------------------|
| Change the default zoom or colors    | `DEFAULTS` at the top of `docs/javascripts/ui.js` |
| Limit the page width on huge screens | `html.fit-width .md-grid` in `extra.css`        |
| Change the announcement text         | `overrides/main.html`                           |
| Add a page                           | Create a `.md` file and list it under `nav:`    |

## Sidebar behaviour

The left sidebar is collapsible: sections open and close, and the active page is
highlighted with a soft pill. This works because `navigation.sections`,
`navigation.tabs` and `navigation.expand` are intentionally **not** enabled in
`mkdocs.yml`. Enabling them turns the sidebar into a fixed, always-open list.
