// Lesson 29 — From memory
// Read LESSON.md. Build the link saver here.
// Try not to open older day-* folders until you're stuck.

const linkForm = document.getElementById("linkForm");
const formError = document.getElementById("formError");
const linkList = document.getElementById("linkList");

let links = [];

function render() {
    linkList.innerHTML = "";

    localStorage.setItem("links", JSON.stringify(links));

    links.forEach((link, index) => {
        
        const linkItem = document.createElement("li");
        linkItem.classList.add("link-item");
        
        const linkTitle = document.createElement("a");
        linkTitle.textContent = link.title;
        linkTitle.href = link.url;
        linkTitle.target = "_blank";
        linkTitle.rel = "noopener";

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn-delete");
        deleteButton.textContent = "delete";

        deleteButton.addEventListener("click", () => {
            links.splice(index, 1);
            render();
        })
        

        linkItem.appendChild(linkTitle);
        linkItem.appendChild(deleteButton);
        linkList.appendChild(linkItem);

        console.log(link.title);
    })
}


linkForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = linkForm.title.value.trim();
    let url = linkForm.url.value.trim();

    if (!title || !url || (!url.startsWith("http://") && !url.startsWith("https://"))) 
    {
        console.log("no url or title");
        formError.textContent = "Please enter both title and url";
        return;
    }
    formError.textContent = "";

    links.push({
        title: title,
        url: url
    })
    linkForm.reset();
    render();
})

const storage = JSON.parse(localStorage.getItem("links"));
if (storage) {
    links = storage;
    render();
}