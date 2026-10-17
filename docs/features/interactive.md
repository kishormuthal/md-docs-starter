# Interactive Bits

These examples use small pieces of HTML and JavaScript. They work on a docs
site and in exported HTML, but **not** in GitHub's file viewer, which strips
scripts.

## Copy any text with a button

<button class="md-button" onclick="navigator.clipboard.writeText('pip install mkdocs-material'); this.innerText='Copied!'; setTimeout(() => this.innerText='Copy install command', 1500);">Copy install command</button>

## A text box with the text pre-selected

<input type="text" readonly value="mkdocs serve" onclick="this.select()" style="width: 260px; padding: 6px;">

(Click inside the box to select the text.)

## Show and hide with JavaScript

<button class="md-button" onclick="var e=document.getElementById('secret'); e.style.display = (e.style.display==='none') ? 'block' : 'none';">Toggle hidden message</button>

<div id="secret" style="display:none; margin-top: 8px;">
You found the hidden message.
</div>

## A tiny counter

<button class="md-button" id="counter-btn" onclick="this.dataset.n=(+this.dataset.n||0)+1; this.innerText='Clicked '+this.dataset.n+' times';">Click me</button>

## A color picker that changes a preview

<input type="color" id="picker" value="#3f51b5" oninput="document.getElementById('swatch').style.background=this.value">
<div id="swatch" style="width:120px;height:40px;margin-top:8px;background:#3f51b5;border-radius:6px;"></div>

## A simple unit converter

<label>Kilometers:
<input type="number" id="km" value="10" style="width:90px;padding:4px;"
 oninput="document.getElementById('mi').innerText=(this.value*0.621371).toFixed(2)">
</label>
= <strong id="mi">6.21</strong> miles

## Ideas you can build the same way

- Dark/light or font-size toggles
- Sortable and filterable tables
- Progress trackers that remember checkboxes (localStorage)
- Quizzes and flashcards
- Calculators and converters
- Interactive charts (Chart.js, Plotly)
- Live code playgrounds
- Comment boxes (Giscus, Utterances)

!!! warning "Security note"

    Only add scripts you wrote or trust. Scripts on a page run with full access
    to that page.
