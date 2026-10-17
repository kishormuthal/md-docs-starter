---
tags:
  - showcase
  - components
---

# UI Showcase

Extra visual components built with small bits of HTML and CSS. Colors follow
whichever theme you pick in the settings panel.

## Stat cards

<div class="stat-grid">
  <div class="stat"><strong>128</strong><span>Pages published</span></div>
  <div class="stat"><strong>94%</strong><span>Search success rate</span></div>
  <div class="stat"><strong>2.4k</strong><span>Monthly readers</span></div>
  <div class="stat"><strong>12</strong><span>Open issues</span></div>
</div>

## Progress bars

Documentation coverage
<div class="pbar"><i style="--v:85%"></i></div>

Translations
<div class="pbar"><i style="--v:55%"></i></div>

Tests passing
<div class="pbar"><i style="--v:97%"></i></div>

## Status badges

<span class="badge ok">Stable</span>
<span class="badge info">v2.4.1</span>
<span class="badge warn">Beta</span>
<span class="badge err">Deprecated</span>
<span class="badge">New</span>

## Timeline

<div class="timeline">
  <div><b>January</b>Project kickoff and first draft.</div>
  <div><b>March</b>Public beta released.</div>
  <div><b>June</b>Version 1.0 launched.</div>
  <div><b>September</b>Multi-language support added.</div>
</div>

## Hover cards (move your mouse over them)

<div class="grid cards" markdown>

- :material-rocket-launch: **Quick start**

    Install and run in two minutes.

- :material-book-open-variant: **Guides**

    Step-by-step walkthroughs.

- :material-api: **Reference**

    Full details on every option.

</div>

## Nicer tooltips

Hover over [this link](https://www.mkdocs.org "A styled tooltip appears here"), or
over the abbreviation HTML below.

*[HTML]: HyperText Markup Language

Write HTML with confidence.

## Step-by-step flow

!!! example "How to publish"

    1. **Write** your pages in Markdown.
    2. **Preview** with `mkdocs serve`.
    3. **Build** with `mkdocs build`.
    4. **Deploy** with `mkdocs gh-deploy`.

## Sortable table (click a heading)

| Feature      | Effort | Impact |
|:-------------|-------:|-------:|
| Search       |      1 |     10 |
| Dark mode    |      1 |      6 |
| Tabs         |      2 |      8 |
| Diagrams     |      3 |      9 |
| Live editor  |      8 |      5 |

## Tabs with mixed content

=== "Overview"

    A short description with **bold** text and a [link](../index.md).

=== "Checklist"

    - [x] Install
    - [x] Configure
    - [ ] Publish

=== "Code"

    ```bash
    mkdocs serve
    ```

## Buttons

[Primary :material-arrow-right:](../index.md){ .md-button .md-button--primary }
[Secondary](../getting-started.md){ .md-button }
[Download :material-download:](#){ .md-button }

## Collapsible FAQ

??? question "Where do the colors come from?"
    From the Material theme palette and the settings panel.

??? question "Can I add my own components?"
    Yes. Add HTML to any page and style it in `docs/stylesheets/extra.css`.
