let items = JSON.parse(localStorage.getItem("items")) || [];

const form = document.getElementById("form");
const list = document.getElementById("list");
const error = document.getElementById("error");
const info = document.getElementById("info");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

function save() {
  localStorage.setItem("items", JSON.stringify(items));
}

function render() {
  list.innerHTML = "";

  const searchText = search.value.toLowerCase();
  const filterValue = filter.value;

  const filtered = items.filter(function (item) {
    if (filterValue === "active" && item.bought) return false;
    if (filterValue === "bought" && !item.bought) return false;
    if (searchText && !item.name.toLowerCase().includes(searchText)) return false;
    return true;
  });

  for (let i = 0; i < filtered.length; i++) {
    const item = filtered[i];
    const li = document.createElement("li");
    if (item.bought) li.className = "bought";

    li.innerHTML =
      '<input type="checkbox" ' + (item.bought ? "checked" : "") + ' data-id="' + item.id + '">' +
      '<span>' + item.name + ' (' + item.qty + ') — ' + item.category + '</span>' +
      '<button data-id="' + item.id + '">Delete</button>';

    list.appendChild(li);
  }

  const bought = items.filter(function (i) { return i.bought; }).length;
  info.textContent = "Total: " + items.length + " | Bought: " + bought;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  error.textContent = "";

  const name = document.getElementById("name").value.trim();
  const qty = document.getElementById("qty").value;
  const category = document.getElementById("category").value;

  if (!name) {
    error.textContent = "Enter a name";
    return;
  }
  if (qty < 1) {
    error.textContent = "Quantity must be greater than 0";
    return;
  }
  if (!category) {
    error.textContent = "Choose a category";
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
  form.reset();
  document.getElementById("qty").value = 1;
});

list.addEventListener("click", function (e) {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.tagName === "INPUT") {
    const item = items.find(function (i) { return i.id === id; });
    if (item) item.bought = !item.bought;
  } else if (e.target.tagName === "BUTTON") {
    items = items.filter(function (i) { return i.id !== id; });
  }

  save();
  render();
});

search.addEventListener("input", render);
filter.addEventListener("change", render);

render();
