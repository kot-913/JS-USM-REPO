const transactions = [
  {
    transaction_id: "1",
    transaction_date: "2019-01-01",
    transaction_amount: 100.0,
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "SuperMart",
    card_type: "Visa",
  },
  {
    transaction_id: "2",
    transaction_date: "2019-01-02",
    transaction_amount: 50.0,
    transaction_type: "credit",
    transaction_description: "Refund for returned item",
    merchant_name: "OnlineShop",
    card_type: "MasterCard",
  },
  {
    transaction_id: "3",
    transaction_date: "2019-01-03",
    transaction_amount: 75.0,
    transaction_type: "debit",
    transaction_description: "Payment for utilities",
    merchant_name: "UtilityCompany",
    card_type: "Visa",
  },
  {
    transaction_id: "4",
    transaction_date: "2019-01-04",
    transaction_amount: 200.0,
    transaction_type: "debit",
    transaction_description: "Payment for electronics",
    merchant_name: "TechStore",
    card_type: "MasterCard",
  },
  {
    transaction_id: "5",
    transaction_date: "2019-02-01",
    transaction_amount: 30.0,
    transaction_type: "credit",
    transaction_description: "Cashback reward",
    merchant_name: "BankRewards",
    card_type: "Visa",
  },
  {
    transaction_id: "6",
    transaction_date: "2019-02-15",
    transaction_amount: 120.0,
    transaction_type: "debit",
    transaction_description: "Payment for clothing",
    merchant_name: "FashionStore",
    card_type: "Visa",
  },
  {
    transaction_id: "7",
    transaction_date: "2019-03-01",
    transaction_amount: 60.0,
    transaction_type: "debit",
    transaction_description: "Payment for subscription",
    merchant_name: "StreamingService",
    card_type: "MasterCard",
  },
  {
    transaction_id: "8",
    transaction_date: "2019-03-10",
    transaction_amount: 45.0,
    transaction_type: "credit",
    transaction_description: "Refund for canceled order",
    merchant_name: "OnlineShop",
    card_type: "Visa",
  },
];

function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map((t) => t.transaction_type))];
}

function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

// year, month, day — optional filtering parameters
function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions
    .filter((t) => {
      const date = new Date(t.transaction_date);
      if (year !== undefined && date.getFullYear() !== year) return false;
      if (month !== undefined && date.getMonth() + 1 !== month) return false;
      if (day !== undefined && date.getDate() !== day) return false;
      return true;
    })
    .reduce((sum, t) => sum + t.transaction_amount, 0);
}

function getTransactionByType(transactions, type) {
  return transactions.filter((t) => t.transaction_type === type);
}

// Date comparison works as string comparison in YYYY-MM-DD format
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(
    (t) => t.transaction_date >= startDate && t.transaction_date <= endDate
  );
}

function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter((t) => t.merchant_name === merchantName);
}

function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}

function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(
    (t) => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount
  );
}

function calculateTotalDebitAmount(transactions) {
  return getTransactionByType(transactions, "debit").reduce(
    (sum, t) => sum + t.transaction_amount,
    0
  );
}

function findMostTransactionsMonth(transactions) {
  const counts = {};
  transactions.forEach((t) => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    counts[month] = (counts[month] || 0) + 1;
  });
  return Number(
    Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b))
  );
}

function findMostDebitTransactionMonth(transactions) {
  return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
}

// Returns "debit", "credit", or "equal"
function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;
  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}

function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter((t) => t.transaction_date < date);
}

function findTransactionById(transactions, id) {
  return transactions.find((t) => t.transaction_id === id);
}

function mapTransactionDescriptions(transactions) {
  return transactions.map((t) => t.transaction_description);
}

// === Testing ===

console.log("=== Testing on main array ===\n");

console.log("1. Unique transaction types:");
console.log(getUniqueTransactionTypes(transactions));

console.log("\n2. Total amount:");
console.log(calculateTotalAmount(transactions));

console.log("\n3. Total amount for January 2019:");
console.log(calculateTotalAmountByDate(transactions, 2019, 1));

console.log("\n4. Debit transactions:");
console.log(getTransactionByType(transactions, "debit"));

console.log("\n5. Transactions from 2019-01-01 to 2019-01-31:");
console.log(getTransactionsInDateRange(transactions, "2019-01-01", "2019-01-31"));

console.log("\n6. Transactions at OnlineShop:");
console.log(getTransactionsByMerchant(transactions, "OnlineShop"));

console.log("\n7. Average transaction amount:");
console.log(calculateAverageTransactionAmount(transactions));

console.log("\n8. Transactions from 50 to 100:");
console.log(getTransactionsByAmountRange(transactions, 50, 100));

console.log("\n9. Total debit amount:");
console.log(calculateTotalDebitAmount(transactions));

console.log("\n10. Month with most transactions:");
console.log(findMostTransactionsMonth(transactions));

console.log("\n11. Month with most debit transactions:");
console.log(findMostDebitTransactionMonth(transactions));

console.log("\n12. Most common transaction type:");
console.log(mostTransactionTypes(transactions));

console.log("\n13. Transactions before 2019-02-01:");
console.log(getTransactionsBeforeDate(transactions, "2019-02-01"));

console.log("\n14. Transaction with id 3:");
console.log(findTransactionById(transactions, "3"));

console.log("\n15. Transaction descriptions:");
console.log(mapTransactionDescriptions(transactions));

// === Testing on empty array [extra] ===

console.log("\n=== Testing on empty array ===\n");

const emptyTransactions = [];

console.log("Unique types:", getUniqueTransactionTypes(emptyTransactions));
console.log("Total amount:", calculateTotalAmount(emptyTransactions));
console.log("Average amount:", calculateAverageTransactionAmount(emptyTransactions));
console.log("Debit:", getTransactionByType(emptyTransactions, "debit"));
console.log("Descriptions:", mapTransactionDescriptions(emptyTransactions));

// === Testing on single transaction array [extra] ===

console.log("\n=== Testing on single transaction array ===\n");

const singleTransaction = [
  {
    transaction_id: "99",
    transaction_date: "2019-05-15",
    transaction_amount: 250.0,
    transaction_type: "debit",
    transaction_description: "Single payment",
    merchant_name: "TestShop",
    card_type: "Visa",
  },
];

console.log("Unique types:", getUniqueTransactionTypes(singleTransaction));
console.log("Total amount:", calculateTotalAmount(singleTransaction));
console.log("Average amount:", calculateAverageTransactionAmount(singleTransaction));
console.log("Most common type:", mostTransactionTypes(singleTransaction));
console.log("Find by id 99:", findTransactionById(singleTransaction, "99"));
