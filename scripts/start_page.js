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
  partsTitle.style.display = 'none';
  home.removeEventListener('mouseup', onHome);
}

artistsBtn.addEventListener('mouseup', onArtistsBtn);
picturesBtn.addEventListener('mouseup', onPicturesBtn);