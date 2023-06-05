const initialCards = [
    {
      link: "./images/lisboa.avif",
      name: "Лиссабон",
    },
    {
      link: "./images/tokyo.avif",
      name: "Токио",
    },
    {
      link: "./images/chicago.avif",
      name: "Чикаго",
    },
    {
      link: "./images/fortaleza.avif",
      name: "Форталеза",
    },
    {
      link: "./images/istanbul.avif",
      name: "Стамбул",
    },
    {
      link: "./images/bali.avif",
      name: "Бали",
    },
  ];
  
  // ------------------------------------
  // DOM elements
  // ------------------------------------
  const templateElement = document.querySelector("#card-template"); 
  const cardsSection = document.querySelector(".cards");
  
  const profileHeader = document.querySelector(".profile__header");
  const profileDescription = document.querySelector(".profile__description");
  const popupCover = document.querySelector(".popup__cover");
  const popupCaption = document.querySelector(".popup__caption");
  
  const formEditProfile = document.querySelector(".popup__form_profile");
  const formAddCard = document.querySelector(".popup__form_addcard");
  
  const inputUrl = document.querySelector(".popup__input_type_url");
  const inputPlace = document.querySelector(".popup__input_type_place");
  const inputName = document.querySelector(".popup__input_type_name");
  const inputStatus = document.querySelector(".popup__input_type_description");
  
  const buttonEditProfile = document.querySelector(".profile__edit-button");
  const buttonAddCard = document.querySelector(".profile__add-button");
  
  const profilePopup = document.querySelector(".popup_profile");
  const addCardPopup = document.querySelector(".popup_addcard");
  const imagePopup = document.querySelector(".popup_image");
  // arrays of elements
  const popups = Array.from(document.querySelectorAll(".popup"));
  const buttonsClose = Array.from(document.querySelectorAll(".popup__close"));
  
  // ------------------------------------
  // render
  // ------------------------------------
  function createCard(card) {
    const cardElement = templateElement?.content
      .querySelector(".card")
      ?.cloneNode(true);
    cardElement.querySelector(".card__image").src = card.link;
    cardElement.querySelector(".card__image").alt = card.name;
    cardElement.querySelector(".card__description").textContent = card.name;
    cardElement.querySelector('.card__like').addEventListener('click', handleLike)
    cardElement.querySelector('.card__delete').addEventListener('click', handleDelete)
    cardElement.querySelector('.card__image').addEventListener('click', (e) => {
      const link = e.target.getAttribute("src");
      const alt = e.target.getAttribute("alt");
      popupCaption.textContent = card.name
      popupCover.src = link;
      popupCover.alt = alt;
      openPopup(imagePopup);
      closePopupOnEsc(imagePopup)
    })
    return cardElement;
  }
  function renderCards() {
    initialCards.forEach((el) => {
      const card = createCard(el);
      cardsSection.append(card);
    });
  }
  renderCards();
  // ------------------------------------
  // Functions
  // ------------------------------------
  function handleLike(e) {
    e.target.classList.toggle("card__like_true");
  }
  function handleDelete(e) {
    e.target.closest("article").remove();
  }
  function openPopup(popupElement) {
    popupElement.classList.add("popup_opened");
  }
  function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
  }
  function addCard(card) {
    const cardEl = createCard(card);
    cardsSection.prepend(cardEl);
  }
  function editProfile() {
    profileHeader.textContent = inputName.value
    profileDescription.textContent = inputStatus.value
  }
  function closePopupOnEsc(popupElement) {
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        closePopup(popupElement)
      }
    })
  }
  formAddCard.addEventListener("submit", (e) => {
    e.preventDefault();
    const newCard = {
      link: inputUrl.value,
      name: inputPlace.value,
    };
    inputUrl.value = "";
    inputPlace.value = "";
    addCard(newCard);
    const addPopup = formAddCard.closest('.popup')
    closePopup(addPopup);
  });
  formEditProfile.addEventListener("submit", (e) => {
    e.preventDefault()
    editProfile()
    const editPopup = formEditProfile.closest('.popup')
    closePopup(editPopup)
  })
  // ------------------------------------
  // Adding event listeners
  // ------------------------------------
  buttonEditProfile.addEventListener("click", () => {
    inputName.value = profileHeader.textContent
    inputStatus.value = profileDescription.textContent
    openPopup(profilePopup);
    closePopupOnEsc(profilePopup)
  });
  buttonAddCard.addEventListener("click", () => {
    openPopup(addCardPopup);
    closePopupOnEsc(addCardPopup)
  });
  buttonsClose.forEach((button) => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(buttonsPopup));
  });
  
  // ------------------------------------
  // Validation 
  // ------------------------------------
  const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  
  function showInputError(selectors, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.add(`${selectors.inputErrorClass}`)
    errorElement.textContent = errorMessage
    errorElement.classList.add(`${selectors.errorClass}`)
  }
  
  function hideInputError(selectors, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
    inputElement.classList.remove(`${selectors.inputErrorClass}`)
    errorElement.classList.remove(`${selectors.errorClass}`)
    errorElement.textContent = ''
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid
    })
  }
  
  function toggleButtonState(selectors, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(`${selectors.inactiveButtonClass}`)
      buttonElement.setAttribute("disabled", "true")
    } else {
      buttonElement.classList.remove(`${selectors.inactiveButtonClass}`)
      buttonElement.removeAttribute("disabled")
    }
  }
  
  function checkInputValidity(selectors, formElement, inputElement) {  
    if (inputElement.validity.tooShort) {
      inputElement.setCustomValidity(`Минимальная длина ${inputElement.getAttribute("minlength")} символа`)
    } else if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(`${inputElement.getAttribute('data-error-message')}`) 
    } else {
      inputElement.setCustomValidity("")
    }
  
    if (!inputElement.validity.valid) {
      showInputError(selectors, formElement, inputElement, inputElement.validationMessage)
    } else {
      hideInputError(selectors, formElement, inputElement)
    }
  }
  
  function setEventListeners(selectors, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(`${selectors.inputSelector}`))
    const buttonElement = formElement.querySelector(`${selectors.submitButtonSelector}`)
    toggleButtonState(selectors, inputList, buttonElement)
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        checkInputValidity(selectors, formElement, input)
        toggleButtonState(selectors, inputList, buttonElement)
      })
    })
  }
  
  function enableValidation(selectors) {
    const formList = Array.from(document.querySelectorAll(`${selectors.formSelector}`))
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (e) => {
        e.preventDefault()
      })
      setEventListeners(selectors, formElement)
    })
  }
  
  enableValidation(selectors)
  