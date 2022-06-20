//Кнопка редактировать профиль

// Первый попап
const popupBtnPen = document.querySelector('.profile-info__button');

const popupEditProfile = document.querySelector('.popup-edit-profile');

const popupProfileCloseBtn = popupEditProfile.querySelector('.popup__close-icon');

const titleForInput = document.querySelector('.profile-info__title');

const subTitleForInput = document.querySelector('.profile-info__subtitle');

const nameInput = document.querySelector('.popup__filed-name_input_name');

const surNameInput = document.querySelector('.popup__filed-name_input_surname');

const popupFormeProfile = document.querySelector('.popup__form-profile');

// Второй попап
const addButtonPlace = document.querySelector(".add-button");

const popupAddPlace = document.querySelector('.popup-add-place');

const popupPlaceCloseBtn = popupAddPlace.querySelector('.popup__close-icon');

const popupPlaceInput = document.querySelector('.popup__filed-name_input_place');

const popupLinkInput = document.querySelector('.popup__filed-name_input_link');

const popupFormePlace = document.querySelector('.popup__form-place');

// Третий попап
const popupShowImg = document.querySelector('.popup-show-img');

const imagePopupPic = popupShowImg.querySelector('.popup__image-pic');

const imagePopupTitle = document.querySelector('.popup__image-title');

const popupImgCloseBtn = popupShowImg.querySelector('.popup__close-icon');



// Работа с карточками
//Получаю ul
const elementsContainer = document.querySelector('.elements');
//Получаю шаблон по id
const elementsTempl = document.querySelector('#element-template').content;

// функция открыть попап
function openPopup(popupItem) {
	popupItem.classList.add('popup_is-active');

};

// Функция закрыть  попап
function clolsePopup(popupItem) {
	popupItem.classList.remove('popup_is-active');

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

	clolsePopup(popupEditProfile);

});

// Функция добовления введенного контента в инпут, на страницу

popupFormeProfile.addEventListener('submit', function (evt) {

	// Отключает действие браузера по умолчанию
	evt.preventDefault();

	// Встовляем написанный пользователем контент с формы 
	titleForInput.textContent = nameInput.value;
	subTitleForInput.textContent = surNameInput.value;

	clolsePopup(popupEditProfile);

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

// Функция создания карточки

function createCard(item) {

// Клонируем каждый ли ула в шаблон
	const cardElement = elementsTempl.querySelector('.element').cloneNode(true);

//Запиши в ли -.element__title то что у нас в item.name;
	cardElement.querySelector(".element__title").textContent = item.name;

	cardElement.querySelector(".element__image").src = item.link;

	cardElement.querySelector(".element__image").alt = item.name;

	// Доступ к сердечку по heart
	const heart = cardElement.querySelector('.element__vector');

	// Доступ к корзине по basketTrash
	const basketTrash = cardElement.querySelector('.element__basket');

	const cardImage = cardElement.querySelector('.element__image');

// Клик по сердцу - срабатывает функция addLike
	heart.addEventListener('click', function () {

		addLike(heart);

	});

	// Функция удаления карточки
	basketTrash.addEventListener('click', function () {

		deleteCard(cardElement);

	});

	// Срабатывает клик по картинки - открываем попап - добовляем контент
	cardImage.addEventListener('click', function() {

		openPopup(popupShowImg);

		popupShowImg.querySelector('.popup__image-title').textContent = item.name;

	  popupShowImg.querySelector('.popup__image-pic').src = cardImage.getAttribute('src');

		popupShowImg.querySelector(".popup__image-pic").alt = item.name;
	} )
 
	return cardElement
}

// Функция клика по like

function addLike(heartIcon) {
	heartIcon.classList.toggle('element__vector_active')
}

// Функция удаления карточек
function deleteCard(trashCard) {
	trashCard.remove();
}


// Метод обхода всех карточек

function printCard(card) {
	elementsContainer.prepend(card)
} 

function copyCard() {
	initialCards.forEach(function (item) {
		const cardItem = createCard(item)
		printCard(cardItem)
	});
}

copyCard();

// Функция крестик закрывает картинку
popupImgCloseBtn.addEventListener('click', function() {

		clolsePopup(popupShowImg);
	})

addButtonPlace.addEventListener('click', function () {

	openPopup(popupAddPlace);

});

popupPlaceCloseBtn.addEventListener('click', function () {

	clolsePopup(popupAddPlace);

});

popupFormePlace.addEventListener('submit', function (evt) {

	evt.preventDefault();

	newCardAdd = {

		name: popupPlaceInput.value,
		link: popupLinkInput.value

	}

	const cardItem = createCard(newCardAdd)

	printCard(cardItem)

	clolsePopup(popupAddPlace);

	  popupPlaceInput.value = 'Название'
		popupLinkInput.value = 'Ссылка на кртинку'

});

// Функция закрытия клик вне области попап 1
function onOverLayClick(event) {

	if (event.target === event.currentTarget) {

		clolsePopup(popupEditProfile);
		
	}

}
popupEditProfile.addEventListener('click', onOverLayClick);

// Функция закрытия клик вне области попап 2
function onOverLayAdd(event) {

	if (event.target === event.currentTarget) {

		clolsePopup(popupAddPlace);
		
	}

}
popupAddPlace.addEventListener('click', onOverLayAdd);

// Функция закрытия клик вне области попап 3
function onOverLayImage(event) {

	if (event.target === event.currentTarget) {

		clolsePopup(popupShowImg);
		
	}

}
popupShowImg.addEventListener('click', onOverLayImage);


