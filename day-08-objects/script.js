// ============================================
// Lesson 8 — Objects
// ============================================
// Read LESSON.md first. Complete the TODOs below. Use JS-style braces.
// After each task: SAVE this file, REFRESH the browser, check the Console.

console.log("Lesson 8 is running. Let's describe some things. 🧩");


// --------------------------------------------
// TODO 1: Create an object called `car` with these properties:
//   brand (string), year (number), isElectric (boolean).
// Print the whole car object, then print the brand using dot notation.

// (write your code here)

const car = {
    brand: "Mitsubishi",
    year: 2004,
    isElectric: false
};

console.log(car);
console.log(car.brand);


// --------------------------------------------
// TODO 2: Print the year using BRACKET notation (car["year"]).

// (write your code here)

console.log(car["year"]);

// --------------------------------------------
// TODO 3: Change the year to a different value, and add a new property `color`.
// Print the whole car object again to see the changes.

// (write your code here)

car.year = 2003;
car.color = "dark red";

console.log(car);

// --------------------------------------------
// TODO 4: Create an array `books` containing 3 objects. Each book has a `title` and `pages`.
// Then use a for...of loop to print: "<title> has <pages> pages." for each book.

// (write your code here)

const books = [
    {title : "Ogniem i mieczem", pages : 589},
    {title : "Lord of The Rings", pages : 936},
    {title : "Harry Potter", pages : 476} 
];

for (const book of books){
    console.log(`${book.title} has ${book.pages} pages.`);
}

// --------------------------------------------
// TODO 5: Loop over your `books` array and print ONLY the titles of books
// that have more than 200 pages.

// (write your code here)

for (const book of books){
    if (book.pages > 200){
        console.log(book.title);
    }
}

// --------------------------------------------
// TODO 6 (bonus): Write a function `totalPages` that takes an array of book objects
// and RETURNS the sum of all their pages.
// Test it with your books array.

// (write your code here)

function totalPages(books){
    let sum = 0;
    for (const book of books){
        sum += book.pages;
    }
    return sum;
}

console.log(totalPages(books));
