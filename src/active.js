const rulesBtn = document.querySelector('.rules');
const backdrop = document.querySelector('.backdrop');
const rulesPopup = document.querySelector('.rules__popup');
const rulesCloseBtn = document.querySelectorAll('.burger');
const action = document.querySelector('.action');
const battle = document.querySelector('.battle');
const battleResult = document.querySelectorAll('.battle__result > h1');
const playAgainBtn = document.querySelector('.battle__result > button');
const youPicked = document.querySelector(
  '.battle > .battle__you > .action__button'
);
const housePicked = document.querySelector(
  '.battle > .battle__house > .action__button'
);
const score = document.querySelector('.score__player');

function rulesActivatorHandler() {
  // show backdrop
  backdrop.classList.add('backdrop--block');
  setTimeout(() => backdrop.classList.add('backdrop--click'), 20);

  // show rules
  rulesPopup.classList.add('rules__popup--grid');
  setTimeout(() => rulesPopup.classList.add('rules__popup--click'), 20);
}

function rulesClose() {
  // hidde rules
  rulesPopup.classList.remove('rules__popup--click');
  setTimeout(() => rulesPopup.classList.remove('rules__popup--grid'), 300);

  // hidde backdrop
  backdrop.classList.remove('backdrop--click');
  setTimeout(() => backdrop.classList.remove('backdrop--block'), 300);
}
function houseRandom() {
  let randomSelection = Math.random();
  if (randomSelection < 0.34) {
    return 'rock';
  } else if (randomSelection < 0.67) {
    return 'paper';
  } else {
    return 'scissors';
  }
}
function battleWinner(youPicked, housePicked) {
  // console.log(score.textContent);
  if (youPicked == housePicked) {
    return 0;
  } else if (
    (youPicked == 'rock' && housePicked == 'scissors') ||
    (youPicked == 'paper' && housePicked == 'rock') ||
    (youPicked == 'scissors' && housePicked == 'paper')
  ) {
    score.textContent = +score.textContent + 1;
    localStorage.setItem('score', +score.textContent);

    return 1;
  } else {
    score.textContent =
      +score.textContent == 0 ? +score.textContent : +score.textContent - 1;
    localStorage.setItem('score', +score.textContent);

    return 2;
  }
}

function actionHandler(event) {
  if (event.target.closest('.action__button')) {
    console.log(
      event.target.closest('.action__button').childNodes[1].classList[1]
    );

    action.classList.add('action--opacity');
    setTimeout(() => action.classList.add('action--click'), 300);

    battle.classList.add('battle--click');
    setTimeout(() => battle.classList.add('battle--opacity'), 600);

    // you picked

    youPicked.classList.add(
      `${event.target.closest('.action__button').classList[1]}`
    );
    let svgClone = event.target
      .closest('.action__button')
      .childNodes[1].cloneNode(true);
    youPicked.append(svgClone);

    // house picked

    let houseRandomResult = houseRandom();
    housePicked.classList.add(`action__button--${houseRandomResult}`);
    let houseClone = document
      .querySelector(`.${houseRandomResult}`)
      .cloneNode(true);
    housePicked.append(houseClone);

    // battle winner
    let you = event.target.closest('.action__button').childNodes[1]
      .classList[1];
    // console.log(battleWinner(you, houseRandomResult));
    battleResult[battleWinner(you, houseRandomResult)].classList.add(
      'battle__result--active'
    );
  }
}

function playAgainHandler() {
  battle.classList.remove('battle--opacity');
  setTimeout(() => battle.classList.remove('battle--click'), 300);

  action.classList.remove('action--click');
  setTimeout(() => action.classList.remove('action--opacity'), 600);

  // you picked
  setTimeout(() => {
    youPicked.classList.remove(
      'action__button--paper',
      'action__button--scissors',
      'action__button--rock'
    );
    housePicked.classList.remove(
      'action__button--paper',
      'action__button--scissors',
      'action__button--rock'
    );
    youPicked.innerHTML = '';
    housePicked.innerHTML = '';
    battleResult.forEach((item) =>
      item.classList.remove('battle__result--active')
    );
  }, 300);
}
function load() {
  console.log(localStorage.getItem('score'));
  score.textContent = localStorage.getItem('score')
    ? +localStorage.getItem('score')
    : 0;
}

rulesBtn.addEventListener('click', rulesActivatorHandler);
backdrop.addEventListener('click', rulesClose);

rulesCloseBtn.forEach((item) => item.addEventListener('click', rulesClose));
action.addEventListener('click', actionHandler);
playAgainBtn.addEventListener('click', playAgainHandler);

window.onload = load;
// const rootElement = document.querySelector('.foods');

// const foodData = [
//   {
//     id: 1,
//     image: '🌮',
//     name: 'taco',
//   },
//   {
//     id: 2,
//     image: '🍔',
//     name: 'burger',
//   },
//   {
//     id: 3,
//     image: '🍆',
//     name: 'eggplant',
//   },
//   {
//     id: 4,
//     image: '🍎',
//     name: 'apple',
//   },
//   {
//     id: 5,
//     image: '🥞',
//     name: 'pancakes',
//   },
// ];

// class Foods {
//   constructor(el, foodData) {
//     this._root = el;
//     this._data = foodData;
//   }

//   renderList() {
//     this._root.addEventListener('click', (event) => {
//       const { target } = event;
//       target.remove();
//     });

//     const fragment = document.createDocumentFragment();

//     this._data.forEach((item) =>
//       fragment.appendChild(this.createFoodItem(item))
//     );

//     this._root.appendChild(fragment);
//   }

//   createFoodItem(item) {
//     const itemEl = document.createElement('div');
//     itemEl.innerText = item.image;
//     itemEl.classList.add(item.name);

//     return itemEl;
//   }
// }

// const foods = new Foods(rootElement, foodData);

// foods.renderList();
