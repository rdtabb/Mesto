export const selectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function showInputError(selectors, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`${selectors.inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${selectors.errorClass}`);
}

function hideInputError(selectors, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`${selectors.inputErrorClass}`);
  errorElement.classList.remove(`${selectors.errorClass}`);
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

export function toggleButtonState(selectors, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${selectors.inactiveButtonClass}`);
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove(`${selectors.inactiveButtonClass}`);
    buttonElement.removeAttribute("disabled");
  }
}

export function checkInputValidity(selectors, formElement, inputElement) {
  if (inputElement.validity.tooShort) {
    inputElement.setCustomValidity(
      `Минимальная длина ${inputElement.getAttribute("minlength")} символа`
    );
  } else if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      `${inputElement.getAttribute("data-error-message")}`
    );
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      selectors,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(selectors, formElement, inputElement);
  }
}

function setEventListeners(selectors, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(`${selectors.inputSelector}`)
  );
  const buttonElement = formElement.querySelector(
    `${selectors.submitButtonSelector}`
  );
  toggleButtonState(selectors, inputList, buttonElement);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(selectors, formElement, input);
      toggleButtonState(selectors, inputList, buttonElement);
    });
  });
}

export function enableValidation(selectors) {
  const formList = Array.from(
    document.querySelectorAll(`${selectors.formSelector}`)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(selectors, formElement);
  });
}

export default class FormValidate {
  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.setAttribute("disabled", "true");
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.tooShort) {
      inputElement.setCustomValidity(
        `Минимальная длина ${inputElement.getAttribute("minlength")} символа`
      );
    } else if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(
        `${inputElement.getAttribute("data-error-message")}`
      );
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._toggleButtonState(inputList, buttonElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }
}
