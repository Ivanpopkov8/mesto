const popupBtn = document.querySelector('.profile-info__button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = modalWindow.querySelector('.popup__close-icon');
const formBoxElement = document.querySelector('.popup__form');
const titleForInput = document.querySelector('.profile-info__title');
const subTitleForInput = document.querySelector('.profile-info__subtitle');
const nameInput = document.querySelector('.popup__filed-name_input_name');
const surNameInput = document.querySelector('.popup__filed-name_input_surname');
// const whiteHеartIcon = document.querySelectorAll('.element__vector');

function toggleModalWindow() {
modalWindow.classList.toggle('popup_is-active');
}

popupBtn.addEventListener('click', toggleModalWindow);

modalCloseBtn.addEventListener('click', toggleModalWindow);


function handleLikeButton() {
	nameInput.value = titleForInput.textContent;
	surNameInput.value = subTitleForInput.textContent;
	}

popupBtn.addEventListener('click', handleLikeButton);

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

// whiteHеartIcon.forEach(
// 	heartIcon =>  {heartIcon.addEventListener('click', function handleClick(){
// 		heartIcon.classList.toggle('element__vector_active');
		
// 	})

// 	}
// )




