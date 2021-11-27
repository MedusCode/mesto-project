function enableValidation(config) {
  const forms = Array.from(document.forms);

  function getInputList(form) {
    return Array.from(form.querySelectorAll('input'));
  }

  function getSubmitButton(form) {
    return form.querySelector(config.submitButtonSelector);
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
    const submitButton = getSubmitButton(form);
    if (hasInvalidInput(form)) {
      submitButton.disabled = true;
    }
    else {
      submitButton.disabled = false;
    }
  }

  function disableButton(form) {
    const submitButton = getSubmitButton(form);
    submitButton.disabled = true;
  }

  function inputHandler(evt) {
    const form = evt.currentTarget;
    const input = evt.target;
    showError(form, input);
    changeButtonStatus(form);
  }

  function removeErrorMassages(form) {
    const errorSpans = form.querySelectorAll(config.errorSpanSelector);
    errorSpans.forEach(errorSpan => {
      errorSpan.textContent = '';
    });
  }

  function removeInputsErrorClasses(form) {
    const inputs = getInputList(form);
    inputs.forEach(input => {
      removeInputErrorClass(input);
    });
  }

  function resetValidation(evt) {
    const form = evt.currentTarget;
    disableButton(form)
    removeErrorMassages(form);
    removeInputsErrorClasses(form);
  }

  forms.forEach(form => {
    form.addEventListener('input', inputHandler);
    form.addEventListener('reset', resetValidation);
  });
}

export { enableValidation };
