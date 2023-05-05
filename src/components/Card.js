function Card({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="photo__card">
      <img onClick={handleClick} className="photo__image" alt={card.name} src={card.link} />
      <h2 className="photo__name">{card.name}</h2>
      <label className="photo__likes">
        <button type="button" className="photo__like-btn"></button>
        <span className="photo__like-value">{card.likes.length}</span>
      </label>
      <button type="button" className="photo__delete-btn"></button>
    </li>
  )
}

export default Card
