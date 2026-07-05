// ============================================
// Lesson 13 — Arrow Functions
// ============================================
// Read LESSON.md first. Rewrite each TODO using arrow functions.

console.log("Lesson 13 — Arrow functions ready.");


// --------------------------------------------
// TODO 1: Rewrite `multiply` as an arrow function stored in a const.



const multiply = (a, b) => a * b;

// Replace the function above with:
// const multiply = ...

console.log("multiply(3, 4) =", multiply(3, 4));


// --------------------------------------------
// TODO 2: Rewrite `isAdult` as a one-line arrow function with implicit return.

const isAdult = (a) => a >= 18;

// Replace with arrow version, then test:
console.log("isAdult(20) =", isAdult(20));
console.log("isAdult(15) =", isAdult(15));


// --------------------------------------------
// TODO 3: Rewrite this forEach using an arrow function.

const colors = ["red", "green", "blue"];
console.log("Colors:");


colors.forEach((color) => console.log("- " + color));

// --------------------------------------------
// TODO 4: Rewrite this filter + map chain using arrow functions.

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers.filter((n) => n % 2 ===0).map((n) => n *10);



console.log("filter + map result:", result); // [20, 40, 60, 80, 100]


// --------------------------------------------
// TODO 5: Render the `result` array to the page.
// Select #numberList, then use forEach with an ARROW function to:
// - create an <li> for each number
// - set its textContent
// - append it to the list

// (write your code here)

const numberList = document.getElementById("numberList");

result.forEach((n) => {
  const li = document.createElement("li");
  li.textContent = n;
  numberList.appendChild(li); 
})


// --------------------------------------------
// TODO 6: Select #btnA and #output.
// Add a click listener using an ARROW function that sets #output text to
// "Arrow function clicked!"

// (write your code here)

const btnA = document.getElementById("btnA");
const output = document.getElementById("output");

btnA.addEventListener("click", () => output.textContent = "Arrow function clicked!");
