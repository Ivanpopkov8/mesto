

const config = {

	formElement: '.popup__form',

	inputElement: '.popup__field-name',

	popupSubmitButton: '.popup__submit-button',

	inactiveButtonClass: 'popup__submit-button_inactive',

	inputErrorClass: 'popup__field-name_type_error',

	errorClassActive: 'form__input-error_active',


}


// 1. Получаем данные о валидации в js


// Функция, которая добовляет класс с ошибкой

const showInputError = (formElement, inputElement, errorMessage) => {

	 // Выбираем элемент ошибки внутри функции
	//на основе уникального класса из инпута по id уникальным классом из span:

	console.log(formElement);

const formError = formElement.querySelector(`.${inputElement.id}-error`);

// Показываем красный бордер-ботом
	 inputElement.classList.add(config.inputErrorClass);

// Заменим содержимое span с ошибкой на переданный параметр
	 formError.textContent = errorMessage;

// Показываем сообщение об ошибке
	formError.classList.add(config.errorClassActive);
};

// Функция, которая удаляет класс с ошибкой

const hideInputError = (formElement, inputElement) => {

	  // Удаляем элемент ошибки внутри функции
	 //на основе уникального класса из инпута по id уникальным классом из span:
	// Находим элемент ошибки

	console.log(formElement)

const formError = formElement.querySelector(`.${inputElement.id}-error`);

	 // Удаляем красный бордер-ботом
	 inputElement.classList.remove(config.inputErrorClass);

	// Удаляет сообщение об ошибке validationMessage
	formError.classList.remove(config.errorClassActive);

	// Очистим ошибку
  formError.textContent = '';

};

  // Функция которая проверяет валидность поля
 // Функция isValid принимает formElement и inputElement,
// а не берёт их из внешней области видимости

console.log(config);

const isValid = (formElement, inputElement) => {

	//Функция isValid принимает сразу два параметра:
 //formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
//inputElement — проверяемое поле ввода.

	// Если поле не проходит валидацию, покажем ошибку
	if(!inputElement.validity.valid) {

	 // Передадим сообщение об ошибке
	// showInputError получает параметром форму, в которой
 // находится проверяемое поле, и само это поле
		showInputError(formElement, inputElement, inputElement.validationMessage);

	 // Если проходит, скроем
	// hideInputError получает параметром форму, в которой
 // находится проверяемое поле, и само это поле
	} else {

		hideInputError(formElement, inputElement);

	}
	
};


// Функция принимает массив полей и проверяет true or falce

const hasInvalidInput =(inputList) => {

	// проходим по этому массиву методом some

	return inputList.some((inputElement) => {

		  // Если поле не валидно, обход массива прекратится и вся функция hasInvalidInput вернёт true
			
	return !inputElement.validity.valid;

	})

};


// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {

	// Если есть хотя бы один невалидный инпут

	if (hasInvalidInput(inputList)) {

		// сделай кнопку неактивной

		buttonElement.classList.add(config.inactiveButtonClass);

		buttonElement.setAttribute("disabled", true);

	} else {

		// иначе сделай кнопку активной

		buttonElement.classList.remove(config.inactiveButtonClass);

		buttonElement.removeAttribute("disabled");

	}

};

  // Добавление обработчиков всем полям формы
 // Функция setEventListeners - добавить слушатель событий  всем полям ввода внутри формы
//isValid на каждый ввод символа

function setEventListeners(formElement) {
	// Находим все поля внутри формы,
	// сделаем из них массив методом Array.from

	const inputList = Array.from(formElement.querySelectorAll(config.inputElement)); 

	// Найдём в текущей форме кнопку отправки
	const buttonElement = formElement.querySelector(config.popupSubmitButton);

	// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля (не понятно, нужна или нет по ТЗ)
  // toggleButtonState(inputList, buttonElement);


	// Обойдём все элементы полученной коллекции
	inputList.forEach((inputElement) => {
		// каждому полю добавим обработчик события input

		inputElement.addEventListener('input', () => {
			// Внутри колбэка вызовем isValid,
			// передав ей форму и проверяемый элемент

			isValid(formElement, inputElement);

			// Вызовем toggleButtonState и передадим ей массив полей и кнопку
			toggleButtonState(inputList, buttonElement);

		});
	});
}


//Добавление обработчиков всем формам

function enableValidation() {
	// Найдём все формы с указанным классом в DOM,
	// сделаем из них массив методом Array.from

	const formList = Array.from(document.querySelectorAll(config.formElement));

	// console.log(formList);
	// Переберём полученную коллекцию
	formList.forEach((formElement) => {

		formElement.addEventListener('submit', (evt) => {

			// У каждой формы отменим стандартное поведение
			evt.preventDefault();

		});

		
		// Для каждой формы вызовем функцию setEventListeners,
		// передав ей элемент формы
		setEventListeners(formElement);

	});

}


// Вызовем функцию
enableValidation(config);

