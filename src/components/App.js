import React, { useState } from 'react';
import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';


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

  return (
    <>
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
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

      <PopupWithForm
        name='edit'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
      >
        <>
          <fieldset className="popup__input-field">
            <input type="text" name="name" id="input-username" placeholder="Имя пользователя"
              className="popup__input popup__input_type_name" required minLength="2" maxLength="40" />
            <span className="popup__error" id="input-username-error"></span>
            <input type="text" name="about" id="input-useractivity" placeholder="Виды деятельности"
              className="popup__input popup__input_type_activity" required minLength="2" maxLength="200" />
            <span className="popup__error" id="input-useractivity-error"></span>
          </fieldset>
          <button name="saveBtn" type="submit" className="popup__save">Сохранить</button>
        </>
      </PopupWithForm>

      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen ? "popup_opened" : ""}
        onClose={closeAllPopups}
      >
        <>
          <input type="url" name="link" id="input-avatarlink" placeholder="Ссылка"
            className="popup__input popup__input_type_link" required />
          <span className="popup__error" id="input-avatarlink-error"></span>
          <button name="saveBtn" type="submit" className="popup__save">Сохранить</button>
        </>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}

        onClose={closeAllPopups}
      />
    </>
  );
}

export default App;
