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

function validateFirstName() {
  if (checkIfEmpty(firstName)) return;

  if (!checkIfOnlyLetters(firstName)) return;
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
