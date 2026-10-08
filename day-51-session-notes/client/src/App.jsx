// Lesson 51 — this file changes today. Read ../../LESSON.md
// TODO (Part 4): credentials on every fetch, login form, remove the API key.

import { useEffect, useState } from "react";
import NoteItem from "./NoteItem";

const API_URL = "http://localhost:3000/notes";

function App() {
  const defaultStatus = "Enter your username and password to log in";

  const [list, setList] = useState([]);
  const [status, setStatus] = useState(defaultStatus);

  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  const [inputLogin, setInputLogin] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [editNoteId, setEditNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const [me, setMe] = useState(null);


  async function load() {
    try {
      setStatus("Loading...");
      const response = await fetch(API_URL, {
        credentials: "include"
      });
      if (!response.ok) throw new Error(response.status);
      const data = await response.json();
      setList(data);
      setStatus("Loading successful");
    } catch (error) {
      console.log(error);
      setStatus("loading error");
    }
  }

  async function checkLoginStatus() {
    try {
      const response = await fetch("http://localhost:3000" + "/me", {
        credentials: "include"
      })
      if (response.status === 200){
        const data = await response.json();
        console.log(`logged as ${data.username} res.status - ${response.status}`);
        setMe(data.username);
        load();
      } else throw new Error(response.status);
    } catch (error) {
      console.log(error.message);
      if (error.message === "401"){
        setMe(null);
      }
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);

  async function sendNote(note) {
    try {
      setStatus("Attempting to send a new note...");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(note),
      });
      if (!response.ok) throw new Error(response.status);
      setStatus("Succesfully sent the note");
      } catch (error) {
        console.log(error);
        if (error.message === "401"){
          setStatus("Not logged in");
          setMe(null);
          return;
        }
        setStatus("Error while sending");
        return;
      }
      load();
    }
  
  async function deleteNote(noteId){
    console.log(`Trying to delete note with id = ${noteId}`);

    try {
      setStatus("Attempting to delete a note...");
      const response = await fetch(`${API_URL}/${noteId}`, 
        { method: "DELETE",
          credentials: "include"
        });
      if (!response.ok) throw new Error(response.status);
      setStatus("Succesfully deleted the note");
    } catch (error) {
      console.log(error);
      if (error.message === "401"){
        setStatus("Not logged in");
        setMe(null);
        return;
      }
      setStatus("Error while deleting");
      return;
    }
    load();
  }

  async function editNote(noteId){
    console.log(`Trying to edit note with id = ${noteId}`);

    try {
      setStatus("Attempting to edit a note...");
      const response = await fetch(`${API_URL}/${noteId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({title: editTitle, description: editDesc}),
      })
      if (!response.ok) throw new Error(response.status);
      setStatus("Succesfully edited the note");
    } catch (error) {
      console.log(error);
      if (error.message === "401"){
        setStatus("Not logged in");
        setMe(null);
        return;
      }
      setStatus("Error while editing");
      return;
    }
    load();
  }

  async function login(username, password){
    try{
      const response = await fetch("http://localhost:3000" + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify({ username: username, password: password})
      }) 
      if (response.status === 200){
        const data = await response.json()
        console.log(data);
        checkLoginStatus();
      } else throw new Error(response.status);
    } catch (error){
      setStatus("Wrong username or password")
      console.log(error);
    }
  }

  async function logout() {
    const response = await fetch("http://localhost:3000" + "/logout", {
      method: "POST",
      credentials: "include"
    })
    setMe(null);
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

  function updateEditNoteId(noteId){
    setEditNoteId(noteId);
    console.log(`edit id set to ${noteId}`);
    if (noteId === null) {
      setEditDesc("");
      setEditTitle("");
    } else {
      const targetNote = list.find((n) => n.id === noteId);
      setEditDesc(targetNote.description);
      setEditTitle(targetNote.title);
    }
  }

  function updateEditTitle(event){
    setEditTitle(event.target.value);
  }

  function updateEditDesc(event){
    setEditDesc(event.target.value);
  }

  function submitLogin (event){
    event.preventDefault();
    if (!inputLogin.trim() || !inputPassword.trim()){
      return;
    }
    login(inputLogin, inputPassword);
    setInputLogin("");
    setInputPassword("");
  }

  function updateInputLogin(event){
    setInputLogin(event.target.value);
  }

  function updateInputPassword(event){
    setInputPassword(event.target.value);
  }

  if (me){
  return (
    <div>
      <h1>My notes API</h1>
      <p className="hint">Lesson 42 — Adding the edit button.</p>
      <form onSubmit={submit}>
      <input type="text" value={inputTitle} onChange={updateInputTitle} placeholder="Enter Title..."></input>
      <input type="text" value={inputDesc} onChange={updateInputDesc}  placeholder="Enter description..."></input>
      <button type="submit">Submit</button>
      </form>
      <button onClick={logout}>Logout</button>
      <p className="status">{status}</p>
      <ul>
        
        {list.map((listItem) => (
          <NoteItem 
          key={listItem.id} 
          title={listItem.title} 
          description={listItem.description} 
          onDelete={() => deleteNote(listItem.id)} 
          
          onEdit={() => updateEditNoteId(listItem.id)}
          isBeingEdited = {editNoteId === listItem.id}

          cancel ={()=>updateEditNoteId(null)}
          save ={()=>{
            editNote(listItem.id);
            updateEditNoteId(null);
          }}
          
          editTitle = {editTitle}
          onChangeTitle = {updateEditTitle}
          
          editDesc = {editDesc}
          onChangeDesc = {updateEditDesc}
          />
        ))}
      </ul>
    </div>
  );
} else {
  return (
    <div>
      <h1>Login to access the server</h1>
      <form onSubmit={submitLogin}>
        <input type="text" value={inputLogin} onChange={updateInputLogin} placeholder="Enter login"></input>
        <input type="text" value={inputPassword} onChange={updateInputPassword} placeholder="Enter password"></input>
        <button type="submit">Log in</button>
      </form>
      <p className="status">{status}</p>
    </div>
  );
}}

export default App;
