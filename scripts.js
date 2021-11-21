import images from "./images.js";

const startPageMain = document.querySelector('.main .start_page');
const artistsMain = document.querySelector('.main .parts_artists');
const picturesMain = document.querySelector('.main .parts_pictures');

const artistsBtn = document.querySelector('.artists_quiz');
const picturesBtn = document.querySelector('.pictures_quiz');
const settingsBtn = document.querySelector('.settings');

const home = document.querySelector('.home');

const partsTitle = document.querySelector('.parts_title');


function showItemMain(item) {
  item.style.display = 'flex';
  setTimeout(() => {
    item.style.transform = 'translateX(0%)';
  }, 300)
}
function hideItemMain(item) {
  item.style.transform = 'translateX(-100%)';
  setTimeout(() => {
    item.style.display = 'none';
  }, 300)
}

function showHome() {
  setTimeout(() => {
    home.style.transform = 'translateX(0%)';
  }, 300)
}
function hideHome() {
  home.style.transform = 'translateX(-1000%)';
}

function onArtistsBtn() {
  hideItemMain(startPageMain);
  showItemMain(artistsMain);
  showHome();
  partsTitle.style.display = 'inline';
  home.addEventListener('mouseup', onHome);
}
function onPicturesBtn() {
  hideItemMain(startPageMain);
  showItemMain(picturesMain);
  showHome();
  partsTitle.style.display = 'inline';
  home.addEventListener('mouseup', onHome);
}
function onHome() {
  hideItemMain(artistsMain);
  hideItemMain(picturesMain);
  showItemMain(startPageMain);
  hideHome();
  hideParts();
  partsTitle.style.display = 'none';
  home.removeEventListener('mouseup', onHome);
}

artistsBtn.addEventListener('mouseup', onArtistsBtn);
picturesBtn.addEventListener('mouseup', onPicturesBtn);


// GAME -------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
const gameField = document.querySelector('.game');
const partsHeader = document.querySelector('.parts');
const parts = document.querySelectorAll('.part');

const logo = document.querySelector('.logo');

let partsArg;


function showParts() {
  setTimeout(() => {
    partsHeader.style.transform = 'translateX(0%)';
  }, 300)
}
function hideParts() {
  partsHeader.style.transform = 'translateX(1000%)';
}
function onPartsBtn(evt) {
  if (evt.target.closest('.part').classList.contains('artist')) {
    hideItemMain(artistsMain);
    partsArg = artistsMain;
    partsHeader.addEventListener('mouseup', onParts);
  } else {
    hideItemMain(picturesMain);
    partsArg = artistsMain;
    partsHeader.addEventListener('mouseup', onParts);
  }
  showItemMain(gameField);
  showHome();
  showParts();
  partsTitle.style.display = 'none';
  logo.style.display = 'none';
  home.addEventListener('mouseup', onHome);
  
  startArtistsGame(evt);
}
function onParts() {
  hideItemMain(gameField);
  showItemMain(partsArg);
  hideParts();
  partsTitle.style.display = 'inline';
  logo.style.display = 'flex';
  partsHeader.removeEventListener('mouseup', onParts);
}

parts.forEach(el => el.addEventListener('mouseup', onPartsBtn));

// GAME - PROCESS----------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
//-------------------------------------------------------------------------

const artistsImage = document.querySelector('.question_item');
const artistsQuestionNumber = document.querySelector('.question_number');
const answers = document.querySelectorAll('.answer_text');
let round = 0;
let step = 1;

function startArtistsGame(evt) {
  if (evt.target.closest('.part').classList.contains('part_1')) round = 0;
  if (evt.target.closest('.part').classList.contains('part_2')) round = 10;
  if (evt.target.closest('.part').classList.contains('part_3')) round = 20;
  artistsImage.style.backgroundImage = `url(../assets/arts/${round}.jpg)`;
  artistsImage.style.backgroundPosition = `center`;
  artistsImage.style.backgroundRepeat = `no-repeat`;
  artistsImage.style.backgroundSize = `contain`;

  artistsQuestionNumber.textContent = `${step}/10`;
  
  answers.forEach(el => el.textContent = images[getRandomNumber(round + 1, images.length - 1)].author);
  answers.forEach(el => {
    el.closest('.answer').addEventListener('mouseup', () => {
      el.closest('.answer').classList.add('false');
    })
  })

  let correctItem = answers[getRandomNumber(0, 3)];
  correctItem.textContent = images[round].author;
  console.log(correctItem.closest('.answer'))
  let correctAnswer = correctItem.closest('.answer');
  correctAnswer.addEventListener('mouseup', () => {
    correctAnswer.classList.remove('false');
    correctAnswer.classList.add('true');
  })
}
function getRandomNumber(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}