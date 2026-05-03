# Лабораторная работа №3 — Продвинутые объекты в JavaScript

## Цель работы

Познакомиться с классами и объектами в JavaScript, научиться создавать классы, использовать конструкторы и методы, а также реализовать наследование.

---

## Шаг 1. Создание класса Item

Создан класс `Item`, представляющий предмет в инвентаре.

Поля: `name`, `weight`, `rarity` (common, uncommon, rare, legendary).

Методы: `getInfo()`, `setWeight(newWeight)`.

```js
class Item {
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  getInfo() {
    return `${this.name} | Weight: ${this.weight} | Rarity: ${this.rarity}`;
  }

  setWeight(newWeight) {
    this.weight = newWeight;
  }
}
```

Результат:

```
Steel Sword | Weight: 3.5 | Rarity: rare
After setWeight(4.0): Steel Sword | Weight: 4 | Rarity: rare
Health Potion | Weight: 0.5 | Rarity: common
Ring of Power | Weight: 0.1 | Rarity: legendary
```

---

## Шаг 2. Создание класса Weapon

Создан класс `Weapon`, наследующий `Item`.

Дополнительные поля: `damage`, `durability` (0–100).

Методы: `use()` (уменьшает durability на 10), `repair()` (восстанавливает до 100).

```js
class Weapon extends Item {
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  getInfo() {
    return `${super.getInfo()} | Damage: ${this.damage} | Durability: ${this.durability}`;
  }

  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    }
  }

  repair() {
    this.durability = 100;
  }
}
```

Результат:

```
Longbow | Weight: 2 | Rarity: uncommon | Damage: 15 | Durability: 100
After use(): 90
After 2 more use(): 70
After repair(): 100
Battle Axe | Weight: 5 | Rarity: rare | Damage: 25 | Durability: 50
After 6x use() (was 50): 0
```

---

## Шаг 3. Тестирование

Созданы объекты обоих классов и протестированы все методы:

- `Item`: Steel Sword, Health Potion, Ring of Power
- `Weapon`: Longbow, Battle Axe

Проверено: `getInfo()`, `setWeight()`, `use()`, `repair()`, износ до 0.

---

## Шаг 4. Дополнительное задание

### Опциональная цепочка (?.)

Использована для безопасного доступа к свойствам — при `null` в массиве ошибки не возникает:

```js
const items = [sword, null, bow];
items.forEach((item, i) => {
  console.log(`items[${i}]?.getInfo(): ${item?.getInfo() ?? "null"}`);
  console.log(`items[${i}]?.name: ${item?.name ?? "null"}`);
});
```

Результат:

```
items[0]?.getInfo(): Steel Sword | Weight: 4 | Rarity: rare
items[0]?.name: Steel Sword
items[1]?.getInfo(): null
items[1]?.name: null
items[2]?.getInfo(): Longbow | Weight: 2 | Rarity: uncommon | Damage: 15 | Durability: 100
items[2]?.name: Longbow
```

### Функции-конструкторы

Классы `Item` и `Weapon` переписаны с использованием функций-конструкторов:

```js
function ItemFC(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

ItemFC.prototype.getInfo = function () {
  return `${this.name} | Weight: ${this.weight} | Rarity: ${this.rarity}`;
};

function WeaponFC(name, weight, rarity, damage, durability) {
  ItemFC.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

WeaponFC.prototype = Object.create(ItemFC.prototype);
WeaponFC.prototype.constructor = WeaponFC;
```

Результат:

```
Dagger | Weight: 1 | Rarity: common | Damage: 8 | Durability: 100
After use(): 90
After repair(): 100

instanceof checks:
dagger instanceof WeaponFC: true
dagger instanceof ItemFC: true
```

---

## Контрольные вопросы

### 1. Какое значение имеет `this` в методах класса?

`this` в методах класса ссылается на конкретный экземпляр объекта, на котором был вызван метод. Например, при вызове `sword.getInfo()` значение `this` внутри `getInfo()` указывает на объект `sword`, поэтому `this.name` вернет `"Steel Sword"`.

Важно помнить, что значение `this` определяется в момент вызова, а не в момент объявления. Если метод передать как callback без привязки, `this` может потеряться:

```js
const fn = sword.getInfo;
fn(); // this будет undefined (в strict mode)

const bound = sword.getInfo.bind(sword);
bound(); // this === sword
```

### 2. Как работает модификатор доступа `#` в JavaScript?

Символ `#` перед именем поля или метода делает его приватным — доступ к нему возможен только внутри класса:

```js
class Player {
  #health = 100;

  takeDamage(amount) {
    this.#health -= amount;
  }

  getHealth() {
    return this.#health;
  }
}

const player = new Player();
player.takeDamage(20);
console.log(player.getHealth()); // 80
console.log(player.#health); // SyntaxError: Private field
```

В отличие от TypeScript, где `private` — это проверка на этапе компиляции, `#` в JavaScript обеспечивает настоящую приватность на уровне движка.

### 3. В чем разница между классами и функциями-конструкторами?

Классы (`class`) и функции-конструкторы — оба способа создания объектов с прототипным наследованием, но с отличиями:

**Синтаксис**: `class` предоставляет чистый и понятный синтаксис с `constructor`, `extends`, `super`. Функции-конструкторы требуют ручной работы с `prototype` и `Object.create()`.

**Вызов**: класс можно вызвать только с `new`, а функцию-конструктор можно случайно вызвать без `new`, что приведет к ошибкам.

**Наследование**: в классах используется `extends` и `super()`. В функциях-конструкторах нужно вручную вызывать `Parent.call(this)` и настраивать цепочку прототипов через `Object.create()`.

**Приватные поля**: классы поддерживают `#private` поля, функции-конструкторы — нет.

По сути, `class` — это синтаксический сахар над прототипным наследованием, но с дополнительными возможностями и защитой от ошибок.

---

## Использованная литература

1. Haverbeke M. — Eloquent JavaScript, 4th Edition, 2024
2. Flanagan D. — JavaScript: The Definitive Guide, 7th Edition, O'Reilly, 2020
3. ECMA-262 — ECMAScript Language Specification, https://tc39.es/ecma262/
4. MDN Web Docs — JavaScript Reference, https://developer.mozilla.org/en-US/docs/Web/JavaScript
