import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import defaultAvatar from '../images/photo/default_ava.png'

function App() {

  function handleEditAvatarClick() {
    setAvatarPopup(true);
  }
  function handleEditProfileClick() {
    setProfilePopup(true);
  }
  function handleAddPlaceClick() {
    setAddPopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card, isLiked) {
    api.toggleLike(isLiked, card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
  }

  function handleCardDelete(id) {
    api.removeCard(id)
      .then((newCard) => {
        setCards(state => state.filter((c) => c._id !== newCard._id));
      });
  }

  function handleUpdateUser(user) {
    api.setUserData(user)
      .then((newUser) => {
        setCurrentUser(newUser);
        setProfilePopup(false);
      });
  }

  function handleUpdateAvatar(link) {
    api.setUserAvatar(link)
    .then((newUser) => {
      setCurrentUser(newUser);
      setAvatarPopup(false);
    });
  }

  function closeAllPopups() {
    setAvatarPopup(false);
    setProfilePopup(false);
    setAddPopup(false);
    setSelectedCard({});
  }



  const [isEditProfilePopupOpen, setProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPopup] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState(
    {
      name: "Имя",
      about: "Деятельность",
      avatar: { defaultAvatar }
    });
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([{ name, about, avatar, _id }, cardList]) => {
        setCurrentUser({ name, about, avatar, _id })
        setCards(cardList)
      }
      )
      .catch((err) => console.log('Ошибка:', err))
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        cards={cards}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />

      <Footer />

      <PopupWithForm
        name='add'
        title='Новое место'
        isOpen={isAddPlacePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
      >
        <><fieldset className="popup__input-field">
          <input type="text" name="name" id="input-placename" placeholder="Название"
            className="popup__input popup__input_type_place" required minLength="2" maxLength="30" />
          <span className="popup__error" id="input-placename-error"></span>
          <input type="url" name="link" id="input-placelink" placeholder="Ссылка"
            className="popup__input popup__input_type_link" required />
          <span className="popup__error" id="input-placelink-error"></span>
        </fieldset><button name="saveBtn" type="submit" className="popup__save">Создать</button>
        </>
      </PopupWithForm>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        card={selectedCard}

        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
