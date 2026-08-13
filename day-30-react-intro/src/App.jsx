// Lesson 30 — start here. Read ../LESSON.md first.
// Replace this starter with your own component using useState.

import {useState} from "react";

function App() {

  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  
  function addCount() {
    setCount(a => a + 1);
  }

  function subCount() {
    setCount(a => a - 1);
  }

  function resetCount() {
    setCount(0);
  }

  const changeText = (event) => {
    const value = event.target.value;
    setText(value);
  }
  
  return (
    <div>
      <h1>React intro</h1>
      <p className="hint">Lesson 30 — components, JSX, and useState.</p>

      <div className="card">
        <button onClick={addCount}>+1</button>
        <button onClick={()=>setText("")}>reset</button>
        <button onClick={subCount}>-1</button>
        <p>{count}</p>
        <input type="text" value={text} onChange={changeText}></input>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default App;
