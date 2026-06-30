// ============================================
// Day 2 — Numbers, Math, and Template Literals
// ============================================
// Read LESSON.md first. Complete the TODOs below.
// After each task: SAVE this file, REFRESH the browser, check the Console.

console.log("Day 2 is running. Let's go. 🚀");


// --------------------------------------------
// TODO 1: Create two number variables, `a` and `b`, with any numbers you like.
// Then print their sum, difference, product, and division (4 separate console.logs).

// (write your code here)
const a = 5;
const b = 9;
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);



// --------------------------------------------
// TODO 2: Print the REMAINDER of a divided by b using the % operator.

// (write your code here)
console.log(a % b);


// --------------------------------------------
// TODO 3: Create a variable `myName` (use const).
// Using a TEMPLATE LITERAL (backticks and ${ }), print:
//   "Hello, my name is <yourName> and it has <number> letters."
// Hint: get the number of letters with myName.length

// (write your code here)
const myName = "Kewin";
console.log(`Hello, my name is ${myName} and it has ${myName.length} letters`);

// --------------------------------------------
// TODO 4: Create a number variable `age`.
// Using a template literal, print: "Next year I will be <age + 1>."
// Do the +1 math INSIDE the ${ } .

// (write your code here)

let age = 26;
console.log(`Next year I will be ${age + 1}`);




// --------------------------------------------
// TODO 5: Print your name in ALL CAPS using .toUpperCase().

// (write your code here)

console.log(myName.toUpperCase());

// --------------------------------------------
// TODO 6 (bonus): Pick any number and, using % and a template literal, print a sentence
// telling whether it's even or odd by showing the remainder when divided by 2.
// Example output: "7 divided by 2 leaves a remainder of 1."
// (You don't need an if-statement yet — just show the remainder value.)

// (write your code here)

console.log(`${a} divded by 2 leaves a reminder of ${a % 2}`);