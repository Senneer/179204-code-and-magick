'use strict';

document.querySelector('.setup-similar').classList.remove('hidden');

var KEYCODES = {
  esc: 27,
  enter: 13
};

var WIZARDS_NUMBER = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_RGB = ['101, 137, 164', '241, 43, 107', '146, 100, 161', '56, 159, 117', '215, 210, 55', '0, 0, 0'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var DOMStrings = {
  similarWizardsList: '.setup-similar-list',
  setup: '.setup',
  setupOpenBtn: '.setup-open',
  setupOpenBtnIcon: '.setup-open-icon',
  setupCloseBtn: '.setup-close',
  setupNameInp: '.setup-user-name',
  setupSubmitBtn: '.setup-submit'
}

var similarWizardsList = document.querySelector(DOMStrings.similarWizardsList);
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
    coatColor: 'rgb(' + pickRandomArrEl(COAT_COLORS_RGB) + ')',
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

function popupEnterPressHandler(e) {
  var classList = e.target.classList;
  if (e.keyCode === KEYCODES.enter) {
    if (classList.contains(DOMStrings.setupCloseBtn)) {
      closePopup();
    } else if (classList.contains(DOMStrings.setupSubmitBtn)) {
      submitSetup();
    }
  }
}

function openPopup() {
  document.querySelector(DOMStrings.setup).classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
  document.querySelector(DOMStrings.setupCloseBtn).addEventListener('keydown', popupEnterPressHandler);
  document.querySelector(DOMStrings.setupSubmitBtn).addEventListener('click', submitSetup);
  document.querySelector(DOMStrings.setupSubmitBtn).addEventListener('keydown', popupEnterPressHandler);
}

function closePopup() {
  document.querySelector(DOMStrings.setup).classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
  document.querySelector(DOMStrings.setupCloseBtn).removeEventListener('keydown', popupEnterPressHandler);
  document.querySelector(DOMStrings.setupSubmitBtn).removeEventListener('click', submitSetup);
  document.querySelector(DOMStrings.setupSubmitBtn).removeEventListener('keydown', popupEnterPressHandler);
}

function submitSetup() {

}

function setupEventListeners() {
  document.querySelector(DOMStrings.setupOpenBtn).addEventListener('click', openPopup);
  document.querySelector(DOMStrings.setupOpenBtnIcon).addEventListener('keydown', function (e) {
    if (e.keyCode === KEYCODES.enter) {
      openPopup(e);
    }
  });
  document.querySelector(DOMStrings.setupCloseBtn).addEventListener('click', closePopup);
  document.querySelector(DOMStrings.setupNameInp).addEventListener('keydown', function (e) {
    e.stopPropagation();
  });
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
