import defaultAvatar from '../images/photo/default_ava.png'
import editAvatar from '../images/logo/edit_btn.svg'
import Card from '../components/Card.js'
import { api } from '../utils/Api.js'
import React from 'react';

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick }) {
  const [avatar, setAvatar] = React.useState(defaultAvatar);
  const [name, setName] = React.useState('Имя');
  const [about, setAbout] = React.useState('Деятельность');
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([{ name, about, avatar }, cardList]) => {
        setAvatar(avatar)
        setName(name)
        setAbout(about)
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
