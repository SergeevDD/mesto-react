
import editAvatar from '../images/logo/edit_btn.svg'
import Card from '../components/Card.js'
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useEffect, useState, useContext } from 'react';

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick }) {
  const { name, about, avatar } = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
      .then((cardList) => {
        setCards(cardList)
      }
      )
      .catch((err) => console.log('Ошибка:', err))
  }, []);

  return (
    <main>
      <section className="profile">
        <div className="avatar" onClick={onEditAvatar}>
          <img src={avatar} alt="аватар" className="avatar__image" />
          <img src={editAvatar} alt="изменить фото" className="avatar__edit" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button onClick={onEditProfile} className="profile__edit-btn" type="button"></button>
          <p className="profile__activity">{about}</p>
        </div>
        <button onClick={onAddPlace} className="profile__add-btn" type="button"></button>
      </section>
      <section className="photo" aria-label="photo">
        <ul className="photo__list">
          {cards.map((card) =>
          (<Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
          />)
          )}
        </ul>
      </section>
    </main >
  );
}

export default Main;
