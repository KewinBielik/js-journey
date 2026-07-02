// ============================================
// Lesson 9 — Array Methods
// ============================================
// Read LESSON.md first. Complete the TODOs below. Use JS-style braces.
// After each task: SAVE this file, REFRESH the browser, check the Console.

console.log("Lesson 9 is running. Time for the modern way. ⚡");


// --------------------------------------------
// TODO 1: Create an array `hobbies` with at least 3 hobbies.
// Use .forEach() to print: "I like <hobby>" for each one.

// (write your code here)

const hobbies = ["GYM", "Books", "Dancing"];

hobbies.forEach(function (hobby){
    console.log(`I like ${hobby}`);
})


// --------------------------------------------
// TODO 2: Create an array `prices` = [10, 25, 8, 40, 15].
// Use .map() to create a NEW array where every price has 20% tax added.
// Print the new array. (Hint: return price * 1.2 inside the callback)

// (write your code here)

const prices = [10, 25, 8, 40, 15];
const pricesTaxed = prices.map(function(price){
    return price * 1.2;
})
console.log(pricesTaxed);

// --------------------------------------------
// TODO 3: Create an array `books` with at least 4 book objects.
// Each book should have `title` and `pages`.
// Include at least one book with 200 pages or fewer so your filter actually excludes something.
// Use .filter() to get only books with more than 200 pages, then print their titles.

// (write your code here)

const books = [
    {title: "Maly ksiaze", pages: 178},
    {title: "Power of Habit", pages: 345},
    {title: "The way of shadows", pages: 489},
    {title: "Koziolek matolek", pages: 87}
]
const booksFilterd = books.filter(function(book){
    return book.pages > 200;
});
for (const book of booksFilterd){
    console.log(book.title);
}


// --------------------------------------------
// TODO 4: Create an array `numbers` = [4, 8, 15, 16, 23, 42].
// Use .reduce() to get the total sum. Print the result.

// (write your code here)

const numbers = [4, 8, 15, 16, 23, 42];

const numbersTotal = numbers.reduce(function(sum, num){
    return sum + num;
}, 0);

console.log(numbersTotal);


// --------------------------------------------
// TODO 5: Starting with your `prices` array from TODO 2,
// use .filter() to keep only prices over 15, then .map() to double each remaining price.
// Print the final array.
// Hint: you can chain them:  prices.filter(...).map(...)

// (write your code here)

const doubleHighPrices = prices.filter(function(price){
    return price > 15;
}).map(function(price){
    return price * 2;
});
// not sure if I wrote this clean, style looks weird

console.log(doubleHighPrices);



// --------------------------------------------
// TODO 6 (bonus): Use .reduce() on your `books` array to return the total number of pages.
// This replaces the manual loop you wrote in Lesson 8.
// Print the result.

// (write your code here)

const totalPages = books.reduce(function(sum, book){
        return sum + book.pages;
}, 0);
console.log(totalPages);
