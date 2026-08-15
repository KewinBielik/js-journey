// Lesson 33 — start from your working Lesson 32 app.
// Goal: pull each list row into LinkItem.jsx (see LESSON.md).

import { useState } from "react";
import LinkItem from "./LinkItem.jsx";

function App() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [links, setLinks] = useState([]);
  const [nextId, setNextID] = useState(0);

  function submit(event) {
    event.preventDefault();

    if (!text.trim() || !url.trim()) {
      setError("Enter all fields");
      return;
    }

    const newLink = {
      id: nextId,
      title: text,
      url: url,
    };
    setLinks([...links, newLink]);
    setNextID((a) => a + 1);

    setText("");
    setUrl("");
    setError("");
  }

  function changeText(event) {
    setText(event.target.value);
  }

  function changeUrl(event) {
    setUrl(event.target.value);
  }

  function deleteLink(id) {
    setLinks(links.filter((link) => link.id !== id));
  }

  return (
    <div>
      <h1>Link saver</h1>
      <p className="hint">Lesson 33 — split a row into its own component (props).</p>
      <form id="linkForm" onSubmit={submit}>
        <label>
          Title
          <input
            type="text"
            value={text}
            placeholder="e.g. MDN fetch"
            onChange={changeText}
          />
        </label>
        <label>
          URL
          <input
            type="url"
            value={url}
            placeholder="https://…"
            onChange={changeUrl}
          />
        </label>
        <p className="error">{error}</p>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {links.map((link) => (
            <LinkItem title={link.title} url={link.url} key={link.id}  onDelete={() => deleteLink(link.id)}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
