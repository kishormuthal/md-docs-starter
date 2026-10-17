# Diagrams and Math

## Flowchart

```mermaid
flowchart LR
    A[Write .md files] --> B{Build}
    B -->|mkdocs build| C[HTML site]
    B -->|mkdocs serve| D[Live preview]
    C --> E[Publish]
```

## Sequence diagram

```mermaid
sequenceDiagram
    participant U as User
    participant S as Site
    U->>S: Type in search box
    S-->>U: Instant results
```

## State diagram

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> Review
    Review --> Published
    Review --> Draft: changes requested
    Published --> [*]
```

## Gantt chart

```mermaid
gantt
    title Documentation project
    dateFormat YYYY-MM-DD
    section Writing
    Outline      :a1, 2026-01-01, 5d
    First draft  :a2, after a1, 10d
    section Release
    Review       :a3, after a2, 5d
    Publish      :milestone, after a3, 0d
```

## Pie chart

```mermaid
pie title Time spent
    "Writing" : 50
    "Reviewing" : 30
    "Publishing" : 20
```

## Class diagram

```mermaid
classDiagram
    class Page {
        +String title
        +render()
    }
    class Site {
        +List pages
        +build()
    }
    Site "1" --> "*" Page
```

## Math (LaTeX)

Inline math: \(E = mc^2\) and \(a^2 + b^2 = c^2\).

Display math:

\[
\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
\]

A matrix:

\[
A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}, \qquad
\det A = ad - bc
\]

Aligned equations:

\[
\begin{aligned}
(a+b)^2 &= a^2 + 2ab + b^2 \\
(a-b)^2 &= a^2 - 2ab + b^2
\end{aligned}
\]

Greek letters and sums: \(\alpha, \beta, \gamma, \sum_{i=1}^{n} i = \frac{n(n+1)}{2}\)
