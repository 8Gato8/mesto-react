import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
	isOpen: isEditAvatarPopupOpen,
	onClose: closeAllPopups,
	onUpdateAvatar
}) {

	const inputRef = React.createRef();

	function handleSubmit(e) {

		e.preventDefault();

		onUpdateAvatar({
			avatar: inputRef.current.value,
		});

	}

	React.useEffect(() => {

		inputRef.current.value = '';
	}, [isEditAvatarPopupOpen, inputRef]);

	return (

		<PopupWithForm
			isOpen={isEditAvatarPopupOpen}
			onClose={closeAllPopups}
			onSubmit={handleSubmit}
			title="Обновить аватар"
			name="update-avatar"
			buttonText="Сохранить"
		>

			<fieldset className="form__fieldset">

				<label className="form__field">

					<input
						id="input-avatar-link"
						className="form__input"
						ref={inputRef}
						placeholder="Ссылка на новый аватар"
						type="url"
						name="avatar"
						required />
					<span className="input-avatar-link-error form__input-error"></span>

				</label>

			</fieldset>

		</PopupWithForm>
	)
}

export default EditAvatarPopup;