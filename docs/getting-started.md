# Getting Started

## 1. Install

Pick your operating system. Your choice is remembered across every tab group on
the site.

=== "Windows"

    ```powershell
    py -m pip install -r requirements.txt
    ```

=== "macOS"

    ```bash
    python3 -m pip install -r requirements.txt
    ```

=== "Linux"

    ```bash
    python3 -m pip install -r requirements.txt
    ```

!!! note

    Python 3.8 or newer is required. Check with `python --version`.

## 2. Run the site locally

```bash
mkdocs serve
```

Then open <http://127.0.0.1:8000> in your browser.

## 3. Build the final website

```bash
mkdocs build
```

This creates a `site/` folder of plain HTML files that you can upload to any
web host.

## 4. Publish for free (GitHub Pages)

```bash
mkdocs gh-deploy
```

## Project layout

```text
md-docs-starter/
├── mkdocs.yml          # site settings, menu, theme, extensions
├── requirements.txt    # what to install
└── docs/
    ├── index.md        # home page
    ├── getting-started.md
    ├── features/       # one page per feature group
    └── javascripts/    # custom scripts (math rendering)
```

## What each setting does

Open `mkdocs.yml` and look at these blocks.

```yaml title="mkdocs.yml" hl_lines="3 6"
theme:
  name: material
  features:                      # (1)!
    - content.code.copy          # (2)!
    - navigation.tabs
```

1. The `features` list turns individual interface features on or off.
2. This single line is what adds the copy button to every code block.

## Add a new page

1. Create a file such as `docs/my-page.md`.
2. Add it to the `nav:` section in `mkdocs.yml`:

    ```yaml
    nav:
      - Home: index.md
      - My Page: my-page.md
    ```

3. Save. The page appears in the menu.
