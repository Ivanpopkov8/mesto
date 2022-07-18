
// Третий попап
export const popupShowImg = document.querySelector('.popup-show-img');

const imagePopupPic = popupShowImg.querySelector('.popup__image-pic');

const imagePopupTitle = popupShowImg.querySelector('.popup__image-title');





export class Card {
	constructor(data, cardSelector, openForm) {

		// Тянетс с индекса.жс с объекта 
		this._name = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
    this._openForm = openForm;
	}

// Копирует весь хтмл одной карточки и возвращает
	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content
			.querySelector('.element')
			.cloneNode(true);

		return cardElement;
	}

 // Заполняет данные карточки
 
	generateCard() {
		this._element = this._getTemplate();

		this._cardImage = this._element.querySelector('.element__image')
		this._likeButton = this._element.querySelector('.element__vector')
		this._treshBasket = this._element.querySelector('.element__basket')
    

		this._setEventListeners(); // вызовите _setEventListeners

		this._element.querySelector('.element__title').textContent = this._name;
		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;

		return this._element;
	}

	// Открывает попап и тянет урл т тайтл картинки

	_handleOpenPopup() {
		imagePopupPic.src = this._link;

		this._openForm(popupShowImg);
		
		imagePopupTitle.textContent = this._name;
	}

	// // Закрывает и отчищвет попап 
	// _handleClosePopup() {
	// 	imagePopupPic.src = '';
	// 	popupShowImg.classList.remove('popup_is-active');
	// 	imagePopupTitle.textContent = '';
	// }

	_handleHeartActive() {

		this._likeButton.classList.toggle('element__vector_active');
	}

	_handleCardDelete() {
		this._element.remove()
	}

	_setEventListeners() {

		this._cardImage.addEventListener('click', () => {
			this._handleOpenPopup()
		});

		this._likeButton.addEventListener('click', () => {
			this._handleHeartActive()
		});

		this._treshBasket.addEventListener('click', () => {
			this._handleCardDelete()
		});

	}

}
