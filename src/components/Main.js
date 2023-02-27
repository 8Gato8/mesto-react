import React from 'react';
import api from '../utils/Api';
import Card from './Card';


function Main({

	onEditAvatar,
	onEditProfile,
	onAddPlace,
	onCardClick,
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

		</main>
	)
}


export default Main;