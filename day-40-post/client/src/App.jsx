// Lesson 40 — your Lesson 39 app. It already READS the API.
// New job: a form that SENDS a new note. Read ../../LESSON.md

import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/notes";

function App() {
  const defaultStatus = "Nothing loaded yet.";

  const [list, setList] = useState([]);
  const [status, setStatus] = useState(defaultStatus);

  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");

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

  useEffect(() => {
    load();
  }, []);

  async function sendNote(note) {
    try {
      setStatus("Attempting to send a new note...");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(note),
      });
      if (!response.ok) throw new Error(response.status);
      setStatus("Succesfully sent the note");
      } catch (error) {
        console.log(error);
        setStatus("Error while sending");
        return;
      }
      load();
    }
  
  
  function submit(event){
    event.preventDefault();
    if (!inputDesc.trim() || !inputTitle.trim()){
      setStatus("Enter both title and description");
      return;
    }
    const newNote = {title : inputTitle, description : inputDesc};
    sendNote(newNote);

    setInputDesc("");
    setInputTitle("");
  }

  function updateInputTitle(event){
    setInputTitle(event.target.value);
  }

  function updateInputDesc(event){
    setInputDesc(event.target.value);
  }

  return (
    <div>
      <h1>My notes API</h1>
      <p className="hint">Lesson 40 — read AND write through the API.</p>
      <form onSubmit={submit}>
      <input type="text" value={inputTitle} onChange={updateInputTitle} placeholder="Enter Title..."></input>
      <input type="text" value={inputDesc} onChange={updateInputDesc}  placeholder="Enter description..."></input>
      <button type="submit">Submit</button>
      </form>
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
