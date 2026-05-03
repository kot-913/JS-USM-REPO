import { formatDate, shortDescription } from "./utils.js";
import {
  addTransaction,
  removeTransaction,
  findTransaction,
  calculateTotal,
} from "./transactions.js";

const form = document.getElementById("transaction-form");
const tbody = document.querySelector("#transactions-table tbody");
const table = document.getElementById("transactions-table");
const totalEl = document.getElementById("total");
const detailsEl = document.getElementById("transaction-details");

/** Updates the total display. */
function updateTotal() {
  const total = calculateTotal();
  totalEl.textContent = `Total: ${total.toFixed(2)}`;
}

/**
 * Creates a table row for a transaction.
 * @param {object} t - Transaction object.
 * @returns {HTMLTableRowElement}
 */
function createRow(t) {
  const tr = document.createElement("tr");
  tr.dataset.id = t.id;
  tr.className = t.amount >= 0 ? "income" : "expense";

  tr.innerHTML = `
    <td>${formatDate(t.date)}</td>
    <td>${t.category}</td>
    <td>${shortDescription(t.description)}</td>
    <td>${t.amount.toFixed(2)}</td>
    <td><button class="delete-btn">Delete</button></td>
  `;
  return tr;
}

/** Displays full transaction details below the table. */
function showDetails(id) {
  const t = findTransaction(id);
  if (!t) return;
  detailsEl.innerHTML = `
    <strong>${t.category}</strong> &mdash; ${t.amount.toFixed(2)}<br>
    <em>${formatDate(t.date)}</em><br>
    ${t.description}
  `;
}

/**
 * Validates form fields and returns an error message or null.
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

/** Initializes all event listeners. */
export function initUI() {
  // Form submit — add transaction
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value.trim();

    const transaction = addTransaction(amount, category, description);
    tbody.appendChild(createRow(transaction));
    updateTotal();
    form.reset();
  });

  // Event delegation on table — delete and show details
  table.addEventListener("click", (e) => {
    const row = e.target.closest("tr[data-id]");
    if (!row) return;

    // Delete button clicked
    if (e.target.classList.contains("delete-btn")) {
      removeTransaction(row.dataset.id);
      row.remove();
      updateTotal();
      detailsEl.innerHTML = "<p>Click on a transaction to see full details.</p>";
      return;
    }

    // Row clicked — show details
    showDetails(row.dataset.id);
  });
}
