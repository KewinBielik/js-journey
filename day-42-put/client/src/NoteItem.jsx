
export default function NoteItem(props) {
    if (props.isBeingEdited){
        return (
        <li>
            <input type="text" value={props.editTitle} onChange={props.onChangeTitle} placeholder={`prev title: ${props.title}`}></input>
            <input type="text" value={props.editDesc} onChange={props.onChangeDesc} placeholder={`prev description: ${props.description}`}></input>
            <button onClick={props.cancel}>CANCEL</button>
            <button onClick={props.save}>SAVE</button>
        </li>); 
    } else {
    return (<li>
            <p>{props.title}</p>
            <p className="hint">{props.description}</p>
            <button onClick={props.onDelete}>DELETE</button>
            <button onClick={props.onEdit}>EDIT</button>
        </li>);
}}
  


