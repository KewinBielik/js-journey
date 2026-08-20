// Lesson 37 — Node.js. Read LESSON.md.
// Run: node script.js
// No browser. Output is the terminal.

import fs, { readFileSync } from "fs";

let array = [
    {   
        title : "Pneuma",
        description : "Progressive rock song" 
    },
    {
        title : "Pol Smoke",
        description : "Polish Hip Hop"
    },
    {
        title : "A noc taka czarna",
        description : "Jechanka"
    }
]




try {
    const raw = fs.readFileSync("notes.json", "utf-8");
    const notes = JSON.parse(raw);
    array = notes;
    console.log(notes);
} catch (Error) {
    console.log(Error);
}

array.push({
    title : "Where is my mind",
    description : "By Pixies"
})


fs.writeFileSync("notes.json", JSON.stringify(array, null, 2));


