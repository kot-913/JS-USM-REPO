/**
 * Class representing an inventory item.
 */
class Item {
  /**
   * @param {string} name
   * @param {number} weight
   * @param {"common"|"uncommon"|"rare"|"legendary"} rarity
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /** @returns {string} Item info. */
  getInfo() {
    return `${this.name} | Weight: ${this.weight} | Rarity: ${this.rarity}`;
  }

  /** @param {number} newWeight */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * Weapon class extending Item.
 * @extends Item
 */
class Weapon extends Item {
  /**
   * @param {string} name - Weapon name.
   * @param {number} weight - Weapon weight.
   * @param {"common"|"uncommon"|"rare"|"legendary"} rarity - Rarity.
   * @param {number} damage - Weapon damage.
   * @param {number} durability - Durability (0–100).
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /** @returns {string} */
  getInfo() {
    return `${super.getInfo()} | Damage: ${this.damage} | Durability: ${this.durability}`;
  }

  /** Decreases durability by 10 (minimum 0). */
  use() {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    }
  }

  /** Restores durability to 100. */
  repair() {
    this.durability = 100;
  }
}

console.log("=== Item ===\n");

const sword = new Item("Steel Sword", 3.5, "rare");
console.log(sword.getInfo());
sword.setWeight(4.0);
console.log("After setWeight(4.0):", sword.getInfo());

const potion = new Item("Health Potion", 0.5, "common");
console.log(potion.getInfo());

const ring = new Item("Ring of Power", 0.1, "legendary");
console.log(ring.getInfo());

console.log("\n=== Weapon ===\n");

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
console.log(bow.getInfo());
bow.use();
console.log("After use():", bow.durability);
bow.use();
bow.use();
console.log("After 2 more use():", bow.durability);
bow.repair();
console.log("After repair():", bow.durability);

const axe = new Weapon("Battle Axe", 5.0, "rare", 25, 50);
console.log(axe.getInfo());

for (let i = 0; i < 6; i++) {
  axe.use();
}
console.log("After 6x use() (was 50):", axe.durability);

console.log("\n=== Optional chaining ===\n");

const items = [sword, null, bow];
items.forEach((item, i) => {
  console.log(`items[${i}]?.getInfo(): ${item?.getInfo() ?? "null"}`);
  console.log(`items[${i}]?.name: ${item?.name ?? "null"}`);
});

console.log("\n=== Function constructors ===\n");

/**
 * Function constructor for an inventory item.
 * @constructor
 * @param {string} name
 * @param {number} weight
 * @param {"common"|"uncommon"|"rare"|"legendary"} rarity
 */
function ItemFC(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

/** @returns {string} */
ItemFC.prototype.getInfo = function () {
  return `${this.name} | Weight: ${this.weight} | Rarity: ${this.rarity}`;
};

/** @param {number} newWeight */
ItemFC.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

/**
 * Function constructor for a weapon. Inherits from ItemFC.
 * @constructor
 * @param {string} name
 * @param {number} weight
 * @param {"common"|"uncommon"|"rare"|"legendary"} rarity
 * @param {number} damage
 * @param {number} durability
 */
function WeaponFC(name, weight, rarity, damage, durability) {
  ItemFC.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

WeaponFC.prototype = Object.create(ItemFC.prototype);
WeaponFC.prototype.constructor = WeaponFC;

/** @returns {string} */
WeaponFC.prototype.getInfo = function () {
  return `${ItemFC.prototype.getInfo.call(this)} | Damage: ${this.damage} | Durability: ${this.durability}`;
};

/** Decreases durability by 10 (minimum 0). */
WeaponFC.prototype.use = function () {
  if (this.durability > 0) {
    this.durability = Math.max(0, this.durability - 10);
  }
};

/** Restores durability to 100. */
WeaponFC.prototype.repair = function () {
  this.durability = 100;
};

const dagger = new WeaponFC("Dagger", 1.0, "common", 8, 100);
console.log(dagger.getInfo());
dagger.use();
console.log("After use():", dagger.durability);
dagger.repair();
console.log("After repair():", dagger.durability);

console.log("\ninstanceof checks:");
console.log("dagger instanceof WeaponFC:", dagger instanceof WeaponFC);
console.log("dagger instanceof ItemFC:", dagger instanceof ItemFC);
