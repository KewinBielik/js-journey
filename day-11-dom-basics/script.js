// ============================================
// Lesson 11 — The DOM
// ============================================
// Read LESSON.md first. Write ALL the JavaScript below.
// Save → refresh the browser → watch the PAGE change (not just the console).

console.log("Lesson 11 — DOM is ready.");


// --------------------------------------------
// TODO 1: Select the <h1> with id "mainTitle" and change its text to
// "I can control the DOM!" when the page loads.

// (write your code here)
const title = document.getElementById("mainTitle");
title.textContent = "I can control the DOM!";


// --------------------------------------------
// TODO 2: Select the button with id "changeTextBtn".
// When clicked, change the <p id="message"> text to "You clicked the button!"

// (write your code here)
const btn = document.getElementById("changeTextBtn");
const message = document.getElementById("message");
btn.addEventListener("click", function(){
    message.textContent = "You clicked the button!";
})


// --------------------------------------------
// TODO 3: Select the button with id "toggleHighlightBtn".
// When clicked, toggle the "highlight" class on the div with id "messageBox".

// (write your code here)

const btn2 = document.getElementById("toggleHighlightBtn");
const div = document.getElementById("messageBox");
btn2.addEventListener("click", function(){
    div.classList.toggle("highlight");
})


// --------------------------------------------
// TODO 4: Build a working counter.
// - Select #counter, #incrementBtn, and #decrementBtn.
// - Start a variable `count` at 0.
// - When +1 is clicked, increase count and update the #counter text.
// - When -1 is clicked, decrease count and update the #counter text.

// (write your code here)

const counter = document.getElementById("counter");
const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
let count = 0;
incrementBtn.addEventListener("click", function(){
    count++;
    counter.textContent = count;
})
decrementBtn.addEventListener("click", function(){
    count--;
    counter.textContent = count;
})


// --------------------------------------------
// TODO 5: Select #greetBtn, #nameInput, and #greeting.
// When the button is clicked, read whatever is in the input and set #greeting to:
// "Hello, <name>!"  (use a template literal)
// If the input is empty, set #greeting to "Please type your name first."

const greetBtn = document.getElementById("greetBtn");
const nameInput = document.getElementById("nameInput");
const greeting = document.getElementById("greeting");
let read = "";

greetBtn.addEventListener("click", function(){
    read = nameInput.value;
    if (read === ""){
        greeting.textContent = "Please type your name first.";
    } else {
        greeting.textContent = `Hello, ${read}!`;
    }
})

// (write your code here)
