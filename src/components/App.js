import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

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

          onEditAvatar={handleEditAvatarClick} isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          onEditProfile={handleEditProfileClick} isEditProfilePopupOpen={isEditProfilePopupOpen}
          onAddPlace={handleAddPlaceClick} isAddPlacePopupOpen={isAddPlacePopupOpen}
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />

        <Footer />

      </div>
    </div>
  );
}

export default App;
