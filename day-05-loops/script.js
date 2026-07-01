// ============================================
// Lesson 5 — Loops
// ============================================
// Read LESSON.md first. Complete the TODOs below. Use JS-style braces.
// After each task: SAVE this file, REFRESH the browser, check the Console.

console.log("Lesson 5 is running. Let's repeat ourselves. 🔁");


// --------------------------------------------
// TODO 1: Use a for loop to print the numbers 1 through 10 (each on its own line).

// (write your code here)

for (let i = 1; i <= 10; i++){
    console.log(i);
}


// --------------------------------------------
// TODO 2: Use a for loop to print the numbers 10 down to 1 (counting DOWN).
// Hint: start i high, and use i-- to decrease it.

// (write your code here)

for (let i = 10; i >=1; i--){
    console.log(i);
}


// --------------------------------------------
// TODO 3: Use a for loop to print only the EVEN numbers from 1 to 20.
// Hint: loop 1..20 and use an if with  i % 2 === 0

// (write your code here)

for (let i = 1; i <=20; i++){
    if (i % 2 === 0){
        console.log(i); 
    }
}


// --------------------------------------------
// TODO 4: Use a for loop to add up the numbers 1 to 100, then print the total.
// Hint: create `let total = 0;` BEFORE the loop, and inside do  total = total + i;
// (The correct answer is 5050.)

// (write your code here)

let total = 0;
for (let i = 1; i <= 100; i++){
    total += i;
}
console.log(total); 


// --------------------------------------------
// TODO 5: Use a while loop to count down from 5 to 1, then print "Liftoff!".

// (write your code here)

let count = 5;
while (count >= 1){
    console.log(count);
    count -= 1;
}
console.log("liftoff!");

// --------------------------------------------
// TODO 6 (bonus): Loop from 1 to 15. For each number print:
//   "Fizz" if it's divisible by 3,
//   "Buzz" if it's divisible by 5,
//   otherwise just the number.
// Hint: use if / else if / else with  i % 3 === 0  and  i % 5 === 0
// (Don't worry about numbers divisible by both yet — we'll get fancy later.)

// (write your code here)

for (let i = 1; i <= 15; i++){
    if (i % 3 === 0){
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}