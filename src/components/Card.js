function Card(props) {

  function handleClick() {
    props.onCardClick(props.link)
  }

  return (
    <li onClick={handleClick} className="photo__card">
      <img className="photo__image" alt="" src={props.link} />
      <h2 className="photo__name">{props.name}</h2>
      <label className="photo__likes">
        <button type="button" className="photo__like-btn"></button>
        <span className="photo__like-value">{props.likes.length}</span>
      </label>
      <button type="button" className="photo__delete-btn"></button>
    </li>
  )
}

export default Card
