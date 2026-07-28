// ============================================
// Lesson 25 — fetch + async/await
// ============================================
// Read LESSON.md first. You write the JavaScript.
//
// The DOM elements are selected for you so you can focus on the new idea:
// getting data from the internet.

const loadBtn = document.getElementById("loadBtn");
const statusEl = document.getElementById("status");
const avatarEl = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const reposEl = document.getElementById("repos");

// The API you're calling (open in your browser first — see LESSON.md Goal 1):
const API_URL = "https://api.github.com/users/KewinBielik";

// Your code below.
// Goal: click the button -> fetch the data -> show it on the page.

async function loadData() {
    try {
        statusEl.textContent = `Loading...`;
        const response =  await fetch(API_URL);
        if (!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);
        nameEl.textContent = `this is my username - ${data.name || data.login}`;
        reposEl.textContent = `I have ${data.public_repos} public repos`;
        avatarEl.src = data.avatar_url;
        avatarEl.style.display = `block`;   
        statusEl.textContent = ``;  
    } catch (error) {
        console.log(`we just got an error - ${error}`);    
        statusEl.textContent = `An error occured`;
    }  

}

loadBtn.addEventListener("click", loadData);