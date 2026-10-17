---
tags:
  - theme
  - layout
---

# Theme Lab

This page explains every display control. All of them live in one place: the
round **:material-cog: settings button** in the bottom-right corner of every page
(or press ++alt+t++).

!!! success "Your choices are remembered"

    Settings are stored in your browser, so they stay the same on every page and
    on your next visit.

## What you can change

| Control          | What it does                                           | Default      |
|:-----------------|:-------------------------------------------------------|:-------------|
| Mode             | Light or dark                                          | Light        |
| Theme presets    | One click changes header, link and highlight colors     | Indigo       |
| Custom color     | 20 header colors to choose from                         | Indigo       |
| Page width       | **Fit screen** removes the empty side margins           | Fit screen   |
| Zoom             | Makes all text and spacing larger or smaller (80%-160%) | 110%         |
| Font             | Default, System, Serif or Monospace                     | Default      |
| Density          | Comfortable or compact spacing                          | Comfortable  |
| Progress bar     | Thin reading-progress line at the top of the page       | On           |
| Page tools       | Copy link, Print, Expand all, Collapse all, Top         | -            |

!!! tip "Try sorting"

    The table above is sortable. Click any column heading.

## Light and dark mode

Use the **Mode** buttons in the settings panel (or press ++alt+d++). The
**Midnight** and **Graphite** presets switch to dark mode and pick matching
colors. The page keeps a fixed palette, so there is no flash of the wrong theme
when a page loads.

## Keyboard shortcuts

| Keys                | Action                       |
|:--------------------|:-----------------------------|
| ++alt+t++           | Open or close settings       |
| ++alt+equal++       | Zoom in                      |
| ++alt+minus++       | Zoom out                     |
| ++alt+0++           | Reset zoom                   |
| ++alt+w++           | Toggle fit screen / centered |
| ++alt+d++           | Toggle light / dark mode     |
| ++slash++ or ++s++  | Focus the search box         |
| ++esc++             | Close the settings panel     |

## Click-to-zoom images

Every image on the site opens in a zoomable lightbox when clicked. Try it:

![Sample chart](https://placehold.co/900x420/3f51b5/ffffff?text=Click+to+zoom){ width="420" }

## Change the defaults for everyone

Open `docs/javascripts/ui.js` and edit the block at the top:

```javascript title="docs/javascripts/ui.js" hl_lines="3 5 6"
var DEFAULTS = {
  preset: "Indigo",
  primary: "indigo",
  accent: "indigo",
  fit: true,       // true = full screen width
  zoom: 1.1,       // 1.1 = 10% larger on first launch
  font: "default",
  density: "comfortable",
  progress: true
};
```

Visitors who already saved their own settings keep them. Anyone opening the
site for the first time gets the new defaults.

## Change the layout with CSS only

If you prefer CSS, edit `docs/stylesheets/extra.css`. For example, to limit the
page width on huge monitors:

```css title="docs/stylesheets/extra.css"
html.fit-width .md-grid {
  max-width: 2000px;   /* instead of "none" */
}
```
