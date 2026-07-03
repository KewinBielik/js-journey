// ============================================
// Lesson 12 — Dynamic Lists (data + DOM)
// ============================================
// Read LESSON.md first. Build the shopping list app below.

console.log("Lesson 12 — Dynamic lists ready.");


// --------------------------------------------
// DATA — your shopping list (array of strings)
// Start with 2-3 items so the page isn't empty on first load.

const items = [
  // add a few starter items here
  "Milk", "Eggs", "Ham"
];


// --------------------------------------------
// TODO 1: Select #itemList, #itemInput, and #addBtn.

// (write your code here)

const itemList = document.getElementById("itemList");
let itemInput = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");


// --------------------------------------------
// TODO 2: Write a function `render()` that:
// - Clears the list (list.innerHTML = "")
// - Loops over `items` with forEach
// - For each item, creates an <li>, sets its text, appends it to #itemList
// Call render() once at the end so the page shows your starter items.

// (write your code here)

function render(){
  itemList.innerHTML = "";
  items.forEach(function(item, index){
    const li = document.createElement("li");
    li.textContent = item;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function(){
      items.splice(index, 1);
      render();
    })

    li.appendChild(deleteBtn);

    itemList.appendChild(li);
  })
}
render();


// --------------------------------------------
// TODO 3: When #addBtn is clicked:
// - Read the input's .value
// - If it's not empty, push it to `items`, clear the input, call render()
// - If empty, do nothing (or show a brief message in the console)

// (write your code here)

addBtn.addEventListener("click", function(){
  if (itemInput.value === "") return;
  items.push(itemInput.value);
  itemInput.value = "";
  render();
})

// --------------------------------------------
// TODO 4 (bonus): In render(), for each <li> also add a "Delete" button.
// When clicked, remove that item from the `items` array and call render().
// Hint: you'll need to know WHICH item to delete — use the index from forEach:
//   items.forEach(function (item, index) { ... })

// (write your code here)

