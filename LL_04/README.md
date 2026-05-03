# Лабораторная работа №4 — Работа с DOM-деревом и событиями в JavaScript

## Цель работы

Ознакомиться с основами взаимодействия JavaScript с DOM-деревом на основе веб-приложения для учета личных финансов.

---

## Шаг 1. Настройка и структурирование проекта

Создана следующая структура:

```
LL_04/
├── index.html
├── style.css
└── src/
    ├── index.js
    ├── transactions.js
    ├── ui.js
    └── utils.js
```

- `index.js` — главный файл, импортирует модуль UI
- `transactions.js` — модуль для работы с массивом транзакций
- `ui.js` — модуль для работы с DOM (отрисовка таблицы, формы, событий)
- `utils.js` — вспомогательные функции (генерация ID, форматирование даты)

`index.js` подключен в `index.html` с `type="module"`.

---

## Шаг 2. Представление транзакции

Массив `transactions` хранит объекты со следующими полями:

- `id` — уникальный идентификатор (генерируется из timestamp + random)
- `date` — дата и время добавления (`Date` объект)
- `amount` — сумма транзакции
- `category` — категория (Income, Food, Transport, Entertainment, Utilities, Shopping, Other)
- `description` — описание транзакции

```js
const transaction = {
  id: generateId(),
  date: new Date(),
  amount,
  category,
  description,
};
```

---

## Шаг 3. Отображение транзакций

HTML-таблица содержит столбцы:

| Столбец | Описание |
| --- | --- |
| Date & Time | Дата и время в формате DD.MM.YYYY HH:MM |
| Category | Категория транзакции |
| Description | Краткое описание (первые 4 слова) |
| Amount | Сумма транзакции |
| Action | Кнопка удаления |

---

## Шаг 4. Добавление транзакций

Функция `addTransaction()` создает объект транзакции, добавляет его в массив и отрисовывает строку в таблице.

Цвет строки зависит от суммы:
- Положительная сумма — зеленый фон (класс `income`)
- Отрицательная сумма — красный фон (класс `expense`)

В колонке Description отображаются первые 4 слова описания.

```js
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
```

---

## Шаг 5. Управление транзакциями

В каждой строке таблицы есть кнопка "Delete". Обработчик события определен на элементе `<table>` через делегирование событий:

```js
table.addEventListener("click", (e) => {
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
```

При клике на кнопку удаления транзакция удаляется из массива и строка удаляется из DOM.

---

## Шаг 6. Подсчет суммы транзакций

Функция `calculateTotal()` вызывается после каждого добавления и удаления. Результат отображается в элементе `#total`.

```js
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
```

---

## Шаг 7. Отображение полной транзакции

При клике на строку таблицы в блоке `#transaction-details` отображается полная информация: категория, сумма, дата и полное описание.

---

## Шаг 8. Форма добавления транзакции

Форма содержит:
- Поле ввода суммы (`<input type="number">`)
- Выбор категории (`<select>`)
- Поле описания (`<input type="text">`)
- Кнопку отправки

Валидация формы проверяет:
- Сумма введена и является числом
- Категория выбрана
- Описание не пустое

```js
function validateForm() {
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();

  if (!amount || isNaN(Number(amount))) return "Enter a valid amount.";
  if (!category) return "Select a category.";
  if (!description) return "Enter a description.";
  return null;
}
```

---

## Контрольные вопросы

### 1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?

Основные методы:

**`document.getElementById(id)`** — возвращает элемент по уникальному `id`. Самый быстрый способ, так как `id` уникален на странице.

**`document.querySelector(selector)`** — возвращает первый элемент, соответствующий CSS-селектору. Универсальный метод, поддерживает любые CSS-селекторы.

**`document.querySelectorAll(selector)`** — возвращает `NodeList` всех элементов, соответствующих CSS-селектору.

**`document.getElementsByClassName(name)`** — возвращает живую коллекцию элементов по имени класса.

**`document.getElementsByTagName(tag)`** — возвращает живую коллекцию элементов по имени тега.

```js
document.getElementById("total");
document.querySelector("#transactions-table tbody");
document.querySelectorAll(".delete-btn");
```

### 2. Что такое делегирование событий и как оно используется?

Делегирование событий — это прием, при котором обработчик события устанавливается на родительский элемент, а не на каждый дочерний. Это работает благодаря всплытию событий (event bubbling) — событие, возникшее на дочернем элементе, поднимается по DOM-дереву до корня.

Преимущества:
- Один обработчик вместо множества — экономия памяти
- Работает для динамически добавляемых элементов
- Проще управлять кодом

В данной работе делегирование используется для обработки кликов по таблице — один обработчик на `<table>` обрабатывает и удаление, и отображение деталей:

```js
table.addEventListener("click", (e) => {
  const row = e.target.closest("tr[data-id]");
  if (!row) return;

  if (e.target.classList.contains("delete-btn")) {
    // delete logic
  } else {
    // show details logic
  }
});
```

### 3. Как можно изменить содержимое элемента DOM?

**`element.textContent`** — устанавливает или получает текстовое содержимое элемента. Безопасен от XSS, так как не интерпретирует HTML.

**`element.innerHTML`** — устанавливает или получает HTML-содержимое. Позволяет вставлять HTML-разметку, но требует осторожности с пользовательскими данными.

**`element.innerText`** — аналогично `textContent`, но учитывает CSS-видимость элементов.

```js
totalEl.textContent = `Total: ${total.toFixed(2)}`;
detailsEl.innerHTML = `<strong>${t.category}</strong> — ${t.amount}`;
```

### 4. Как можно добавить новый элемент в DOM-дерево?

**`document.createElement(tag)`** — создает новый элемент указанного типа.

**`parent.appendChild(child)`** — добавляет элемент в конец родителя.

**`parent.insertBefore(newNode, referenceNode)`** — вставляет элемент перед указанным узлом.

**`element.append(...nodes)`** — добавляет один или несколько узлов в конец элемента.

**`element.prepend(...nodes)`** — добавляет в начало элемента.

```js
const tr = document.createElement("tr");
tr.dataset.id = t.id;
tr.innerHTML = `<td>${formatDate(t.date)}</td>...`;
tbody.appendChild(tr);
```

---

## Использованная литература

1. Haverbeke M. — Eloquent JavaScript, 4th Edition, 2024
2. Flanagan D. — JavaScript: The Definitive Guide, 7th Edition, O'Reilly, 2020
3. ECMA-262 — ECMAScript Language Specification, https://tc39.es/ecma262/
4. MDN Web Docs — JavaScript Reference, https://developer.mozilla.org/en-US/docs/Web/JavaScript
