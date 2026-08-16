// Lesson 35 — GitHub profile in React. Read ../LESSON.md.
// Form is here so you can focus on fetch + useEffect.

import { useEffect, useState } from "react";



function App() {

  const API_URL = "https://api.github.com/users/";

  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("Nothing loaded yet.");

  useEffect (() => {
    async function load() {
      try {
        setStatus("Loading...");
        const response = await fetch(`${API_URL}${username}`);
        if (!response.ok){
          throw new Error(response.status);
        }
        const data = await response.json();
        setProfile(data);
        setStatus(`loaded user profile - ${data.name || data.login}`);
        console.log(data);
      } catch (error) {
        setStatus("Could not find this profile");
        setProfile(null);
      }
    }
    if (username) load();
  }, [username]);
  
  function submit(event){
    event.preventDefault();

    if (!input.trim()){
      console.log("empty name");
      return;
    }

    setUsername(input);

    setInput("");
    return;
  }

  function changeInput(event){
    setInput(event.target.value);
    return;
  }


  return (
    <div>
      <h1>GitHub profile</h1>
      <p className="hint">Lesson 35 — fetch when React says so (useEffect).</p>

      <form onSubmit={submit}>
        <input type="text" value={input} onChange={changeInput} placeholder="GitHub username" />
        <button type="submit">Load</button>
      </form>

      <div className="panel">
        <p className="status">{status}</p>
        {profile && (
        <img className="avatar" src={profile.avatar_url} alt="" />
        )}
        {profile && (
        <p>{`public repo count: ${profile.public_repos}`}</p>
        )}
      </div>
    </div>
  );
}

export default App;