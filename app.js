const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
// target the form element
const form = document.getElementById('myForm');
const confirmPassword = document.getElementById('confirmPassword');

// Event listener for the form
const green = '#4CAF60';
const red = '#F44346';

// Event listener for the form default behavior
form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (
    validateFirstName() &&
    validateLastName() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateEmail()
  ) {
  }
});

function validateFirstName() {
  if (checkIfEmpty(firstName)) return;

  if (!checkIfOnlyLetters(firstName)) return;
  return true;
}

function validateLastName() {
  if (checkIfEmpty(lastName)) return;

  if (!checkIfOnlyLetters(lastName)) return;
  return true;
}

function validatePassword() {
  if (checkIfEmpty(password)) return;

  if (!correctLength(password, 4, 100)) return;
  //  check password against the haveCharacters function to see if it has the required characters
  //   if (!haveCharacters(password, 4)) return;

  return true;
}

function validateConfirmPassword() {
  if (password.className !== 'valid') {
    setInvalid(confirmPassword, 'Password is found to be invalid');
    return;
  }

  if (password.value !== confirmPassword.value) {
    setInvalid(confirmPassword, 'Passwords found to be not matching');
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}

function validateEmail() {
  if (checkIfEmpty(email)) return;
  if (!haveCharacters(email, 5)) return;
  return true;
}

function checkIfEmpty(field) {
  if (isEmpty(field.value.trim())) {
    setInvalid(field, `${field.name} cannot be empty`);
    return true;
  } else {
    setValid(field);
    return false;
  }
}

function isEmpty(value) {
  if (value === '') return true;
  return false;
}

function setInvalid(field, message) {
  field.className = 'invalid';
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
}

function setValid(field) {
  field.className = 'valid';
  field.nextElementSibling.innerHTML = '';
  field.nextElementSibling.style.color = green;
}

function checkIfOnlyLetters(field) {
  if (/^[a-zA-Z ]+$/.test(field.value)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} this field should contain only letters`);
    return false;
  }
}

function correctLength(field, min, max) {
  if (field.value.length >= min && field.value.length < max) {
    setValid(field);
    return true;
  } else if (field.value.length < min) {
    setInvalid(field, `${field.name} must be at least ${min} characters long`);
    return false;
  } else {
    setInvalid(field, `${field.name} must be less than ${max} characters`);
    return false;
  }
}

function haveCharacters(field, characters) {
  let regularExpression;
  switch (characters) {
    case 1:
      regularExpression = /(?=.*[a-zA-Z])/;
      return matchWithRegularExpression(
        regularExpression,
        field,
        `Has to contain at least one letter`,
      );
    case 2:
      regularExpression = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegularExpression(
        regularExpression,
        field,
        `Has to contain at least one letter and one number`,
      );
    case 3:
      regularExpression = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegularExpression(
        regularExpression,
        field,
        `Has to contain at least one uppercase letter, one lowercase letter and one number`,
      );
    case 4:
      regularExpression = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegularExpression(
        regularExpression,
        field,
        `Has to contain at least one uppercase letter, one lowercase letter, one number and one special character`,
      );
    case 5:
      regularExpression =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegularExpression(
        regularExpression,
        field,
        'This Email did not make the cut. Please enter a valid email address.',
      );
    default:
      return false;
  }
}

function matchWithRegularExpression(regularExpression, field, message) {
  if (field.value.match(regularExpression)) {
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}
