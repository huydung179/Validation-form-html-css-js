function Validate(inputElement, errorClassName, messages, rules) {
  for (let rule in rules) {
    if (!Validator[rule](inputElement.value, rules[rule])) {
      inputElement.parentNode.classList.add("invalid");
      inputElement.parentElement.querySelector(`.${errorClassName}`).innerText =
        messages[rule];
      return;
    }
  }
}

function RemoveErrorStatus(inputElement, errorClassName) {
  inputElement.parentNode.classList.remove("invalid");
  inputElement.parentElement.querySelector(`.${errorClassName}`).innerText = "";
}

function Validator({ formElement, errorClassName, rules, messages }) {
  let inputElement;
  for (let inputName in rules) {
    inputElement = formElement.querySelector(`[name=${inputName}]`);
    if (inputElement) {
      inputElement.addEventListener("blur", function () {
        Validate(this, errorClassName, messages[inputName], rules[inputName]);
      });
      inputElement.addEventListener("input", function () {
        RemoveErrorStatus(this, errorClassName);
      });
    }
  }

  formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    for (let inputName in rules) {
      inputElement = formElement.querySelector(`[name=${inputName}]`);
      if (inputElement) {
        Validate(
          inputElement,
          errorClassName,
          messages[inputName],
          rules[inputName]
        );
      }
    }
  });
}

Validator.required = function (value, isRequired) {
  return isRequired ? value.trim().length > 0 : true;
};

Validator.minLength = function (value, min) {
  return value.trim().length > min;
};

Validator.maxLength = function (value, max) {
  return value.trim().length < max;
};

Validator.email = function (value, isRequired) {
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return isRequired ? emailRegex.test(value) : true;
};

Validator.equalTo = function (value, equalTo) {
  let insertedPassword = document.querySelector(`${equalTo}`);
  return insertedPassword ? value === insertedPassword.value : false;
};
