// Lesson 34 — working link saver from Lesson 33.
// New job: remember links after refresh. See LESSON.md.

import { useState, useEffect } from "react";
import LinkItem from "./LinkItem.jsx";



function App() {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const [links, setLinks] = useState(() => {
    const raw = localStorage.getItem("links");
    if (raw === null) return [];
    return JSON.parse(raw);
  });

  const [nextId, setNextID] = useState(() => {
    const raw = localStorage.getItem("nextID");
    if (raw === null) return 0;
    return JSON.parse(raw);
  });

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
    localStorage.setItem("nextID", JSON.stringify(nextId));
  }, [links, nextId]);

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
      <p className="hint">Lesson 34 — save links with useEffect + localStorage.</p>
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
          <LinkItem
            key={link.id}
            title={link.title}
            url={link.url}
            onDelete={() => deleteLink(link.id)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
