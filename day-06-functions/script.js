// ============================================
// Lesson 6 — Functions
// ============================================
// Read LESSON.md first. Complete the TODOs below. Use JS-style braces.
// After each task: SAVE this file, REFRESH the browser, check the Console.

console.log("Lesson 6 is running. Time to build tools. 🛠️");


// --------------------------------------------
// TODO 1: Define a function called `greet` that takes one parameter `name`
// and prints "Hello, <name>!" using a template literal.
// Then CALL it twice with two different names.

// (write your code here)

function greet(name){
    console.log(`Hello ${name}!`);
}

greet("Kewin");
greet("Janek");


// --------------------------------------------
// TODO 2: Define a function `add` that takes two numbers and RETURNS their sum.
// Then call it, store the result in a variable, and console.log that variable.

// (write your code here)

function add(a, b){
    return a + b;
}
const sum = add(5, 7);
console.log(sum);

// --------------------------------------------
// TODO 3: Define a function `isEven` that takes a number and RETURNS true if it's even,
// false if it's odd. (Hint: return the result of  number % 2 === 0 )
// Test it by logging isEven(4) and isEven(7).

// (write your code here)

function isEven(a){
    return a % 2 === 0;
}

console.log(isEven(4));
console.log(isEven(7));

// --------------------------------------------
// TODO 4: Define a function `getGrade` that takes a `score` (0-100) and RETURNS
// the letter grade as a string: "A" for 90+, "B" for 80+, "C" for 70+, otherwise "F".
// Test it by logging getGrade(95), getGrade(72), getGrade(40).

// (write your code here)

function getGrade(score){
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else {
        return "F";
    }
}

console.log(getGrade(95));
console.log(getGrade(72));
console.log(getGrade(40));

// --------------------------------------------
// TODO 5: Define a function `sumUpTo` that takes a number `n` and RETURNS the sum
// of all numbers from 1 to n (use a for loop INSIDE the function).
// Test it: sumUpTo(100) should return 5050.

// (write your code here)

function sumUpTo(n){
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

console.log(sumUpTo(100));

// --------------------------------------------
// TODO 6 (bonus): Define a function `greetAll` that takes a number `times` and a `name`,
// and prints the greeting that many times (a loop inside a function).
// Example: greetAll(3, "Kewin") prints "Hello, Kewin!" three times.

// (write your code here)

function greetAll(times, name){
    for (let i = 1; i <= times; i++ ) {
        console.log(`Hello, ${name}!`);
    }
}

greetAll(3 , "Kewin");