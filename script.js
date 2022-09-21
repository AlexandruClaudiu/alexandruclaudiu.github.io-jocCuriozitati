let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const alphabet = document.getElementById('alphabet');
const passwordBoard = [
  'Peste saptezeci si cinci la suta din deseuri pot fi reciclate.',
  'Reciclarea cutiilor de aluminiu economiseste nouazeci si cinci la suta din energia aluminiului nou din bauxita.',
  'Daca reciclam o tona de hartie vom putea economisi saptesprezece copaci maturi',
  'Sticla poate fi reciclata la infinit',
  'Doar zece la suta dintre ziarele vândute in Statele Unite ajung să fie reciclate',
  'In fiecare an un copac obisnuit poate curata aerul de aproximativ treizeci de kilograme de poluanti',
  'Desi SUA reprezintă aproximativ patru la suta din populația lumii, americanii sunt poluatorul numarul unu.',
  'Reziduurile de tigari se descompun in doisprezece ani',
];
const passwordDiv = document.querySelector('#board');
const imgDiv = document.querySelector('#hangin-dude');
const random = Math.floor(Math.random() * passwordBoard.length);
const password = passwordBoard[random];
let fail = 1;
let countDown;

const start = function () {
  letters.split('').forEach(letter => {
    const html = `<div class="letter">${letter}</div>`;
    alphabet.insertAdjacentHTML('beforeend', html);
  });
  showPassword();
  showHangman(fail);
};
window.onload = start;

const passwordDashed = password.split('').map(letter => {
  if (letter === ' ') return ' ';
  else if (letter === '’') return '’';
  else if (letter === ',') return ',';
  else return '_';
});
const showPassword = function () {
  passwordDiv.innerHTML = passwordDashed.join('');
};
const showHangman = function (nr) {
  imgDiv.innerHTML = `<img src="img/${nr}.svg" alt="" />`;
};

const checkForLetter = function (e) {
  if (e.target.classList.contains('letter')) {
    if (password.toUpperCase().split('').includes(e.target.textContent)) {
      password
        .toUpperCase()
        .split('')
        .forEach((letter, i, arr) => {
          if (letter === e.target.textContent) {
            passwordDashed[i] = letter;
            showPassword();
          }
        });

      deactivateLetter(true, e.target);
    } else {
      fail++;
      showHangman(fail);
      deactivateLetter(false, e.target);
    }
    if (fail == 6) {
      finish(false);
    }
    if (password.toUpperCase() === passwordDashed.join('')) {
      finish(true);
    }
  }
};
alphabet.addEventListener('click', checkForLetter);
const deactivateLetter = function (hit, letter, audio) {
  letter.style.border = hit
    ? '1px solid rgb(50, 177, 149)'
    : '1px solid rgba(255, 0, 0, 0.338)';
  letter.style.backgroundColor = hit
    ? 'rgb(50, 177, 149)'
    : 'rgba(255, 0, 0, 0.338)';
  letter.style.color = 'white';
  letter.style.cursor = 'default';
};

const finish = function (succes) {
  if (succes) {
    alphabet.innerHTML = `<h1>NICE WORK!</h1><div class='btn'>PLAY AGAIN</div>`;
    clearInterval(countDown);
  } else {
    alphabet.innerHTML = `<h1>YOU LOST!</h1><div class='btn'>TRY AGAIN</div>`;
    clearInterval(countDown);
  }
  document
    .querySelector('.btn')
    .addEventListener('click', () => location.reload());
};

const timer = function () {
  const timer = document.querySelector('#timer');
  let time = new Date(60000);
  const options = {
    minute: '2-digit',
    second: '2-digit',
  };
  const tick = function () {
    time -= 1000;
    timer.textContent = Intl.DateTimeFormat('en-US', options).format(time);
    if (time == 0) {
      finish(false);
      clearInterval(countDown);
    }
  };
  tick();
  countDown = setInterval(tick, 1000);
  return countDown;
};
timer();
