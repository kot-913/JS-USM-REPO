const form = document.getElementById("transaction-form");
const table = document.getElementById("transactions-table");
const tbody = table.querySelector("tbody");
const totalEl = document.getElementById("total");
const detailsEl = document.getElementById("transaction-details");

/** Updates the total. */
function updateTotal() {
  totalEl.textContent = "Total: " + calculateTotal().toFixed(2);
}

/**
 * Builds a table row for a transaction.
 * @param {object} t
 * @returns {HTMLTableRowElement}
 */
function createRow(t) {
  const tr = document.createElement("tr");
  tr.dataset.id = t.id;
  tr.className = t.amount >= 0 ? "income" : "expense";
  tr.innerHTML =
    "<td>" + formatDate(t.date) + "</td>" +
    "<td>" + t.category + "</td>" +
    "<td>" + shortDescription(t.description) + "</td>" +
    "<td>" + t.amount.toFixed(2) + "</td>" +
    "<td><button class=\"delete-btn\">Delete</button></td>";
  return tr;
}

/**
 * Shows full info for a transaction.
 * @param {string} id
 */
function showDetails(id) {
  const t = findTransaction(id);
  if (!t) return;
  detailsEl.innerHTML =
    "<strong>" + t.category + "</strong> — " + t.amount.toFixed(2) + "<br>" +
    "<em>" + formatDate(t.date) + "</em><br>" +
    t.description;
}

/**
 * Validates form fields.
 * @returns {string|null}
 */
function validateForm() {
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  if (!amount || isNaN(Number(amount))) return "Enter a valid amount.";
  if (!category) return "Select a category.";
  if (!description) return "Enter a description.";
  return null;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const error = validateForm();
  if (error) {
    alert(error);
    return;
  }

  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  const t = addTransaction(amount, category, description);
  tbody.appendChild(createRow(t));
  updateTotal();
  form.reset();
});

table.addEventListener("click", function (e) {
  const row = e.target.closest("tr[data-id]");
  if (!row) return;

  if (e.target.classList.contains("delete-btn")) {
    removeTransaction(row.dataset.id);
    row.remove();
    updateTotal();
    return;
  }

  showDetails(row.dataset.id);
});

for (const t of transactions) {
  tbody.appendChild(createRow(t));
}
updateTotal();
