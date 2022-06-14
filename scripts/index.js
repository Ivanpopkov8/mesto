//Кнопка редактировать профиль


const popupBtn = document.querySelector('.profile-info__button');

const modalWindow = document.querySelector('.popup');

const modalCloseBtn = modalWindow.querySelector('.popup__close-icon');

const formBoxElement = document.querySelector('.popup__form');

const titleForInput = document.querySelector('.profile-info__title');
const subTitleForInput = document.querySelector('.profile-info__subtitle');

const nameInput = document.querySelector('.popup__filed-name_input_name');

const surNameInput = document.querySelector('.popup__filed-name_input_surname');




function toggleModalWindow() {
modalWindow.classList.toggle('popup_is-active');
}

popupBtn.addEventListener('click', toggleModalWindow);

modalCloseBtn.addEventListener('click', toggleModalWindow);


function addInputContent() {
	nameInput.value = titleForInput.textContent;
	surNameInput.value = subTitleForInput.textContent;
	}

popupBtn.addEventListener('click', addInputContent);

function onOverLayClick(event) {
	if (event.target === event.currentTarget){
		toggleModalWindow();
	}
}
modalWindow.addEventListener('click', onOverLayClick);

// Функция добовления введенного контента в инпут, на страницу
function onSubmit(evt) {
	evt.preventDefault();
	titleForInput.textContent = nameInput.value;
	subTitleForInput.textContent = surNameInput.value;
	toggleModalWindow();
}
formBoxElement.addEventListener('submit', onSubmit);

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
//Получаю доступ к элементам шаблона
// const liContainer = elementsTempl.querySelector('element').cloneNode(true);

// Функция добовления нового массива
const placeContent = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});


// Метод обхода всех карточек
function copyCard() {
  placeContent.forEach(addCard);
}

// Функция клонирования
function addCard(item) {
	console.log(item);
	// console.log(link);
	const liContainer = elementsTempl.querySelector('.element').cloneNode(true);
	liContainer.querySelector(".element__title").textContent = item.name;
	liContainer.querySelector(".element__image").src = item.link;

  elementsContainer.prepend(liContainer);
}


copyCard();

// Функция клика по like
const whiteHеartIcon = document.querySelectorAll('.element__vector');

whiteHеartIcon.forEach(
	heartIcon =>  {heartIcon.addEventListener('click', function handleClick(){
		heartIcon.classList.toggle('element__vector_active');
		
	})

	}
)

// Работа над добовление 2го попапа


const formBox = document.querySelector('.form__popup');

const placeInput = document.querySelector('.form__filed-name_input_place');

const placeLimkInput = document.querySelector('.form__filed-name_input_link');



// Функция открытия попап
const modalWindowPlace = document.querySelector('.form');

const addButtonPlace = document.querySelector(".add-button");

function toggleModalWindow() {
	modalWindowPlace.classList.toggle('form_is-active');
	}
	addButtonPlace.addEventListener('click', toggleModalWindow);

// Функция закрытия попап крестик
	const formCloseBtn = modalWindowPlace.querySelector('.form__close-icon');
	formCloseBtn.addEventListener('click', toggleModalWindow);

	// Функция закрытия попап на любое место экрана

	function onOverClick(event) {
		if (event.target === event.currentTarget){
			toggleModalWindowPlace();
		}
	}
	modalWindowPlace.addEventListener('click', onOverClick);
