# Callouts and Collapsibles

## Callouts (admonitions)

!!! note
    A note. Use it for neutral extra information.

!!! abstract "Summary"
    A short summary of the page.

!!! info
    Useful background information.

!!! tip
    A helpful shortcut or best practice.

!!! success
    Something completed or worked.

!!! question
    A question or FAQ prompt.

!!! warning
    Be careful with this step.

!!! failure
    Something that failed or an error case.

!!! danger
    A serious risk, such as data loss.

!!! bug
    A known bug or issue.

!!! example
    A worked example.

!!! quote
    A quotation or reference text.

## Custom title and no title

!!! tip "Pro tip: custom title"
    You choose the heading text between the quotes.

!!! note ""
    A callout with no title bar.

## Collapsible callouts

??? note "Click to expand (closed by default)"
    This text is hidden until you click the title.

???+ tip "Open by default (click to collapse)"
    This one starts expanded.

??? warning "Nested content works too"
    You can put lists, code and more inside.

    - Item one
    - Item two

    ```python
    print("Hello from inside a collapsible")
    ```

## Side-by-side callout

!!! info inline end "Side note"
    This box floats to the right of the text next to it.

Text placed after an `inline end` callout wraps around it. This is handy for
short asides, definitions and quick references, so the main paragraph stays
uncluttered. Keep adding text here to see it flow beside the box, and keep
going until the paragraph is a little longer than the box itself.

## FAQ-style accordion

??? question "How do I add a new page?"
    Create a `.md` file in `docs/` and list it under `nav:` in `mkdocs.yml`.

??? question "Can I change the colors?"
    Yes. Edit the `palette` block in `mkdocs.yml`.

??? question "Does it work on mobile?"
    Yes. The layout adapts to small screens automatically.
