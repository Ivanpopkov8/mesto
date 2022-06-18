//Кнопка редактировать профиль


const popupBtn = document.querySelector('.profile-info__button');

const modalWindow = document.querySelector('.popup');

const modalCloseBtn = modalWindow.querySelector('.popup__close-icon');

const formBoxElement = document.querySelector('.popup__form');

const titleForInput = document.querySelector('.profile-info__title');

const subTitleForInput = document.querySelector('.profile-info__subtitle');

const nameInput = document.querySelector('.popup__filed-name_input_name');

const surNameInput = document.querySelector('.popup__filed-name_input_surname');

const popupImage = document.querySelector('.image-popup');


// Функция видимости попап
function toggleModalWindow(popupItem) {
	popupItem.classList.toggle('popup_is-active');

}

//Клик по кнопке popupBtn
popupBtn.addEventListener('click', function () {
	// Показываем попап,
	toggleModalWindow(modalWindow);
	// Заполняем данные с хтмл
	nameInput.value = titleForInput.textContent;
	surNameInput.value = subTitleForInput.textContent;
})

// Закрываем попап по клику на modalCloseBtn
modalCloseBtn.addEventListener('click', function () {

	toggleModalWindow(modalWindow);

})

// Функция добовления введенного контента в инпут, на страницу

formBoxElement.addEventListener('submit', function (evt) {

	// Отключает действие браузера по умолчанию
	evt.preventDefault();

	// Встовляем контент с формы
	titleForInput.textContent = nameInput.value;
	subTitleForInput.textContent = surNameInput.value;

	toggleModalWindow(modalWindow);

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

//Получаю ul
const elementsContainer = document.querySelector('.elements');
//Получаю шаблон по id
const elementsTempl = document.querySelector('#element-template').content;

// Метод обхода всех карточек
function copyCard() {
	initialCards.forEach(addCard);
}

// Функция клика по like
const cardItem = document.querySelectorAll('.element');
function addLike(heartIcon) {
	heartIcon.classList.toggle('element__vector_active')
}

// Фуекция удаления карточек
function deleteCard(trashCard) {
	trashCard.remove();
}

// Функция добавления карточек
function addCard(item) {

// КЛонирует все карточки контейнера
	const liContainer = elementsTempl.querySelector('.element').cloneNode(true);

// Заполняем данные из массива - по ключь- значению
	liContainer.querySelector(".element__title").textContent = item.name;

	liContainer.querySelector(".element__image").src = item.link;

// Вставляем в начало
	elementsContainer.prepend(liContainer);


// Доступ к сердечку по heart
	const heart = liContainer.querySelector('.element__vector');

	// Доступ к корзине по basketTrash
	const basketTrash = liContainer.querySelector('.element__basket');

// Клик по сердцу - срабатывает функция addLike
	heart.addEventListener('click', function () {

		addLike(heart);

	});

	// Функция удаления карточки
	basketTrash.addEventListener('click', function () {

		deleteCard(liContainer);

	});

	// cardImage - для того чтобы открывать попап с картинкой
	const cardImage = liContainer.querySelector('.element__image');

// Вставляем картинку в сам попап
	const popupImage = document.querySelector('.image-popup');

	// Срабатывает клик по картинки - открываем попап - добовляем контент
	cardImage.addEventListener('click', function() {

		toggleModalWindow(popupImage);

		popupImage.querySelector('.image-popup__image-title').textContent = item.name;

	  popupImage.querySelector('.image-popup__pic').src = cardImage.getAttribute('src');
	} )

};
copyCard();

// Функция крестик закрывает картинку
const imgCloseBtn = popupImage.querySelector('.image-popup__close-icon')

	imgCloseBtn.addEventListener('click', function() {

		toggleModalWindow(popupImage);
	})


// Работа над добовление 2го попапа

const modalWindowPlace = document.querySelector('.form');

const formCloseBtn = modalWindowPlace.querySelector('.form__close-icon');

const formBox = document.querySelector('.form__popup');

const placeInput = document.querySelector('.form__filed-name_input_place');

const placeLimkInput = document.querySelector('.form__filed-name_input_link');

const addButtonPlace = document.querySelector(".add-button");


addButtonPlace.addEventListener('click', function () {

	toggleModalWindow(modalWindowPlace);

});

formCloseBtn.addEventListener('click', function () {

	toggleModalWindow(modalWindowPlace);

});

modalWindowPlace.addEventListener('submit', function (evt) {

	evt.preventDefault();

	newCardAdd = {

		name: placeInput.value,
		link: placeLimkInput.value

	}

	addCard(newCardAdd);

	toggleModalWindow(modalWindowPlace);

});

// Функция закрытия клик вне области попап 1
function onOverLayClick(event) {

	if (event.target === event.currentTarget) {

		toggleModalWindow(modalWindow);
		
	}

}
modalWindow.addEventListener('click', onOverLayClick);

// Функция закрытия клик вне области попап 2
function onOverLayAdd(event) {

	if (event.target === event.currentTarget) {

		toggleModalWindow(modalWindowPlace);
		
	}

}
modalWindowPlace.addEventListener('click', onOverLayAdd);

// Функция закрытия клик вне области попап 3
function onOverLayImage(event) {

	if (event.target === event.currentTarget) {

		toggleModalWindow(popupImage);
		
	}

}
popupImage.addEventListener('click', onOverLayImage);


