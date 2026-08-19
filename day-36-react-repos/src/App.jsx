// Lesson 36 — React repo explorer. Read ../LESSON.md.
// Peek at day-26 (vanilla), day-33 (props), day-34 (persist), day-35 (fetch).

import { useEffect, useState } from "react";
import RepoItem from "./RepoItem";

const API_URL = "https://api.github.com/users/";
const defaultStatus = "Search for a user to see their repos."



function App() {

  const [input, setInput] = useState("");
  const [username, setUsername] = useState(()=>{
    const raw = localStorage.getItem("username");
    if (raw === null) return "";
    return raw;
  });

  const [status, setStatus] = useState(defaultStatus);

  const [repos, setRepos] = useState([]);
  const [favIds, setFavIds] = useState(()=>{
    const raw = JSON.parse(localStorage.getItem("favIds"));
    if (raw === null) return []
    return raw;
  });

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
        localStorage.setItem("username", username);
      } catch (error) {
        console.log(`we got an error ${error}`);
        setStatus("Repository not found");
        setRepos([]);
      }
    }
    if (username) load();
  }, [username])

  useEffect (() => {
    localStorage.setItem("favIds", JSON.stringify(favIds));
  }, [favIds])



  function addFavourite(id) {
    if (favIds.includes(id)){
      setFavIds(favIds.filter((favId)=>favId!==id));
    } else {
      setFavIds([...favIds, id]);
    }
  }

  function changeInput(event){
    setInput(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

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
            <RepoItem 
            name={repo.name} 
            url={repo.html_url} 
            key={repo.id} 
            description={repo.description} 
            favButton = {()=>{addFavourite(repo.id)}}
            isFav = {favIds.includes(repo.id)}></RepoItem>
        ))}
      </ul>
    </div>
  );
}

export default App;
