# Shopping List

A simple web application written in plain JavaScript for keeping a shopping list.

## Author

Ecaterina Pogorelova

## Description

The app lets you:

- add items with quantity and category
- mark items as bought
- delete items
- search items by name
- filter the list (all / active / bought)
- data is saved to `localStorage`, so it is not lost after closing the page

## Project structure

```
LI/
├── index.html      — markup
├── style.css       — styles
├── README.md       — description
└── src/
    └── app.js      — all the logic
```

## Install and run

No dependencies. Just open `index.html` in a browser by double-clicking it.

You can also run a local server:

```bash
python3 -m http.server 8000
```

And open <http://localhost:8000>.

## Usage

1. Enter the item name, quantity and choose a category.
2. Click "Add".
3. Mark bought items with the checkbox.
4. Remove unneeded items with the "Delete" button.
5. Use search and filter to find what you need.

## Code example

Adding an item:

```js
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  if (!name) {
    error.textContent = "Enter a name";
    return;
  }

  items.push({
    id: Date.now(),
    name: name,
    qty: qty,
    category: category,
    bought: false,
  });

  save();
  render();
});
```

## References

1. MDN Web Docs — <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
2. learn.javascript.ru — <https://learn.javascript.ru/>
3. W3Schools — <https://www.w3schools.com/js/>
