let transactions = [];

const saved = localStorage.getItem("transactions");
if (saved) {
  transactions = JSON.parse(saved);
  for (const t of transactions) {
    t.date = new Date(t.date);
  }
}

/** Saves transactions to localStorage. */
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

/**
 * Adds a new transaction.
 * @param {number} amount
 * @param {string} category
 * @param {string} description
 * @returns {object}
 */
function addTransaction(amount, category, description) {
  const t = {
    id: generateId(),
    date: new Date(),
    amount: amount,
    category: category,
    description: description,
  };
  transactions.push(t);
  saveTransactions();
  return t;
}

/**
 * Removes a transaction by id.
 * @param {string} id
 */
function removeTransaction(id) {
  const i = transactions.findIndex((t) => t.id === id);
  if (i !== -1) {
    transactions.splice(i, 1);
    saveTransactions();
  }
}

/**
 * Finds a transaction by id.
 * @param {string} id
 * @returns {object|undefined}
 */
function findTransaction(id) {
  return transactions.find((t) => t.id === id);
}

/**
 * Sums all transaction amounts.
 * @returns {number}
 */
function calculateTotal() {
  let total = 0;
  for (const t of transactions) {
    total += t.amount;
  }
  return total;
}
