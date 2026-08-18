// Lesson 36 — React repo explorer. Read ../LESSON.md.
// Peek at day-26 (vanilla), day-33 (props), day-34 (persist), day-35 (fetch).

import { useEffect, useState } from "react";

const API_URL = "https://api.github.com/users/";
const defaultStatus = "Search for a user to see their repos."

function RepoItem (props){
  return (
    <li  className="item">
    <a href={props.url} target="_blank" rel="noopener" className="name">{props.name}</a>
    <p className="desc">{props.description ? props.description : "No description"}</p>
    <button className="btn-fav" onClick={props.favButton}> {"⭐"}</button>
    </li>
    )
}

function App() {

  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const [status, setStatus] = useState(defaultStatus);

  const [repos, setRepos] = useState([]);
  const [favIds, setFavIds] = useState([]);

  useEffect (() => {
    async function load(){
      setStatus("Loading...");
      try {
        const response = await fetch(`${API_URL}${username}/repos`);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);
        setStatus(defaultStatus);
        setRepos(data);
      } catch (error) {
        console.log(`we got an error ${error}`);
      }
    }
    if (username) load();
  }, [username])

  function addFavourite(id) {
    if (favIds.includes(id)){
      setFavIds(favIds.filter((favId)=>favId!==id));
    } else {
      setFavIds([...favIds, id]);
    }
    console.log(favIds);
  }

  function isFav(event) {
    if (event.target.className === "btn-fav"){
      event.target.className = "btn-fav is-fav";
    } else {
      event.target.className = "btn-fav";
    }
    
  
  }

  function changeInput(event){
    setInput(event.target.value);
  }

  function submit(event) {
    event.preventDefault();
    console.log("elo");

    if (!input.trim()){
      console.log("empty input");
      return;
    }

    setUsername(input);
    setInput("");


  }

  return (
    <div>
      <h1>GitHub repos</h1>
      <p className="hint">Lesson 36 — fetch a list, show it, remember your stars.</p>

      <form onSubmit={submit}>
        <input type="text" value={input} onChange={changeInput} placeholder="GitHub username" />
        <button type="submit">Search</button>
      </form>

      <p className="status">{status}</p>
      <ul>
        {repos.map((repo) => (
          //<li key={repo.id}>
            <RepoItem name={repo.name} url={repo.url} key={repo.id} description={repo.description} favButton = {isFav}></RepoItem>
          //</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
