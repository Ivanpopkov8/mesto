


export class FormValidator {

	constructor(object, element) {
		this._formElement = object.formElement;
		this._inputElement = object.inputElement;
		this._popupSubmitButton = object.popupSubmitButton;
		this._inactiveButtonClass = object.inactiveButtonClass;
		this._inputErrorClass = object.inputErrorClass;
		this._errorClassActive = object.errorClassActive;
		this._element = element;
	}

	//Добавление обработчиков всем формам

	enableValidation() {

			this._setEventListeners();

	}

	// 1. Получаем данные о валидации в js


	// Функция, которая добовляет класс с ошибкой

	_showInputError = (formElement, inputElement, errorMessage) => {

		// Выбираем элемент ошибки внутри функции
		//на основе уникального класса из инпута по id уникальным классом из span:

		const formError = this._element.querySelector(`.${inputElement.id}-error`);

		// Показываем красный бордер-ботом
		inputElement.classList.add(this._inputErrorClass);

		// Заменим содержимое span с ошибкой на переданный параметр
		formError.textContent = errorMessage;

		// Показываем сообщение об ошибке
		formError.classList.add(this._errorClassActive);
	};

	// Функция, которая удаляет класс с ошибкой

	_hideInputError = (formElement, inputElement) => {

		// Удаляем элемент ошибки внутри функции
		//на основе уникального класса из инпута по id уникальным классом из span:
		// Находим элемент ошибки

		const formError = this._element.querySelector(`.${inputElement.id}-error`);

		// Удаляем красный бордер-ботом
		inputElement.classList.remove(this._inputErrorClass);

		// Удаляет сообщение об ошибке validationMessage
		formError.classList.remove(this._errorClassActive);

		// Очистим ошибку
		formError.textContent = '';

	};

	// Функция которая проверяет валидность поля
	// Функция isValid принимает formElement и inputElement,
	// а не берёт их из внешней области видимости

	_isValid = (formElement, inputElement) => {

		//Функция isValid принимает сразу два параметра:
		//formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
		//inputElement — проверяемое поле ввода.

		// Если поле не проходит валидацию, покажем ошибку
		if (!inputElement.validity.valid) {

			// Передадим сообщение об ошибке
			// showInputError получает параметром форму, в которой
			// находится проверяемое поле, и само это поле
			this._showInputError(this._formElement, inputElement, inputElement.validationMessage);

			// Если проходит, скроем
			// hideInputError получает параметром форму, в которой
			// находится проверяемое поле, и само это поле
		} else {

			this._hideInputError(this._formElement, inputElement);

		}

	};

	// Функция принимает массив полей и проверяет true or falce

	_hasInvalidInput = (inputList) => {

		// проходим по этому массиву методом some

		return inputList.some((inputElement) => {

			// Если поле не валидно, обход массива прекратится и вся функция hasInvalidInput вернёт true

			return !inputElement.validity.valid;

		})

	};


  _clearInpytsOnsubmit = (inputList) => {



		inputList.forEach((inputElement) => {

    inputElement.value = '';
		})
		

	};


	// Функция принимает массив полей ввода
	// и элемент кнопки, состояние которой нужно менять

	_toggleButtonState = (inputList, buttonElement) => {

		// Если есть хотя бы один невалидный инпут

		if (this._hasInvalidInput(inputList)) {

			// сделай кнопку неактивной

			buttonElement.classList.add(this._inactiveButtonClass);

			buttonElement.setAttribute("disabled", true);

		} else {

			// иначе сделай кнопку активной

			buttonElement.classList.remove(this._inactiveButtonClass);

			buttonElement.removeAttribute("disabled");

		}

	};

	// Добавление обработчиков всем полям формы
	// Функция setEventListeners - добавить слушатель событий  всем полям ввода внутри формы
	//isValid на каждый ввод символа

	_setEventListeners() {
		// Находим все поля внутри формы,
		// сделаем из них массив методом Array.from

		const inputList = Array.from(this._element.querySelectorAll(this._inputElement));

		// Найдём в текущей форме кнопку отправки
		const buttonElement = this._element.querySelector(this._popupSubmitButton);

		// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля и кнопка была не активна сразу
		this._toggleButtonState(inputList, buttonElement);


		// Обойдём все элементы полученной коллекции
		inputList.forEach((inputElement) => {
			// каждому полю добавим обработчик события input

			inputElement.addEventListener('input', () => {
				// Внутри колбэка вызовем isValid,
				// передав ей форму и проверяемый элемент

				this._isValid(this._formElement, inputElement);

				// Вызовем toggleButtonState и передадим ей массив полей и кнопку
				this._toggleButtonState(inputList, buttonElement);

			});
		});
	}

}

