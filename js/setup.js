'use strict';

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var WIZARDS_NUMBER = 4;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS_RGB = ['101, 137, 164', '241, 43, 107', '146, 100, 161', '56, 159, 117', '215, 210, 55', '0, 0, 0'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var similarWizards = [];

function pickRandomArrEl(array) {
  var EL_NUMBER = Math.floor(Math.random() * array.length);
  return array[EL_NUMBER];
}

function generateWizardStats() {
  return {
    name: pickRandomArrEl(NAMES) + ' ' + pickRandomArrEl(SECOND_NAMES),
    coatColor: 'rgb(' + pickRandomArrEl(COAT_COLORS_RGB) + ')',
    eyesColor: pickRandomArrEl(EYES_COLORS)
  };
}

function generateWizard(i) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = similarWizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizards[i].eyesColor;
  similarWizardsList.appendChild(wizardElement);
}

for (var i = 0; i < WIZARDS_NUMBER; i++) {
  similarWizards.push(generateWizardStats());
  generateWizard(i);
}
