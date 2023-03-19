import React from "react";
import PopupWithForm from "./PopupWithForm";
import { SelectedCardContext } from "../contexts/SelectedCardContext";

function ConfirmationPopup({
	isOpen: isConfirmationPopupOpen,
	onClose: closeAllPopups,
	onDeleteConfirmation
}) {

	const selectedCard = React.useContext(SelectedCardContext);

	function handleSubmit(e) {

		e.preventDefault();

		onDeleteConfirmation(selectedCard);
	}

	return (

		<PopupWithForm
			isOpen={isConfirmationPopupOpen}
			onClose={closeAllPopups}
			onSubmit={handleSubmit}
			title="Вы уверены?"
			name="confirmation"
			buttonText="Да"
		/>
	)
}

export default ConfirmationPopup;