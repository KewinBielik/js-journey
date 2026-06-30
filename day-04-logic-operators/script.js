// ============================================
// Day 4 — Combining Conditions (&&, ||, !)
// ============================================
// Read LESSON.md first. Complete the TODOs below. Use JS-style braces.
// After each task: SAVE this file, REFRESH the browser, check the Console.

console.log("Day 4 is running. Let's combine some logic. 🔗");


// --------------------------------------------
// TODO 1: Create `age` (number) and `hasTicket` (boolean).
// Using &&, print "Welcome to the concert!" only if age >= 18 AND hasTicket is true.
// Otherwise print "Entry denied."

// (write your code here)

const age = 26;
const hasTicket = true;

if(age >= 18 && hasTicket){
    console.log("Welcome to the concert!");
} else {
    console.log("Entry denied");
}


// --------------------------------------------
// TODO 2: Create `isWeekend` and `isHoliday` (both booleans).
// Using ||, print "Relax, no work today!" if it's the weekend OR a holiday.
// Otherwise print "Time to work."

// (write your code here)

const isWeekend = false;
const isHoliday = false;

if (isWeekend || isHoliday){
    console.log("Relax, no work today!");
} else {
    console.log("Time to work");
}


// --------------------------------------------
// TODO 3: Create `isLoggedIn` (boolean).
// Using !, print "Please log in first." when the user is NOT logged in.
// When they ARE logged in, print "Welcome back!"

// (write your code here)

const isLoggedIn = true;

if (!isLoggedIn){
    console.log("Please log in first.");
} else {
    console.log("Welcome back!");  
}


// --------------------------------------------
// TODO 4: Create a number `temperature`.
// Using &&, print "Perfect weather!" if temperature is greater than 18 AND less than 26.
// Otherwise print "Not ideal."

// (write your code here)

const temperature = 32;
if (temperature > 18 && temperature < 26){
    console.log("Perfect weather!");
} else {
    console.log("Not ideal.");
}


// --------------------------------------------
// TODO 5 (bonus): Create `age` and `hasLicense` (boolean) and `hasCar` (boolean).
// Print "You can drive yourself." only if age >= 18 AND hasLicense AND hasCar.
// If they're 18+ and have a license but NO car, print "You can drive, but need a car."
// Otherwise print "You cannot drive."
// Hint: you'll combine && with else if.

// (write your code here)

// age is already defined before so I am just gonna use that value
const hasLicense = true;
const hasCar = true;

if (age >= 18 && hasLicense && hasCar){
    console.log("You can drive yourself.");
} else if (age >= 18 && hasLicense && !hasCar) {
    console.log("You can drive, but need a car.");
} else {
    console.log("You cannot drive.");
}