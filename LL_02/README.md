# Лабораторная работа №2 — Основы работы с массивами, функциями и объектами в JavaScript

## Цель работы

Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.

---

## Шаг 1. Создание массива транзакций

Создан файл `main.js`. Массив транзакций содержит 8 объектов со следующими свойствами:

- `transaction_id` — уникальный идентификатор транзакции
- `transaction_date` — дата транзакции
- `transaction_amount` — сумма транзакции
- `transaction_type` — тип транзакции (debit или credit)
- `transaction_description` — описание транзакции
- `merchant_name` — название магазина или сервиса
- `card_type` — тип карты (Visa или MasterCard)

---

## Шаг 2. Реализация функций для анализа транзакций

### getUniqueTransactionTypes(transactions)

Возвращает массив уникальных типов транзакций. Использует `Set()`.

```js
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map((t) => t.transaction_type))];
}
```

Результат: `[ 'debit', 'credit' ]`

### calculateTotalAmount(transactions)

Вычисляет сумму всех транзакций.

```js
function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}
```

Результат: `680`

### calculateTotalAmountByDate(transactions, year, month, day) [extra]

Вычисляет общую сумму транзакций за указанный год, месяц и день. Параметры `year`, `month` и `day` являются необязательными — при отсутствии одного из них расчет производится по остальным.

```js
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
```

Результат для января 2019: `425`

### getTransactionByType(transactions, type)

Возвращает транзакции указанного типа (debit или credit).

```js
function getTransactionByType(transactions, type) {
  return transactions.filter((t) => t.transaction_type === type);
}
```

Результат для "debit": 5 транзакций (id: 1, 3, 4, 6, 7)

### getTransactionsInDateRange(transactions, startDate, endDate)

Возвращает массив транзакций в указанном диапазоне дат.

```js
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(
    (t) => t.transaction_date >= startDate && t.transaction_date <= endDate,
  );
}
```

Результат для "2019-01-01" — "2019-01-31": 4 транзакции (id: 1, 2, 3, 4)

### getTransactionsByMerchant(transactions, merchantName)

Возвращает массив транзакций по названию магазина.

```js
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter((t) => t.merchant_name === merchantName);
}
```

Результат для "OnlineShop": 2 транзакции (id: 2, 8)

### calculateAverageTransactionAmount(transactions)

Возвращает среднее значение сумм транзакций.

```js
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}
```

Результат: `85`

### getTransactionsByAmountRange(transactions, minAmount, maxAmount)

Возвращает транзакции с суммой в заданном диапазоне.

```js
function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(
    (t) =>
      t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount,
  );
}
```

Результат для диапазона 50–100: 4 транзакции (id: 1, 2, 3, 7)

### calculateTotalDebitAmount(transactions)

Вычисляет общую сумму дебетовых транзакций.

```js
function calculateTotalDebitAmount(transactions) {
  return getTransactionByType(transactions, "debit").reduce(
    (sum, t) => sum + t.transaction_amount,
    0,
  );
}
```

Результат: `555`

### findMostTransactionsMonth(transactions)

Возвращает месяц с наибольшим количеством транзакций.

```js
function findMostTransactionsMonth(transactions) {
  const counts = {};
  transactions.forEach((t) => {
    const month = new Date(t.transaction_date).getMonth() + 1;
    counts[month] = (counts[month] || 0) + 1;
  });
  return Number(
    Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b)),
  );
}
```

Результат: `1` (январь — 4 транзакции)

### findMostDebitTransactionMonth(transactions)

Возвращает месяц с наибольшим количеством дебетовых транзакций.

Результат: `1` (январь — 3 дебетовые транзакции)

### mostTransactionTypes(transactions)

Определяет, каких транзакций больше: debit, credit или equal.

```js
function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;
  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}
```

Результат: `debit` (5 дебетовых vs 3 кредитовых)

### getTransactionsBeforeDate(transactions, date)

Возвращает транзакции, совершенные до указанной даты.

```js
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter((t) => t.transaction_date < date);
}
```

Результат для "2019-02-01": 4 транзакции (id: 1, 2, 3, 4)

### findTransactionById(transactions, id)

Возвращает транзакцию по уникальному идентификатору.

```js
function findTransactionById(transactions, id) {
  return transactions.find((t) => t.transaction_id === id);
}
```

Результат для id "3": транзакция "Payment for utilities" на сумму 75

### mapTransactionDescriptions(transactions)

Возвращает массив описаний транзакций.

```js
function mapTransactionDescriptions(transactions) {
  return transactions.map((t) => t.transaction_description);
}
```

Результат:

```
[
  'Payment for groceries',
  'Refund for returned item',
  'Payment for utilities',
  'Payment for electronics',
  'Cashback reward',
  'Payment for clothing',
  'Payment for subscription',
  'Refund for canceled order'
]
```

---

## Шаг 3. Тестирование функций

Все функции протестированы на трех наборах данных:

**Основной массив (8 транзакций)** — все функции возвращают корректные результаты.

**Пустой массив [extra]:**

```
Уникальные типы: []
Общая сумма: 0
Средняя сумма: 0
Дебетовые: []
Описания: []
```

**Массив с одной транзакцией [extra]:**

```
Уникальные типы: [ 'debit' ]
Общая сумма: 250
Средняя сумма: 250
Тип большинства: debit
Найти по id 99: { transaction_id: '99', ... }
```

---

## Контрольные вопросы

### 1. Какие методы массивов можно использовать для обработки объектов в JavaScript?

**`map()`** — создает новый массив, применяя функцию к каждому элементу. Используется для преобразования данных, например для извлечения описаний транзакций.

**`filter()`** — создает новый массив из элементов, прошедших проверку. Используется для выборки транзакций по типу, дате, сумме и т.д.

**`reduce()`** — сводит массив к одному значению, применяя функцию-аккумулятор. Используется для подсчета общей суммы транзакций.

**`find()`** — возвращает первый элемент, удовлетворяющий условию. Используется для поиска транзакции по id.

**`forEach()`** — выполняет функцию для каждого элемента без создания нового массива. Используется для подсчета транзакций по месяцам.

### 2. Как сравнивать даты в строковом формате в JavaScript?

Даты в формате `YYYY-MM-DD` можно сравнивать как обычные строки с помощью операторов `<`, `>`, `<=`, `>=`, `===`, потому что при лексикографическом сравнении строк в этом формате порядок совпадает с хронологическим порядком дат.

```js
"2019-01-15" < "2019-02-01"; // true
"2019-03-10" >= "2019-01-01"; // true
```

Это работает только с форматом `YYYY-MM-DD`. Для других форматов нужно преобразовывать строки в объекты `Date` с помощью `new Date()`.

### 3. В чем разница между map(), filter() и reduce() при работе с массивами объектов?

**`map()`** — преобразует каждый элемент массива и возвращает новый массив **той же длины**. Например, из массива транзакций получить массив описаний.

**`filter()`** — отбирает элементы по условию и возвращает новый массив **меньшей или равной длины**. Например, выбрать только дебетовые транзакции.

**`reduce()`** — сводит весь массив к **одному значению** (число, строка, объект). Например, посчитать общую сумму транзакций.

```js
// map — преобразование: массив → массив (той же длины)
transactions.map((t) => t.transaction_description);

// filter — фильтрация: массив → массив (меньшей длины)
transactions.filter((t) => t.transaction_type === "debit");

// reduce — агрегация: массив → одно значение
transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
```

---

## Использованная литература

1. Haverbeke M. — Eloquent JavaScript, 4th Edition, 2024
2. Flanagan D. — JavaScript: The Definitive Guide, 7th Edition, O'Reilly, 2020
3. ECMA-262 — ECMAScript Language Specification, https://tc39.es/ecma262/
4. MDN Web Docs — JavaScript Reference, https://developer.mozilla.org/en-US/docs/Web/JavaScript
