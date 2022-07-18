import { Card, popupShowImg } from './Card.js';

import { FormValidator } from './FormValidator.js';


// Первый попап
const popupBtnPen = document.querySelector('.profile-info__button');

const popupEditProfile = document.querySelector('.popup-edit-profile');

const popupProfileCloseBtn = popupEditProfile.querySelector('.popup__close-icon');

const titleForInput = document.querySelector('.profile-info__title');

const subTitleForInput = document.querySelector('.profile-info__subtitle');

const nameInput = document.querySelector('.popup__field-name_input_name');

const surNameInput = document.querySelector('.popup__field-name_input_surname');

const popupFormeProfile = document.querySelector('.popup__form-profile');

// Второй попап
const addButtonPlace = document.querySelector(".add-button");

const popupAddPlace = document.querySelector('.popup-add-place');

const popupPlaceCloseBtn = popupAddPlace.querySelector('.popup__close-icon');

const popupPlaceInput = document.querySelector('.popup__field-name_input_place');

const popupLinkInput = document.querySelector('.popup__field-name_input_link');

const popupFormePlace = document.querySelector('.popup__form-place');

const popUpsubmitButton = popupAddPlace.querySelector('.popup__submit-button')


// Третий попап
const popupImgCloseBtn = popupShowImg.querySelector('.popup__close-icon');

const cardList = document.querySelector('.elements')


//

const config = {

	formElement: '.popup__form',

	inputElement: '.popup__field-name',

	popupSubmitButton: '.popup__submit-button',

	inactiveButtonClass: 'popup__submit-button_inactive',

	inputErrorClass: 'popup__field-name_type_error',

	errorClassActive: 'form__input-error_active',


}


function closeByEscape(evt) {

	if (evt.key === 'Escape') {

		const openedPopup = document.querySelector('.popup_is-active')

		closePopup(openedPopup)

	}

};


// функция открыть попап
function openPopup(popupItem) {
	popupItem.classList.add('popup_is-active');

	document.addEventListener('keyup', closeByEscape);

};



// Функция закрыть  попап
function closePopup(popupItem) {
	popupItem.classList.remove('popup_is-active');

	document.removeEventListener('keyup', closeByEscape);

};


//Клик по кнопке popupBtnPen
popupBtnPen.addEventListener('click', function () {

	// Показываем попап,
	openPopup(popupEditProfile);

	// Заполняем данные с хтмл
	nameInput.value = titleForInput.textContent;
	surNameInput.value = subTitleForInput.textContent;

});

// Закрываем попап по клику на popupProfileCloseBtn
popupProfileCloseBtn.addEventListener('click', function () {

	closePopup(popupEditProfile);

});

// Функция добовления введенного контента в инпут, на страницу

popupFormeProfile.addEventListener('submit', function (evt) {

	// Отключает действие браузера по умолчанию
	evt.preventDefault();

	// Встовляем написанный пользователем контент с формы 
	titleForInput.textContent = nameInput.value;
	subTitleForInput.textContent = surNameInput.value;

	closePopup(popupEditProfile);

});

// Работа 6го спринта
const initialCards = [

	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},

	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},

	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},

	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},

	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},

	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}

];


// Первая отрисовка карт


function createCard(item) {
	const card = new Card(item, '#element-template', openPopup);
  const cardElement = card.generateCard();

return cardElement
}


function renderInitialCards() {
	initialCards.forEach((item) => {

  const cardElement = createCard(item)
		

		// Добавляем в DOM
		cardList.append(cardElement);
	});
}

renderInitialCards();



// Функция крестик закрывает картинку
// popupImgCloseBtn.addEventListener('click', function () {

// 	closePopup(popupShowImg);
// })

addButtonPlace.addEventListener('click', function () {

	openPopup(popupAddPlace);

});

popupPlaceCloseBtn.addEventListener('click', function () {

	closePopup(popupAddPlace);

});

popupImgCloseBtn.addEventListener('click', () => {
	closePopup(popupShowImg);
});

popupFormePlace.addEventListener('submit', function (evt) {

	evt.preventDefault();

	const newCardAdd = {

		name: popupPlaceInput.value,

		link: popupLinkInput.value

	}

	const cardElement = createCard(newCardAdd);


	// Добавляем в DOM
	cardList.prepend(cardElement);

	


	// popUpsubmitButton.classList.add(config.inactiveButtonClass);

	// popUpsubmitButton.setAttribute("disabled", true);

	// popupPlaceInput.value = ''

	// popupLinkInput.value = ''
	const inputList = Array.from(popupAddPlace.querySelectorAll(config.inputElement));



	const formValidatePlace = new FormValidator(config, popupAddPlace);

	formValidatePlace._clearInpytsOnsubmit(inputList);

  formValidatePlace._toggleButtonState(inputList, popUpsubmitButton);

	closePopup(popupAddPlace);


});


function handleOverlayClick(event) {
	if (event.target === event.currentTarget) {
		closePopup(event.currentTarget);
	}
}


popupEditProfile.addEventListener('click', handleOverlayClick);


popupAddPlace.addEventListener('click', handleOverlayClick);


popupShowImg.addEventListener('click', handleOverlayClick);




const formValidateProfile = new FormValidator(config, popupEditProfile);

formValidateProfile.enableValidation();

const formValidatePlace = new FormValidator(config, popupAddPlace);

formValidatePlace.enableValidation();

