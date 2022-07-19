
export class FormValidator {

	constructor(object, element) {
		this._formElement = object.formElement;
		this._inputElement = object.inputElement;
		this._popupSubmitButton = object.popupSubmitButton;
		this._inactiveButtonClass = object.inactiveButtonClass;
		this._inputErrorClass = object.inputErrorClass;
		this._errorClassActive = object.errorClassActive;
		this._element = element;
		this._inputList = Array.from(element.querySelectorAll(object.inputElement));
		this._buttonElement = element.querySelector(object.popupSubmitButton);
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

		return this._inputList.some((inputElement) => {

			// Если поле не валидно, обход массива прекратится и вся функция hasInvalidInput вернёт true

			return !inputElement.validity.valid;

		})

	};


	clearInpytsOnsubmit = (inputList) => {



		this._inputList.forEach((inputElement) => {

			inputElement.value = '';
		})


	};


	// Функция принимает массив полей ввода
	// и элемент кнопки, состояние которой нужно менять

	toggleButtonState = (inputList, buttonElement) => {

		// Если есть хотя бы один невалидный инпут

		if (this._hasInvalidInput(this._inputList)) {

			// сделай кнопку неактивной

			this._buttonElement.classList.add(this._inactiveButtonClass);

			this._buttonElement.setAttribute("disabled", true);

		} else {

			// иначе сделай кнопку активной

			this._buttonElement.classList.remove(this._inactiveButtonClass);

			this._buttonElement.removeAttribute("disabled");

		}

	};

	// Добавление обработчиков всем полям формы
	// Функция setEventListeners - добавить слушатель событий  всем полям ввода внутри формы
	//isValid на каждый ввод символа

	_setEventListeners() {
		// Находим все поля внутри формы,
		// сделаем из них массив методом Array.from

		// this._inputList = Array.from(this._element.querySelectorAll(this._inputElement));

		// Найдём в текущей форме кнопку отправки
		// this._buttonElement = this._element.querySelector(this._popupSubmitButton);

		// Вызовем toggleButtonState, чтобы не ждать ввода данных в поля и кнопка была не активна сразу
		this.toggleButtonState(this._inputList, this._buttonElement);


		// Обойдём все элементы полученной коллекции
		this._inputList.forEach((inputElement) => {
			// каждому полю добавим обработчик события input

			inputElement.addEventListener('input', () => {
				// Внутри колбэка вызовем isValid,
				// передав ей форму и проверяемый элемент

				this._isValid(this._formElement, inputElement);

				// Вызовем toggleButtonState и передадим ей массив полей и кнопку
				this.toggleButtonState(this._inputList, this._buttonElement);

			});
		});
	}

}

