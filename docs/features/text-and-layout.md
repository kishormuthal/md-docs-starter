# Text, Layout and Media

## Text styling

**Bold**, *italic*, ***bold italic***, ~~strikethrough~~, ==highlighted==,
^^underlined^^, H~2~O (subscript), x^2^ (superscript).

Keyboard keys: ++ctrl+c++ to copy, ++ctrl+v++ to paste, ++cmd+shift+p++ for the
command palette.

Abbreviation tooltip: the HTML spec is maintained by the W3C. Hover over the
abbreviations to see their meaning.

*[HTML]: HyperText Markup Language
*[W3C]: World Wide Web Consortium

Smart symbols: (c) (tm) (r) +/- =/= --> <-- <--> 1/2 3/4.

Emoji and icons: :smile: :rocket: :warning: :white_check_mark: :material-home:
:fontawesome-brands-github: :octicons-heart-fill-24:

Status indicators: 🟢 ready, 🟡 in progress, 🔴 blocked.

## Footnotes

A statement that needs a source.[^1] Another one with a longer note.[^note]

[^1]: This is the first footnote. Click the arrow to jump back.
[^note]: Footnotes can contain **formatting** and links.

## Definition list

Static site generator
:   A tool that turns plain files into a ready-to-host website.

Front matter
:   A block of settings at the very top of a page between `---` lines.

## Task list

- [x] Install the tools
- [x] Write the first page
- [ ] Add images
- [ ] Publish the site

## Tables with alignment

| Feature      | Plain `.md` | Docs site | Align  |
|:-------------|:-----------:|:---------:|-------:|
| Copy button  | Sometimes   | Yes       | right  |
| Tabs         | No          | Yes       | right  |
| Search       | No          | Yes       | right  |
| Dark mode    | No          | Yes       | right  |

## Content tabs for non-code content

=== "Overview"

    Tabs can hold any Markdown content, not just code.

=== "Details"

    - Lists
    - **Formatting**
    - Even tables and images

## Centered and aligned content

<div style="text-align: center" markdown>

**This block is centered.**
Use it for hero text, captions and logos.

</div>

## Images with captions

<figure markdown>
  ![Placeholder](https://placehold.co/600x200?text=Your+image+here){ width="400" }
  <figcaption>Figure 1: Image with a caption (replace with your own file)</figcaption>
</figure>

Align an image left or right with an attribute:

![Small](https://placehold.co/160x100?text=Right){ align=right }

Text next to a right-aligned image wraps around it. The `align=right`
attribute comes from the `attr_list` extension that is enabled in
`mkdocs.yml`.

<div style="clear: both"></div>

## Buttons

[Primary button](#){ .md-button .md-button--primary }
[Secondary button](#){ .md-button }
[Icon button :material-download:](#){ .md-button }

## Link tooltips

[Hover over this link](https://www.mkdocs.org "This text is the tooltip").

## Hidden comments

The line below is a comment and will not appear on the page.

<!-- This text is invisible in the rendered site -->

## Collapsible long content

<details markdown>
<summary>Show a long list</summary>

1. First
2. Second
3. Third
4. Fourth

</details>
