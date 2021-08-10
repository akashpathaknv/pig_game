'use strict';

//Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let current = 0;
const scores = [0, 0];
let activePlayer = 0;
let playing = true;

const resetCondition = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  current = 0;
  scores[0] = 0;
  scores[1] = 0;
  activePlayer = 0;
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
};

const switchPlayer = function () {
  current = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};
//Rolling Dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //display the generated dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check if the value on dice is 1, if so then change the player

    if (dice !== 1) {
      //add the value to current
      current += dice;
      document.getElementById(`current--${activePlayer}`).textContent = current;
    } else {
      //change the player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //add current score to active player's score
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if players score is greater than or equal to 100
    if (scores[activePlayer] >= 20) {
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  resetCondition();
});
