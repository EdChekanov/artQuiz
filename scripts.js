import images from "./images.js";

const startPageMain = document.querySelector('.main .start_page');
const artistsMain = document.querySelector('.main .parts_artists');
const picturesMain = document.querySelector('.main .parts_pictures');

const artistsBtn = document.querySelector('.artists_quiz');
const picturesBtn = document.querySelector('.pictures_quiz');
const settingsBtn = document.querySelector('.settings');

const home = document.querySelector('.home');

const partsTitle = document.querySelector('.parts_title');

const parts1 = document.querySelectorAll('.part_1');
const parts2 = document.querySelectorAll('.part_2');
const parts3 = document.querySelectorAll('.part_3');

const artistPart1 = parts1[0];
const artistPart2 = parts2[0];
const artistPart3 = parts3[0];
const picturePart1 = parts1[1];
const picturePart2 = parts2[1];
const picturePart3 = parts3[1];

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
const popupResult = document.querySelector('.modal_result');
const overlay = popupResult.querySelector('.overlay');
const blockResult = overlay.querySelector('.result_block');
const trueImg = blockResult.querySelector('.result_true');
const falseImg = blockResult.querySelector('.result_false');
const trueText = blockResult.querySelector('.result_text_true');
const falseText = blockResult.querySelector('.result_text_false');
const okayBtn = blockResult.querySelector('.okay');
let artists1 = {};
let artists2 = {};
let artists3 = {};
let pictures1 = {};
let pictures2 = {};
let pictures3 = {};
let round = 0;
let step = 0;
let target;

function startArtistsGame(evt) {
  round = 0;
  step = 0;
  if (evt.target.closest('.part').classList.contains('part_1')) {
    round = 0;
    target = artists1;
  }
  if (evt.target.closest('.part').classList.contains('part_2')) {
    round = 10;
    target = artists2;
  }
  if (evt.target.closest('.part').classList.contains('part_3')) {
    round = 20;
    target = artists3;
  }
  nextStep();
}
function getRandomNumber(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
function nextStep() {
  round++;
  step++;

  artistsImage.style.backgroundImage = `url(../assets/arts/${round}.jpg)`;
  artistsImage.style.backgroundPosition = `center`;
  artistsImage.style.backgroundRepeat = `no-repeat`;
  artistsImage.style.backgroundSize = `contain`;

  artistsQuestionNumber.textContent = `${step}/10`;
  
  answers.forEach(el => el.textContent = images[getRandomNumber(round + 1, images.length - 1)].author);
  answers.forEach(el => {
    el.closest('.answer').addEventListener('mouseup', onFalseAnswer);
  })

  let correctItem = answers[getRandomNumber(0, 3)];
  correctItem.textContent = images[round].author;
  let correctAnswer = correctItem.closest('.answer');
  correctAnswer.removeEventListener('mouseup', onFalseAnswer);
  correctAnswer.addEventListener('mouseup', onTrueAnswer);
}
function showPopupResult(item) {
  popupResult.style.display = 'block';
  setTimeout(() => {
    blockResult.style.transform = 'translateY(0%)';
  }, 0);
  if (item) {
    trueImg.style.display = 'inline-block';
    falseImg.style.display = 'none';
    trueText.style.display = 'inline-block';
    falseText.style.display = 'none';
  } else {
    trueImg.style.display = 'none';
    falseImg.style.display = 'inline-block';
    trueText.style.display = 'none';
    falseText.style.display = 'inline-block';
  }
  overlay.addEventListener('mouseup', onOverlay);
  okayBtn.addEventListener('mouseup', onOkayBtn);
}
function onOverlay(evt) {
  if (evt.target === overlay) closePopup();
}
function onOkayBtn() {
  closePopup();
}
function closePopup() {
  popupResult.style.display = 'none';
  answers.forEach(el => {
    el.closest('.answer').removeEventListener('mouseup', onFalseAnswer);
    el.closest('.answer').removeEventListener('mouseup', onTrueAnswer);
    el.closest('.answer').classList.remove('false');
    el.closest('.answer').classList.remove('true');
  })
  overlay.removeEventListener('mouseup', onOverlay);
  okayBtn.removeEventListener('mouseup', onOkayBtn);
  let trueCount = 0;
  for (let el in target) {
    if (target[el]) trueCount++;    
  }
  if (target == artists1) {
    artistPart1.querySelector('.score').textContent = `${trueCount}/10`;
    localStorage.setItem('art1', trueCount);
  }
  if (target == artists2) {
    artistPart2.querySelector('.score').textContent = `${trueCount}/10`;
    localStorage.setItem('art2', trueCount);
  }
  if (target == artists3) {
    artistPart3.querySelector('.score').textContent = `${trueCount}/10`;
    localStorage.setItem('art3', trueCount);
  }
  if (target == pictures1) {
    picturePart1.querySelector('.score').textContent = `${trueCount}/10`;
    localStorage.setItem('pic1', trueCount);
  }
  if (target == pictures2) {
    picturePart2.querySelector('.score').textContent = `${trueCount}/10`;
    localStorage.setItem('pic2', trueCount);
  }
  if (target == pictures3) {
    picturePart3.querySelector('.score').textContent = `${trueCount}/10`;
    localStorage.setItem('pic3', trueCount);
  }
  if (step === 10) {
    onParts();
    return;
  }
  nextStep();
}
function onFalseAnswer() {
  this.classList.add('false');
  showPopupResult(0);
  target[step] = false;
}
function onTrueAnswer() {
  this.classList.remove('false');
  this.classList.add('true');
  showPopupResult(1);
  target[step] = true;
}

artistPart1.querySelector('.score').textContent = `${localStorage.getItem('art1') || 0}/10`;
if (localStorage.getItem('art1') == 10) artistPart1.querySelector('.mask_color').style.background = 'rgba(255, 255, 255, 0)';  
artistPart2.querySelector('.score').textContent = `${localStorage.getItem('art2') || 0}/10`;
if (localStorage.getItem('art2') == 10) artistPart2.querySelector('.mask_color').style.background = 'rgba(255, 255, 255, 0)';  
artistPart3.querySelector('.score').textContent = `${localStorage.getItem('art3') || 0}/10`;
if (localStorage.getItem('art3') == 10) artistPart3.querySelector('.mask_color').style.background = 'rgba(255, 255, 255, 0)';  
picturePart1.querySelector('.score').textContent = `${localStorage.getItem('pic1') || 0}/10`;
if (localStorage.getItem('pic1') == 10) picturePart1.querySelector('.mask_color').style.background = 'rgba(255, 255, 255, 0)';  
picturePart2.querySelector('.score').textContent = `${localStorage.getItem('pic2') || 0}/10`;
if (localStorage.getItem('pic2') == 10) picturePart2.querySelector('.mask_color').style.background = 'rgba(255, 255, 255, 0)';  
picturePart3.querySelector('.score').textContent = `${localStorage.getItem('pic3') || 0}/10`;
if (localStorage.getItem('pic3') == 10) picturePart3.querySelector('.mask_color').style.background = 'rgba(255, 255, 255, 0)';  

