// Lesson 32 — rebuild your link saver in React.
// Read ../LESSON.md first. You write App.

import { useState } from "react";







function App() {

  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  
  const [links, setLinks] = useState([]);
  const [nextId, setNextID] = useState(0);

  function submit(event){
    event.preventDefault();

    if (!text.trim() || !url.trim()){
      setError("Enter all fields");
      return;
    }

    const newLink = {
      id : nextId,
      title : text,
      url : url
    }
    setLinks([...links, newLink]);
    setNextID(a => a + 1);


    setText("");
    setUrl("");
    setError("");

  }


  const changeText = (event) => {
    const value = event.target.value;
    setText(value);
  }

  const changeUrl = (event) => {
    const value = event.target.value;
    setUrl(value);
  }

  function deleteLink(id) {
    setLinks(links.filter((link) => link.id !== id));
  }

  return (
    <div>
      <h1>Link saver</h1>
      <p className="hint">Lesson 32 — a list in state. Same app as Lesson 29, React this time.</p>
      <form id="linkForm" onSubmit={submit}>
        
        <label>
            Title
            <input type="text" value={text} placeholder="e.g. MDN fetch" onChange={changeText}></input>
        </label>
        <label>
            URL
            <input type="url" value={url} placeholder="https://…" onChange={changeUrl}></input>
        </label>
        <p className="error">{error}</p>
            <button type="submit">Submit</button>
      </form>
        <ul>
        {links.map((link) => (
          <li key = {link.id} className="item">
            <a href={link.url} target="_blank" rel="noopener">{link.title}</a>
            <button type="button" className="btn-delete" onClick={() => deleteLink(link.id)}>delete</button>
          </li>
        ))}
        </ul>
        
    </div>
  );
}

export default App;
