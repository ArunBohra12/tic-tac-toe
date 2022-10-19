const tiles = document.querySelectorAll(".tile")!;
const announcer = document.querySelector(".announcer")!;
const resetBtn = document.getElementById("reset")!;

const winningConditions: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let playerGrid: string[] = Array(8);

let isGameActive: boolean = true;
let totalTurns: number = 1;
let currentPlayer: string = "x";

// ---------------------------------------------
// Game

tiles.forEach(function (tile, i) {
  tile.addEventListener("click", () => playChance(i));
});

resetBtn.addEventListener("click", resetGame);

// ---------------------------------------------
// Functions

function displayPlayersTurn(player: string): void {
  const playerTurnEl = document.querySelector(".display-player")!;

  if (player === "x") {
    playerTurnEl.classList.remove("player-o");
    playerTurnEl.classList.add("player-x");
  }

  if (player === "o") {
    playerTurnEl.classList.remove("player-x");
    playerTurnEl.classList.add("player-o");
  }

  playerTurnEl.textContent = player;
}

function togglePlayer(player: string): void {
  currentPlayer = player === "x" ? "o" : "x";
  displayPlayersTurn(currentPlayer);
}

function setPlayerMark(tileIndex: number, player: string) {
  playerGrid[tileIndex] = player;
  tiles[tileIndex].textContent = player;
  tiles[tileIndex].classList.add(`player-${player}`);
}

function playChance(index: number): void {
  if (!isGameActive) return;
  if (playerGrid[index]) return;

  setPlayerMark(index, currentPlayer);
  const winner = checkWinner(totalTurns);

  if (winner !== "") {
    isGameActive = false;
    anounceResult(winner);
    return;
  }

  togglePlayer(currentPlayer);

  totalTurns++;
}

function checkWinner(turnsPlayed: number): string {
  if (totalTurns < 5) return "";

  let winner: string = "";

  for (const condition of winningConditions) {
    const [firstCond, secondCond, thirdCond] = condition;

    if (
      playerGrid[firstCond] === playerGrid[secondCond] &&
      playerGrid[firstCond] === playerGrid[thirdCond]
    ) {
      winner = playerGrid[firstCond];
      break;
    }
  }

  if (!winner && turnsPlayed === 9) return "draw";

  if (winner) return winner;

  return "";
}

function anounceResult(result: string = "draw"): void {
  switch (result) {
    case "draw":
      announcer.innerHTML = "🤝 DRAW 🤝";
      break;

    case "x":
      announcer.innerHTML = 'Player <span class="player-x">X</span> Won! 🎉';
      break;

    case "o":
      announcer.innerHTML = 'Player <span class="player-o">O</span> Won! 🎉';
      break;
  }
}

function resetGame() {
  playerGrid = Array(8);
  isGameActive = true;
  totalTurns = 1;
  currentPlayer = "x";
  announcer.innerHTML = "";

  displayPlayersTurn(currentPlayer);

  tiles.forEach(function (tile) {
    tile.className = "tile";
    tile.innerHTML = "";
  });
}

// Just to make the file a module
export {};
