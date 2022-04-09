const popupBtn = document.querySelector('.profile-info__button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close-icon');
let formBoxElement = document.querySelector('.popup__form');
let titleForInput = document.querySelector('.profile-info__title');
let subTitleForInput = document.querySelector('.profile-info__subtitle');
let nameInput = document.querySelector('.popup__filed-name');
let surNameInput = document.querySelector('.popup__filed-surname');
let elementContent = document.querySelectorAll('.element__content')
const whiteHеartIcon = document.querySelectorAll('.element__vector');

function toggleModalWindow() {
modalWindow.classList.toggle('popup_is-active');
}

popupBtn.addEventListener('click', toggleModalWindow);

modalCloseBtn.addEventListener('click', toggleModalWindow);



function titleModalWindow() {
	nameInput.value = titleForInput.textContent;
	surNameInput.value = subTitleForInput.textContent;
	}

popupBtn.addEventListener('click', titleModalWindow);

function onOverLayClick(event) {
	if (event.target === event.currentTarget){
		toggleModalWindow();
	}
}
modalWindow.addEventListener('click', onOverLayClick);

function onSubmit(evt) {
	evt.preventDefault();
	titleForInput.textContent = nameInput.value;
	subTitleForInput.textContent = surNameInput.value;
	toggleModalWindow();
}
formBoxElement.addEventListener('submit', onSubmit);

whiteHеartIcon.forEach(
	heartIcon =>  {heartIcon.addEventListener('click', function handleClick(){
		heartIcon.classList.toggle('element__vector-hover');
		
	})

	}
)




