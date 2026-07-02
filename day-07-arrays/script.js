// ============================================
// Lesson 7 — Arrays
// ============================================
// Read LESSON.md first. Complete the TODOs below. Use JS-style braces.
// After each task: SAVE this file, REFRESH the browser, check the Console.

console.log("Lesson 7 is running. Let's make some lists. 📋");


// --------------------------------------------
// TODO 1: Create an array called `hobbies` with at least 3 of your hobbies (strings).
// Print the whole array, then print how many hobbies it has using .length

// (write your code here)

const hobbies = ["GYM", "Skateboarding", "Books"];
for (const hobby of hobbies){
    console.log(hobby);
}
console.log(hobbies.length);


// --------------------------------------------
// TODO 2: Print the FIRST hobby and the LAST hobby.
// For the last one, use the  array[array.length - 1]  pattern (don't just hardcode the number).

// (write your code here)

console.log(hobbies[0]);
console.log(hobbies[hobbies.length - 1]);


// --------------------------------------------
// TODO 3: Add a new hobby to the end with .push(), then remove it again with .pop().
// Print the array after each step so you can see it change.

// (write your code here)

hobbies.push("Dancing");
console.log(hobbies);
hobbies.pop();
console.log(hobbies);

// --------------------------------------------
// TODO 4: Use a for loop to print every hobby on its own line,
// formatted like: "Hobby 1: reading"  (use i + 1 so it reads naturally to humans).

// (write your code here)

for (let i = 0; i < hobbies.length; i++){
    console.log(`Hobby ${i + 1}: ${hobbies[i]}`);
}

// --------------------------------------------
// TODO 5: Create an array `numbers` = [4, 8, 15, 16, 23, 42].
// Use a for loop to add them all up and print the total.

// (write your code here)

const numbers = [4, 8, 15, 16, 23, 42];
let sum = 0;

for (let i = 0; i < numbers.length; i++){
    sum += numbers[i];
}
console.log(`The total sum = ${sum}`);


// --------------------------------------------
// TODO 6 (bonus): Write a function `findMax` that takes an array of numbers and RETURNS
// the largest one. Test it with findMax([4, 8, 15, 16, 23, 42]) -> should return 42.
// Hint: start with a variable `max = numbers[0]`, loop through, and if an item is bigger
// than max, update max. Return max at the end.

// (write your code here)

function findMax(array)
{
    let max = array[0];
    for (const number of array){
        if (max < number){
            max = number;
        }
    }
    return max;
}

console.log(findMax([4, 8, 15, 16, 23, 42]));
