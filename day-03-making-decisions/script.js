// ============================================
// Day 3 — Making Decisions (if / else)
// ============================================
// Read LESSON.md first. Complete the TODOs below.
// After each task: SAVE this file, REFRESH the browser, check the Console.

console.log("Day 3 is running. Time to make decisions. 🧠");


// --------------------------------------------
// TODO 1: Create a number variable `age`.
// Write an if/else that prints "You are an adult." if age is 18 or more,
// otherwise prints "You are a minor."

// (write your code here)

const age = 26;
if (age >= 18){
    console.log("You are an adult");
}
else
{
    console.log("You are a minor");
}


// --------------------------------------------
// TODO 2: Create a variable `temperature`.
// Use if / else if / else to print:
//   "Freezing"  if temperature is 0 or below
//   "Cold"      if temperature is below 15 (but above 0)
//   "Warm"      otherwise

// (write your code here)

const temperature = 16;
if (temperature <= 0){
    console.log("Freezing");
}
else if (temperature < 15)
{
    console.log("Cold");
}
else
{
    console.log("Warm");
}

// --------------------------------------------
// TODO 3: Create a number variable `myNumber`.
// Using % from Day 2, print "Even" if it's even, "Odd" if it's odd.
// Hint: a number is even when  myNumber % 2 === 0

// (write your code here)

const myNumber = 25;
if (myNumber % 2 === 0)
{
    console.log("Even");
}
else
{
    console.log("Odd");
}


// --------------------------------------------
// TODO 4: Create two variables, `password` (a string) and `correctPassword` (a string).
// If they are exactly equal (===), print "Access granted." Otherwise "Access denied."

// (write your code here)

const password = "abc1234";
const correctPassword = "abc1234";
if (password === correctPassword)
{
    console.log("Access granted");
}
else
{
    console.log("Access Denied");
}

// --------------------------------------------
// TODO 5 (bonus): Create a variable `score` (0–100).
// Print a letter grade using if / else if / else:
//   90+  -> "A",  80-89 -> "B",  70-79 -> "C",  below 70 -> "F"
// Use a template literal to print e.g. "Score 85 = grade B".


// (write your code here)

const score = 54;
if (score >= 90)
{
    console.log(`Score ${score} = grade A`);
}
else if (score >= 80)
{
    console.log(`Score ${score} = grade B`);
}
else if (score >= 70)
{
    console.log(`Score ${score} = grade C`);
}
else if (score < 70)
{
    console.log(`Score ${score} = grade F`);
}