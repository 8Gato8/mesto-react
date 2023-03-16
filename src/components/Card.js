import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

	const currentUser = React.useContext(CurrentUserContext);

	const isOwn = currentUser._id === card.owner._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id);

	const cardLikeButtonClassName = (
		`card__like-button ${isLiked && 'card__like-button_active'}`
	);

	function handleClick() {

		onCardClick(card);
	}

	function handleLikeClick() {

		onCardLike(card);
	}

	function handleDeleteClick() {

		onCardDelete(card);
	}

	return (

		<li className="cards__card card">

			<div className="card__img-mask">

				<img className="card__img" src={card.link} alt={card.name} onClick={handleClick} />
			</div>

			<h2 className="card__title title">{card.name}</h2>

			<div className="card__like-container">

				<button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}>
				</button>

				<p className="card__like-counter">{card.likes.length}</p>
			</div>

			{isOwn && <button className="card__trash-button" onClick={handleDeleteClick} />}
		</li>
	)
}

export default Card;