// Lesson 36 — one repo row. Props only — no fetch, no localStorage here.

export default function RepoItem (props){
  return (
    <li  className="item">
    <a href={props.url} target="_blank" rel="noopener" className="name">{props.name}</a>
    <p className="desc">{props.description ? props.description : "No description"}</p>
    <button className={props.isFav ? "btn-fav is-fav" : "btn-fav"} onClick={props.favButton}> {"⭐"}</button>
    </li>
    );
}

