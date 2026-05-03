# Лабораторная работа №5 — Работа с DOM-деревом и событиями в JavaScript

## Цель работы

Закрепить навыки взаимодействия JavaScript с DOM-деревом, делегирования
событий и модульной организации кода на примере веб-приложения для учёта
личных финансов.

---

## Шаг 1. Настройка и структурирование проекта

Структура проекта:

```
LL_05/
├── index.html
├── style.css
└── src/
    ├── index.js
    ├── transactions.js
    ├── ui.js
    └── utils.js
```

- `index.js` — точка входа, импортирует и инициализирует UI.
- `transactions.js` — модуль для работы с массивом транзакций (CRUD + сумма).
- `ui.js` — модуль для работы с DOM (форма, таблица, события).
- `utils.js` — вспомогательные функции (генерация ID, форматирование даты,
  обрезка описания, экранирование HTML).

`index.js` подключён в `index.html` с атрибутом `type="module"`, поэтому
импорты ES-модулей работают напрямую в браузере.

---

## Шаг 2. Представление транзакции

Массив `transactions` хранит объекты со следующими полями:

- `id` — уникальный идентификатор (из timestamp + случайного суффикса);
- `date` — дата и время добавления (`Date`);
- `amount` — сумма транзакции (отрицательная — расход, положительная — доход);
- `category` — категория (`Income`, `Food`, `Transport`, `Entertainment`,
  `Utilities`, `Shopping`, `Other`);
- `description` — полное описание транзакции.

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

| Столбец      | Описание                                |
| ------------ | --------------------------------------- |
| Date & Time  | Дата и время в формате `DD.MM.YYYY HH:MM` |
| Category     | Категория транзакции                    |
| Description  | Краткое описание (первые 4 слова)       |
| Amount       | Сумма транзакции                        |
| Action       | Кнопка удаления                         |

---

## Шаг 4. Добавление транзакций

Функция `addTransaction()` создаёт объект транзакции, добавляет его в массив
и возвращает. Отрисовку строки выполняет UI-модуль.

Цвет строки задаётся CSS-классом в зависимости от знака суммы:

- положительная сумма — класс `income` (зелёный фон);
- отрицательная сумма — класс `expense` (красный фон).

В колонке Description выводятся только первые 4 слова описания, полный текст
показывается в блоке деталей при клике на строку.

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

В каждой строке таблицы есть кнопка `Delete`. Обработчик клика навешан
на сам элемент `<table>` и работает через делегирование событий:

```js
table.addEventListener("click", (e) => {
  const row = e.target.closest("tr[data-id]");
  if (!row) return;

  if (e.target.classList.contains("delete-btn")) {
    removeTransaction(row.dataset.id);
    row.remove();
    updateTotal();
    resetDetails();
    return;
  }

  showDetails(row.dataset.id);
});
```

Один обработчик отвечает и за удаление, и за показ деталей — это и есть
делегирование: событие всплывает от кнопки/ячейки до таблицы, а внутри
обработчика мы по `e.target` решаем, что делать.

---

## Шаг 6. Подсчёт суммы транзакций

Функция `calculateTotal()` суммирует поле `amount` всех транзакций и
вызывается после каждого добавления и удаления; результат пишется в
элемент `#total`:

```js
export function calculateTotal() {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
```

---

## Шаг 7. Отображение полной транзакции

Под таблицей расположен блок `#transaction-details`. При клике на строку
в нём выводится категория, сумма, дата и полный текст описания. Сама
выбранная строка дополнительно подсвечивается классом `selected`.

---

## Шаг 8. Форма добавления транзакции

Форма содержит:

- `<input type="number" id="amount">` — сумма;
- `<select id="category">` — категория;
- `<input type="text" id="description">` — описание;
- кнопка `Add`.

Валидация выполняется в JavaScript (`novalidate` отключает встроенную
браузерную), сообщение об ошибке выводится в `#form-error`, а поле с
ошибкой получает класс `invalid` (красная рамка):

```js
function validateForm() {
  const amountRaw = amountInput.value.trim();
  const category = categoryInput.value;
  const description = descriptionInput.value.trim();

  if (!amountRaw || isNaN(Number(amountRaw)) || Number(amountRaw) === 0) {
    amountInput.classList.add("invalid");
    return "Enter a valid non-zero amount.";
  }
  if (!category) {
    categoryInput.classList.add("invalid");
    return "Select a category.";
  }
  if (!description) {
    descriptionInput.classList.add("invalid");
    return "Enter a description.";
  }
  return null;
}
```

---

## Документирование кода

Все функции и модули задокументированы по стандарту JSDoc: указаны
параметры (`@param`), возвращаемые значения (`@returns`) и пользовательский
тип `Transaction` через `@typedef`. Это даёт IDE возможность подсказывать
поля объектов и проверять типы.

---

## Контрольные вопросы

### 1. Каким образом можно получить доступ к элементу на веб-странице с помощью JavaScript?

Доступ к элементам осуществляется через объект `document` и его методы:

- **`document.getElementById(id)`** — возвращает элемент по уникальному
  атрибуту `id`. Самый быстрый способ выборки одного элемента.
- **`document.querySelector(selector)`** — возвращает первый элемент,
  соответствующий CSS-селектору. Универсальный, поддерживает любые селекторы
  (`#id`, `.class`, `tag`, `[attr]`, комбинированные и т. д.).
- **`document.querySelectorAll(selector)`** — возвращает статический
  `NodeList` всех совпадающих элементов; по нему можно итерироваться через
  `forEach`.
- **`document.getElementsByClassName(name)`** — возвращает «живую»
  HTMLCollection элементов с указанным классом.
- **`document.getElementsByTagName(tag)`** — «живая» коллекция элементов
  по имени тега.
- **Навигация по дереву**: `parentNode`, `children`, `closest(selector)`,
  `nextElementSibling`, `previousElementSibling` — позволяют переходить
  от уже найденного элемента к соседним.

Пример из этой работы:

```js
const form = document.getElementById("transaction-form");
const tbody = document.querySelector("#transactions-table tbody");
const row = e.target.closest("tr[data-id]");
```

### 2. Что такое делегирование событий и как оно используется для эффективного управления событиями на элементах DOM?

**Делегирование событий** — это приём, при котором обработчик навешивается
не на каждый дочерний элемент, а на их общего родителя. Это работает
благодаря **всплытию событий (event bubbling)**: событие, возникшее на
вложенном элементе, поднимается вверх по DOM-дереву и срабатывает у каждого
предка. Внутри обработчика по `event.target` (или `event.target.closest(...)`)
определяется, на каком именно потомке произошёл клик.

Преимущества:

- **Один обработчик вместо множества** — меньше памяти и меньше работы при
  навешивании/снятии слушателей.
- **Работает для динамически добавляемых элементов**: если новые `<tr>`
  и кнопки `Delete` появляются после загрузки страницы, отдельные обработчики
  им не нужны — родительский слушатель уже всё ловит.
- **Чище код**: вся логика взаимодействия с таблицей в одном месте.

В этой работе делегирование используется для таблицы — один слушатель на
`<table>` обрабатывает и клик по кнопке удаления, и клик по строке для
показа деталей:

```js
table.addEventListener("click", (e) => {
  const row = e.target.closest("tr[data-id]");
  if (!row) return;

  if (e.target.classList.contains("delete-btn")) {
    // удаление
  } else {
    // показ деталей
  }
});
```

### 3. Как можно изменить содержимое элемента DOM с помощью JavaScript после его выборки?

После того как элемент получен (`getElementById`, `querySelector` и т. д.),
его содержимое можно менять разными способами:

- **`element.textContent = "..."`** — заменяет всё текстовое содержимое
  элемента. HTML-теги внутри строки **не интерпретируются**, поэтому это
  безопасно для пользовательского ввода (защита от XSS).
- **`element.innerHTML = "..."`** — заменяет содержимое разметкой; теги
  парсятся как HTML. Удобно для шаблонов, но при подстановке пользовательских
  данных их необходимо предварительно экранировать (см. `escapeHtml` в
  `utils.js`).
- **`element.innerText = "..."`** — похоже на `textContent`, но учитывает
  CSS-видимость и переносы строк.
- **Атрибуты**: `element.setAttribute(name, value)`, прямые свойства
  (`input.value`, `img.src`), `element.dataset.id = "..."`.
- **Классы и стили**: `element.classList.add/remove/toggle("...")`,
  `element.style.color = "red"`.

Примеры из этой работы:

```js
totalEl.textContent = `Total: ${total.toFixed(2)}`;
detailsEl.innerHTML = `<strong>${category}</strong> — ${amount}`;
row.classList.add("selected");
tr.dataset.id = t.id;
```

### 4. Как можно добавить новый элемент в DOM-дерево с помощью JavaScript?

Алгоритм обычно такой: создать элемент, заполнить его, затем вставить в
нужное место.

1. **Создание элемента**:

   ```js
   const tr = document.createElement("tr");
   ```

   Также есть `document.createTextNode("...")` для текстовых узлов и
   `document.createDocumentFragment()` для пакетной вставки нескольких
   элементов без лишних перерисовок.

2. **Вставка в дерево**:

   - `parent.appendChild(child)` — в конец родителя (один узел).
   - `parent.append(...nodes)` — в конец, можно сразу несколько узлов
     или строк.
   - `parent.prepend(...nodes)` — в начало родителя.
   - `parent.insertBefore(newNode, refNode)` — перед указанным узлом.
   - `element.insertAdjacentHTML("beforeend", "<tr>...</tr>")` — вставка
     HTML-строки в одну из четырёх позиций (`beforebegin`, `afterbegin`,
     `beforeend`, `afterend`).
   - `element.replaceWith(...)`, `element.remove()` — замена и удаление.

Пример из этой работы:

```js
function createRow(t) {
  const tr = document.createElement("tr");
  tr.dataset.id = t.id;
  tr.className = t.amount >= 0 ? "income" : "expense";
  tr.innerHTML = `
    <td>${formatDate(t.date)}</td>
    <td>${t.category}</td>
    <td>${shortDescription(t.description)}</td>
    <td>${t.amount.toFixed(2)}</td>
    <td><button class="delete-btn" type="button">Delete</button></td>
  `;
  return tr;
}

tbody.appendChild(createRow(transaction));
```

---

## Использованная литература

1. Haverbeke M. — _Eloquent JavaScript_, 4th Edition, 2024.
2. Flanagan D. — _JavaScript: The Definitive Guide_, 7th Edition,
   O’Reilly, 2020.
3. ECMA-262 — ECMAScript Language Specification,
   <https://tc39.es/ecma262/>.
4. MDN Web Docs — JavaScript & DOM Reference,
   <https://developer.mozilla.org/en-US/docs/Web>.
