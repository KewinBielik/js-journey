// Lesson 39 — fetch YOUR Express API. Read ../../LESSON.md
// API: http://localhost:3000/notes  (server must be running)

import { useEffect, useState } from "react";



function App() {

  const defaultStatus = "Nothing loaded yet.";

  const [list, setList] = useState([]);
  const [status, setStatus] = useState(defaultStatus);

  useEffect(()=>{
    async function load() {
      try {
        setStatus("Loading...")
        const response = await fetch("http://localhost:3000/notes");
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        console.log(data);
        setList(data);
        setStatus("Loading successful");
      } catch (error) {
        console.log(error);
        setStatus("loading error");
      }
      
    }
    load();
  }, [])

  return (
    <div>
      <h1>My notes API</h1>
      <p className="hint">Lesson 39 — React fetches localhost Express. CORS lives on the server.</p>
      <p className="status">{status}</p>
      <ul>
        {list.map((listItem)=>(
          <li key={listItem.title}>
            <p>{listItem.title}</p>
            <p className="hint">{listItem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
