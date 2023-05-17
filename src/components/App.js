import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import AddPlacePopup from './AddPlacePopup.js';
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
    console.log(id);
    api.removeCard(id)
      .then(() => {
        setCards(state => state.filter((c) => c._id !== id));
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

  function handleAddPlaceSubmit(card) {
    api.uploadCard(card)
      .then((newCard) => {
        setCards([newCard,...cards]);
        setAddPopup(false);
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
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

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
