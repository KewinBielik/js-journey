// Lesson 40 — your Lesson 39 app. It already READS the API.
// New job: a form that SENDS a new note. Read ../../LESSON.md

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/notes";

function App() {
  const defaultStatus = "Nothing loaded yet.";

  const [list, setList] = useState([]);
  const [status, setStatus] = useState(defaultStatus);

  useEffect(() => {
    async function load() {
      try {
        setStatus("Loading...");
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        setList(data);
        setStatus("Loading successful");
      } catch (error) {
        console.log(error);
        setStatus("loading error");
      }
    }
    load();
  }, []);

  // TODO: state for the form fields (title, description)
  // TODO: async function that POSTs a new note, then updates `list`

  return (
    <div>
      <h1>My notes API</h1>
      <p className="hint">Lesson 40 — read AND write through the API.</p>

      {/* TODO: a form here (submit + preventDefault, like Lesson 27) */}

      <p className="status">{status}</p>
      <ul>
        {list.map((listItem) => (
          <li key={listItem.id}>
            <p>{listItem.title}</p>
            <p className="hint">{listItem.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
