// Load score safely from localStorage
let score;

try {
  score = JSON.parse(localStorage.getItem('score'));
} catch (error) {
  score = null;
}

// If no score found, initialize
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  updateScoreElement();
});

// Main game function
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {
      result = 'You win.';
    }
  }

  // Update score
  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else {
    score.ties++;
  }

  // Save to localStorage
  localStorage.setItem('score', JSON.stringify(score));

  // Update UI
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `
    You 
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;
}

// Update score display
function updateScoreElement() {
  const scoreElement = document.querySelector('.js-score');
  if (scoreElement) {
    scoreElement.innerHTML = `
      Wins: ${score.wins}, 
      Losses: ${score.losses}, 
      Ties: ${score.ties}
    `;
  }
}

// Random computer move
function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return 'rock';
  } else if (randomNumber < 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// Reset score (optional feature)
function resetScore() {
  score = { wins: 0, losses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScoreElement();
}