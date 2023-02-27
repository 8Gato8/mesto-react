import React from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import Card from './Card';


function Main({

	onEditAvatar,
	isEditAvatarPopupOpen,
	onEditProfile,
	isEditProfilePopupOpen,
	onAddPlace,
	isAddPlacePopupOpen,
	onCardClick,
	selectedCard,
	onClose
}) {

	const [userName, setUserName] = React.useState(null);
	const [userDescription, setUserDescription] = React.useState(null);
	const [userAvatar, setUserAvatar] = React.useState(null);
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {

		Promise.all([api.getBackendUserInfo(), api.getInitialCards()])

			.then((data) => {

				const user = data[0];
				setCards(data[1]);

				setUserName(user.name);
				setUserDescription(user.about);
				setUserAvatar(user.avatar);

			})
			.catch((err) => {
				console.log(err);
			});
	}, [])

	return (

		<main className="content page__content">

			<section className="profile page__profile">

				<div className="profile__avatar-container">
					<div onClick={onEditAvatar} className="profile__avatar-mask"></div>
					<img className="profile__avatar" src={userAvatar} alt="Аватар профиля" />
				</div>

				<div className="profile__info">
					<h1 className="profile__name">{userName}</h1>
					<p className="profile__job">{userDescription}</p>
					<button onClick={onEditProfile} className="profile__edit-button" type="button">
					</button>
				</div>

				<button onClick={onAddPlace} className="profile__add-button" type="button">
				</button>

			</section>

			<section className="cards page__cards">

				<ul className="cards__list">

					{cards.map((card) => (

						<Card card={card} key={card._id} onCardClick={onCardClick} />
					))}
				</ul>

			</section>

			<PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={onClose} title="Редактировать профиль" name="profile" buttonText="Сохранить" children={

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
			} />

			<PopupWithForm isOpen={isEditProfilePopupOpen} onClose={onClose} title="Новое место" name="add-place" buttonText="Создать" children={

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
			} />

			<PopupWithForm isOpen={isAddPlacePopupOpen} onClose={onClose} title="Обновить аватар" name="update-avatar" buttonText="Сохранить" children={

				<fieldset className="form__fieldset">

					<label className="form__field">

						<input id="input-avatar-link" className="form__input" placeholder="Ссылка на новый аватар" type="url" name="avatar" required />
						<span className="input-avatar-link-error form__input-error"></span>
					</label>

				</fieldset>
			} />

			<PopupWithForm isOpen={''} title="Вы уверены?" name="confirmation" buttonText="Да" children={''} />

			<ImagePopup onClose={onClose} card={selectedCard} />

		</main>
	)
}


export default Main;