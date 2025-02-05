const symbols = ['♥', '♦', '♣', '♠', '★', '☆', '■', '□'];
const gameBoard = document.getElementById('game-board');
const turnsDisplay = document.getElementById('turns');
const restartBtn = document.getElementById('restart-btn');
let cards = [];
let flippedCards = [];
let matchedCards = [];
let turns = 0;

// Функция для создания карты
function createCard(symbol, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.dataset.index = index;

  card.addEventListener('click', () => onCardClick(card));

  return card;
}

// Функция для обновления отображения хода
function updateTurns() {
  turnsDisplay.textContent = turns;
}

// Функция для переворота карт
function flipCard(card) {
  card.classList.add('flipped');
  card.textContent = card.dataset.symbol;
}

// Функция для скрытия карт
function unflipCards() {
  flippedCards.forEach(card => {
    card.classList.remove('flipped');
    card.textContent = '';
  });
  flippedCards = [];
}

// Обработчик клика по карте
function onCardClick(card) {
  if (flippedCards.length === 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }

  flipCard(card);
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    turns++;
    updateTurns();

    const [firstCard, secondCard] = flippedCards;
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      matchedCards.push(firstCard, secondCard);

      if (matchedCards.length === cards.length) {
        alert('Поздравляем, вы выиграли!');
      }
      flippedCards = [];
    } else {
      setTimeout(() => {
        unflipCards();
      }, 1000);
    }
  }
}

// Функция для перезапуска игры
function restartGame() {
  cards = [];
  flippedCards = [];
  matchedCards = [];
  turns = 0;
  updateTurns();
  gameBoard.innerHTML = '';
  initializeGame();
}

// Функция для инициализации игры
function initializeGame() {
  const shuffledSymbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5);

  shuffledSymbols.forEach((symbol, index) => {
    const card = createCard(symbol, index);
    gameBoard.appendChild(card);
    cards.push(card);
  });
}

// Начальная инициализация игры
initializeGame();

// Обработчик для кнопки "Начать заново"
restartBtn.addEventListener('click', restartGame);
