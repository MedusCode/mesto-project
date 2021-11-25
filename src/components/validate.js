function enableValidation(config) {
  const forms = Array.from(document.forms);

  function getInputList(form) {
    return Array.from(form.querySelectorAll('input'));
  }

  function isInputValid(input) {
    return input.validity.valid;
  }

  function hasInvalidInput(form) {
    const inputList = getInputList(form);
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  function removeInputErrorClass(input) {
    input.classList.remove(config.inputErrorClass);
  }

  function addInputErrorClass(input) {
    input.classList.add(config.inputErrorClass);
  }

  function showErrorMassage(form, input) {
    const errorSpan = form.querySelector(`.${input.id}-error`);
    errorSpan.textContent = input.validationMessage;
  }

  function changeInputColor(input) {
    if (isInputValid(input)) {
      removeInputErrorClass(input);
    }
    else {
      addInputErrorClass(input);
    }
  }

  function showError(form, input) {
    showErrorMassage(form, input);
    changeInputColor(input);
  }

  function changeButtonStatus(form) {
    const submitButton = form.querySelector(config.submitButtonSelector);
    if (hasInvalidInput(form)) {
      submitButton.disabled = true;
    }
    else {
      submitButton.disabled = false;
    }
  }

  function inputHandler(evt) {
    const form = evt.currentTarget;
    const input = evt.target;
    showError(form, input);
    changeButtonStatus(form);
  }

  forms.forEach(form => {
    form.addEventListener('input', inputHandler);
  });

  function removeErrorMassages() {
    const errorSpans = document.querySelectorAll(config.errorSpanSelector);
    errorSpans.forEach(errorSpan => {
      errorSpan.textContent = '';
    });
  }

  function removeInputsErrorClasses() {
    const inputs = getInputList(document);
    inputs.forEach(input => {
      removeInputErrorClass(input);
    });
  }

  function resetValidation() {
    removeErrorMassages();
    removeInputsErrorClasses();
    forms.forEach(form => {
      changeButtonStatus(form);
    })
  }

  const openFormButtons = document.querySelectorAll(config.openButtonSelector);
  openFormButtons.forEach(button => {
    button.addEventListener('click', resetValidation);
  })
}

export { enableValidation };
