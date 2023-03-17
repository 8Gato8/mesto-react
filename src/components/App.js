import React from 'react';
import '../index.css';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { checkIfCardIsLiked } from '../utils/constants';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' });

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    api.getBackendUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [])

  React.useEffect(() => {

    api.getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  function handleEditAvatarClick() {

    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {

    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {

    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {

    setSelectedCard(card);
  }


  function handleCardLike(card) {

    ((checkIfCardIsLiked(card, currentUser) === true) ? api.deleteLike(card._id) : api.likeCard(card._id))
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => c._id === card._id ? newCard : c)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {

    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((c) => c._id !== card._id)
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function closeAllPopups() {

    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);

    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {

    api.editUserInfo(name, about)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateAvatar({ avatar }) {

    api.updateAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
      })
      .finally(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {

    api.postNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .finally(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <div className="page__container">
          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

          <Footer />

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <PopupWithForm isOpen={''} onClose={closeAllPopups} title="Вы уверены?" name="confirmation" buttonText="Да" />

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        </div>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
