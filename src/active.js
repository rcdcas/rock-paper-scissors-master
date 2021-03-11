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

function rulesCloseHandler() {
  // hidde rules
  rulesPopup.classList.remove('rules__popup--click');
  setTimeout(() => rulesPopup.classList.remove('rules__popup--grid'), 300);

  // hidde backdrop
  backdrop.classList.remove('backdrop--click');
  setTimeout(() => backdrop.classList.remove('backdrop--block'), 300);
}
function houseSelection() {
  // return string for add class to house button

  let randomSelection = Math.random();
  if (randomSelection < 0.33) {
    return 'rock';
  } else if (randomSelection < 0.66) {
    return 'paper';
  } else {
    return 'scissors';
  }
}
function battleWinner(youPicked, housePicked) {
  // get winner, update score and update localstore
  // return position needed for display battle result

  if (youPicked == housePicked) {
    return 0;
  } else if (
    (youPicked == 'rock' && housePicked == 'scissors') ||
    (youPicked == 'paper' && housePicked == 'rock') ||
    (youPicked == 'scissors' && housePicked == 'paper')
  ) {
    // needed for string + int problem, coercion
    score.textContent = +score.textContent + 1;
    localStorage.setItem('score', +score.textContent);
    return 1;
  } else {
    // needed for string + int problem, coercion
    // ternary operation for prevent negative score
    score.textContent =
      +score.textContent == 0 ? +score.textContent : +score.textContent - 1;
    localStorage.setItem('score', +score.textContent);
    return 2;
  }
}

function startActionHandler(event) {
  if (event.target.closest('.action__button')) {
    console.log(
      event.target.closest('.action__button').childNodes[1].classList[1]
    );
    // display result
    action.classList.add('action--opacity');
    setTimeout(() => action.classList.add('action--click'), 300);

    battle.classList.add('battle--click');
    setTimeout(() => battle.classList.add('battle--opacity'), 600);

    // on battle div
    // you picked
    youPicked.classList.add(
      `${event.target.closest('.action__button').classList[1]}`
    );

    // clone svg base on class position
    let youSelectedSvgClone = event.target
      .closest('.action__button')
      .childNodes[1].cloneNode(true);
    youPicked.append(youSelectedSvgClone);

    // house picked

    let houseSelectionResult = houseSelection();
    housePicked.classList.add(`action__button--${houseSelectionResult}`);
    // clone svg base on svg class
    let houseSelectedSvgClone = document
      .querySelector(`.${houseSelectionResult}`)
      .cloneNode(true);
    housePicked.append(houseSelectedSvgClone);

    // battle winner
    let youSelection = event.target.closest('.action__button').childNodes[1]
      .classList[1];
    // applying class --active to one off three h1 for loss, win or draw
    battleResult[
      battleWinner(youSelection, houseSelectionResult)
    ].classList.add('battle__result--active');
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
function getStoreScoreInt() {
  score.textContent = localStorage.getItem('score')
    ? +localStorage.getItem('score')
    : 0;
}

rulesBtn.addEventListener('click', rulesActivatorHandler);
backdrop.addEventListener('click', rulesCloseHandler);

rulesCloseBtn.forEach((item) =>
  item.addEventListener('click', rulesCloseHandler)
);
action.addEventListener('click', startActionHandler);
playAgainBtn.addEventListener('click', playAgainHandler);

window.onload = getStoreScoreInt;
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
