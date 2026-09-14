
export default function NoteItem(props) {
    if (props.isBeingEdited){
        return (<li>
            <p>{"this is being edited"}</p>
            <p className="hint">{props.description}</p>
            <button onClick={props.onDelete}>DELETE</button>
            <button onClick={props.onEdit}>EDIT</button>
            <input type="text" value={props.editTitle} onChange={props.onChangeTitle}></input>
        </li>); 
    } else {
    return (<li>
            <p>{props.title}</p>
            <p className="hint">{props.description}</p>
            <button onClick={props.onDelete}>DELETE</button>
            <button onClick={props.onEdit}>EDIT</button>
        </li>);
}}
  


