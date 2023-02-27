import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick() {

    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {

    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {

    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {

    setSelectedCard(card);
  }

  function closeAllPopups() {

    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);

    setSelectedCard(null);
  }

  return (

    <div className="page">

      <div className="page__container">

        <Header />

        <Main

          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Редактировать профиль" name="profile" buttonText="Сохранить">

          <fieldset className="form__fieldset">

            <label className="form__field">

              <input id="input-name" className="form__input" placeholder="Имя" type="text" name="name" required minLength="2" maxLength="40" />
              <span className="input-name-error form__input-error"></span>
            </label>

            <label className="form__field">

              <input id="input-job" className="form__input" placeholder="О себе" type="text" name="job" required minLength="2" maxLength="200" />
              <span className="input-job-error form__input-error"></span>
            </label>

          </fieldset>
        </PopupWithForm>

        <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Новое место" name="add-place" buttonText="Создать">

          <fieldset className="form__fieldset">

            <label className="form__field">

              <input id="input-place-name" className="form__input" placeholder="Название" type="text" name="name" required minLength="2" maxLength="30" />
              <span className="input-place-name-error form__input-error"></span>
            </label>

            <label className="form__field">

              <input id="input-place-link" className="form__input" placeholder="Ссылка на картинку" type="url" name="link" required />
              <span className="input-place-link-error form__input-error"></span>
            </label>

          </fieldset>
        </PopupWithForm>

        <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Обновить аватар" name="update-avatar" buttonText="Сохранить">

          <fieldset className="form__fieldset">

            <label className="form__field">

              <input id="input-avatar-link" className="form__input" placeholder="Ссылка на новый аватар" type="url" name="avatar" required />
              <span className="input-avatar-link-error form__input-error"></span>
            </label>

          </fieldset>
        </PopupWithForm>

        <PopupWithForm isOpen={''} onClose={closeAllPopups} title="Вы уверены?" name="confirmation" buttonText="Да" />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      </div>
    </div>
  );
}

export default App;
