
// Третий попап
const popupShowImg = document.querySelector('.popup-show-img');

const imagePopupPic = popupShowImg.querySelector('.popup__image-pic');

const imagePopupTitle = popupShowImg.querySelector('.popup__image-title');

const popupImgCloseBtn = popupShowImg.querySelector('.popup__close-icon');



export class Card {
	constructor(data, cardSelector) {

		// Тянетс с индекса.жс с объекта 
		this._name = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
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
		this._setEventListeners(); // вызовите _setEventListeners

		this._element.querySelector('.element__title').textContent = this._name;
		this._element.querySelector('.element__image').src = this._link;
		this._element.querySelector('.element__image').alt = this._name;

		return this._element;
	}

	// Открывает попап и тянет урл т тайтл картинки

	_handleOpenPopup() {
		imagePopupPic.src = this._link;
		popupShowImg.classList.add('popup_is-active');
		imagePopupTitle.textContent = this._name;
	}

	// Закрывает и отчищвет попап 
	_handleClosePopup() {
		imagePopupPic.src = '';
		popupShowImg.classList.remove('popup_is-active');
		imagePopupTitle.textContent = '';
	}

	_handleHeartActive() {

		this._element.querySelector('.element__vector').classList.toggle('element__vector_active');
	}

	_handleCardDelete() {
		this._element.remove()
	}

	_setEventListeners() {

		this._element.querySelector('.element__image').addEventListener('click', () => {
			this._handleOpenPopup()
		});

		popupImgCloseBtn.addEventListener('click', () => {
			this._handleClosePopup()
		});

		this._element.querySelector('.element__vector').addEventListener('click', () => {
			this._handleHeartActive()
		});

		this._element.querySelector('.element__basket').addEventListener('click', () => {
			this._handleCardDelete()
		});

	}

}
