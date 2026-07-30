// ============================================
// Lesson 26 — Mini-project: GitHub Repo Explorer
// ============================================
// Read LESSON.md for the spec. You write all the JavaScript.
//
// The HTML and CSS are done — today is about logic, not layout.
// Elements available to you (by id): usernameInput, searchBtn, status, repoList
// CSS classes ready to use: repo-item, repo-info, repo-name, repo-desc,
//                          repo-meta, btn-fav, is-fav

// Suggested build order:
// 1. Data      — where do fetched repos live? where do favourites live?
// 2. Load      — read saved favourites from localStorage on startup
// 3. Fetch     — search a username, get their repos
// 4. render()  — draw the list from your data
// 5. Favourite — toggle, save, and make it survive a refresh


const userInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const statusEl = document.getElementById("status");
const repoList = document.getElementById("repoList");

const API_URL = "https://api.github.com/users/";

let favReposIds = [];
let lastUsername = null;

async function loadData() {
    if (userInput.value === "") return;
    try {
        const username = userInput.value;
        console.log(`read value from input - ${username}`);
        statusEl.textContent = "Loading...";
        const response = await fetch(`${API_URL}${username}/repos`);
        if (!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);
        statusEl.textContent = "";
        localStorage.setItem("lastUsername", username);
        render(data);
    } catch (error) {
        console.log(`we just got an error - ${error}`);
        statusEl.textContent = "An error occured";
    }
}

function saveFavourites(){
    localStorage.setItem("favRepos", JSON.stringify(favReposIds));
}

function render(repos) {
    repoList.innerHTML = "";


    repos.forEach((t, index) => {

        const li = document.createElement("li");
        li.classList.add("repo-item");

        const name = document.createElement("a");
        name.classList.add("repo-name");
        name.textContent = t.full_name;
        name.href = t.html_url;
        name.target = "_blank"; 
        name.rel = "noopener";

        const description = document.createElement("p");
        description.classList.add("repo-desc");
        description.textContent = t.description || "No description";

        const info = document.createElement("p");
        info.classList.add("repo-meta");
        info.textContent = `Repository size: ${t.size}`;

        const favButton = document.createElement("button");
        favButton.classList.add("btn-fav");
        favButton.textContent = "⭐";

        favButton.addEventListener("click", () => {
            if (favButton.classList.contains("is-fav")){
                favButton.classList.remove("is-fav");
                favReposIds = favReposIds.filter(id => id !== t.id);
            } else {
                favButton.classList.add("is-fav");
                favReposIds.push(t.id);
            }
            saveFavourites();
        })

        const topSection = document.createElement("div");
        topSection.classList.add("repo-info");

        if (favReposIds.includes(t.id)) favButton.classList.add("is-fav");


        topSection.appendChild(name);
        topSection.appendChild(info);
        topSection.appendChild(description);
        li.appendChild(topSection);
        li.appendChild(favButton);
        repoList.appendChild(li);
    })
}

searchBtn.addEventListener("click", loadData);

let storage = JSON.parse(localStorage.getItem("favRepos"));
if (storage === null ) {
    console.log("Storage is empty");
} else {
    favReposIds = storage;
}

lastUsername = localStorage.getItem("lastUsername");
if (lastUsername !== null) {
    userInput.value = lastUsername;    
    loadData();
}