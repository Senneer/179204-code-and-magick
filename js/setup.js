'use strict';

document.querySelector('.setup-similar').classList.remove('hidden');

var KEYCODES = {
  esc: 27,
  enter: 13
};

var WIZARDS_NUMBER = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_RGB = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var similarWizards = [];

function pickRandomArrEl(array) {
  var EL_NUMBER = Math.floor(Math.random() * array.length);
  return array[EL_NUMBER];
}

function generateWizardData() {
  return {
    name: pickRandomArrEl(NAMES) + ' ' + pickRandomArrEl(SECOND_NAMES),
    coatColor: pickRandomArrEl(COAT_COLORS_RGB),
    eyesColor: pickRandomArrEl(EYES_COLORS)
  };
}

function generateWizardNode(obj) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = obj.name;
  wizardElement.querySelector('.wizard-coat').style.fill = obj.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = obj.eyesColor;

  return wizardElement;
}


function popupEscPressHandler(e) {
  if (e.keyCode === KEYCODES.esc) {
    closePopup();
  }
}


// Открытие/закрытие попапа
var setupWindow = document.querySelector('.setup');
var setupOpenBtn = document.querySelector('.setup-open');
var setupOpenBtnIcon = document.querySelector('.setup-open-icon');
var setupCloseBtn = document.querySelector('.setup-close');
var setupNameInp = document.querySelector('.setup-user-name');

function openPopup() {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
}

function closePopup() {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
}

setupCloseBtn.addEventListener('keydown', function (e) {
  if (e.keyCode === KEYCODES.enter) {
    closePopup();
  }
});

// Изменения персонажа
var wizardLookWrapper = document.querySelector('.setup-wizard-appearance');
var wizardCoat = wizardLookWrapper.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = wizardLookWrapper.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

function changeWizardsLook(colorArr, elemToChange, formInpName) {
  var color = pickRandomArrEl(colorArr);
  var hiddenInput = wizardLookWrapper.querySelector('[name="' + formInpName + '"]');

  elemToChange.style.fill = color;
  hiddenInput.value = color;
}

function changeFireballColorHandler() {
  var color = pickRandomArrEl(FIREBALL_COLORS);
  var hiddenInput = document.querySelector('[name="fireball-color"]');

  wizardFireball.style.background = color;
  hiddenInput.value = color;
}

function setupEventListeners() {
  setupOpenBtn.addEventListener('click', function () {
    openPopup();
  });
  setupOpenBtnIcon.addEventListener('keydown', function (e) {
    if (e.keyCode === KEYCODES.enter) {
      openPopup(e);
    }
  });
  setupCloseBtn.addEventListener('click', function () {
    closePopup();
  });
  setupNameInp.addEventListener('keydown', function (e) {
    e.stopPropagation();
  });

  wizardCoat.addEventListener('click', function () {
    changeWizardsLook(COAT_COLORS_RGB, wizardCoat, 'coat-color');
  });
  wizardEyes.addEventListener('click', function () {
    changeWizardsLook(EYES_COLORS, wizardEyes, 'eyes-color');
  });
  wizardFireball.addEventListener('click', changeFireballColorHandler);
}

function init() {
  for (var i = 0; i < WIZARDS_NUMBER; i++) {
    var wizardData = generateWizardData();
    similarWizards.push(wizardData);
    var wizardNode = generateWizardNode(wizardData);
    similarWizardsList.appendChild(wizardNode);
  }

  setupEventListeners();
}

init();
