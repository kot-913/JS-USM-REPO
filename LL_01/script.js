// Task 1: External JavaScript file
alert("Этот код выполнен из внешнего файла!");
console.log("Сообщение в консоли");

// Task 2: Variables and data types
let name = "Ecaterina";
let birthYear = 2005;
let isStudent = true;

console.log("Имя:", name);
console.log("Год рождения:", birthYear);
console.log("Студент:", isStudent);

// Control flow (conditions and loops)
let score = prompt("Введите ваш балл:");
if (score >= 90) {
  console.log("Отлично!");
} else if (score >= 70) {
  console.log("Хорошо");
} else {
  console.log("Можно лучше!");
}

for (let i = 1; i <= 5; i++) {
  console.log(`Итерация: ${i}`);
}
