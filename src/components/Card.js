function Card({ card, onCardClick }) {

	function handleClick() {

		onCardClick(card);
	}

	return (

		<li className="cards__card card">

			<div className="card__img-mask">

				<img className="card__img" src={card.link} alt={card.name} onClick={handleClick} />
			</div>

			<h2 className="card__title title">{card.name}</h2>

			<div className="card__like-container">

				<button className="card__like-button" type="button">
				</button>

				<p className="card__like-counter">{card.likes.length}</p>
			</div>

		</li>
	)
}

export default Card;