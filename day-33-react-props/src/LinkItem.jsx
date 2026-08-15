// Lesson 33 — LinkItem component
// A component is just a function. Props are its parameters.
// See LESSON.md.

export default function LinkItem(props) {
  return (<li className="item">
    <a href={props.url} target="_blank" rel="noopener">{props.title}</a>
    <button
      type="button"
      className="btn-delete"
      onClick={props.onDelete}>
      delete
    </button>
    </li>);
}
