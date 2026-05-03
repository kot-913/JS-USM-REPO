import { generateId } from "./utils.js";

/** @type {Array<{id: string, date: Date, amount: number, category: string, description: string}>} */
const transactions = [];

/**
 * Creates a transaction object and adds it to the array.
 * @param {number} amount
 * @param {string} category
 * @param {string} description
 * @returns {object} The created transaction.
 */
export function addTransaction(amount, category, description) {
  const transaction = {
    id: generateId(),
    date: new Date(),
    amount,
    category,
    description,
  };
  transactions.push(transaction);
  return transaction;
}

/**
 * Removes a transaction by ID.
 * @param {string} id
 */
export function removeTransaction(id) {
  const index = transactions.findIndex((t) => t.id === id);
  if (index !== -1) transactions.splice(index, 1);
}

/**
 * Finds a transaction by ID.
 * @param {string} id
 * @returns {object|undefined}
 */
export function findTransaction(id) {
  return transactions.find((t) => t.id === id);
}

/** @returns {number} Sum of all transaction amounts. */
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
