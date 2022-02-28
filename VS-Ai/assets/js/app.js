const boxs_div = document.querySelectorAll(".box");
const xUser_span = document.querySelector(".x-num-win");
const oUser_span = document.querySelector(".o-num-win");

const replayMenu_div = document.querySelector(".replay-menu");
const resultText_p = document.querySelector(".result-text");
const replayBtn_button = document.querySelector(".replay-btn");

const huPlayer = "X";
const AiPlayer = "O";

let gameState = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const currentBoard = () => {
  return Array.from(boxs_div).map((elem) => {
    const { textContent, id } = elem;
    return { textContent, id };
  });
};

const gameOver = ({ winCombo, player }) => {
  gameState = false;
  if (winCombo) {
    winCombo.forEach((elem) => {
      boxs_div[elem].classList.add("win-bg-color");
    });
    resultText_p.textContent = player == huPlayer ? "You win" : "You lose";
    if (player == huPlayer) xUser_span.textContent++;
    else oUser_span.textContent++;
  } else {
    resultText_p.textContent = "No winner";
  }
  replayMenu_div.classList.add("show-menu");
};

const checkWin = (board, player) => {
  const plays = board.reduce((a, elem, i) => {
    if (elem.textContent === player) return a.concat(i);
    else return a;
  }, []);

  let somma = 0;
  for (let i = 0; i < winCombos.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (plays.includes(winCombos[i][j])) somma++;
      if (somma >= 3) return { winCombo: winCombos[i], player: player };
    }
    somma = 0;
  }
  return null;
};

const draw = (id, player) => {
  boxs_div[id].textContent = player;
};

const aviableSpot = (board) => {
  return board.filter((elem) => elem.textContent === "").map((elem) => elem.id);
};

const minMaxAlgorithm = (newBoard, player) => {
  const availSpots = aviableSpot(newBoard);

  if (checkWin(newBoard, huPlayer)) return { score: -10 };
  if (checkWin(newBoard, AiPlayer)) return { score: 10 };
  if (availSpots.length === 0) return { score: 0 };

  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]].id;
    newBoard[availSpots[i]].textContent = player;

    if (player == AiPlayer) {
      const result = minMaxAlgorithm(newBoard, huPlayer);
      move.score = result.score;
    } else {
      const result = minMaxAlgorithm(newBoard, AiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]].textContent = "";

    moves.push(move);
  }
  let bestMove;

  if (player === AiPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
};

const AiChoose = () => {
  const prova = minMaxAlgorithm(currentBoard(), AiPlayer);
  return prova.index;
};

const checkEnd = (board) => {
  if (aviableSpot(board).length === 0) return true;
  return false;
};

const handleClick = (e) => {
  if (!gameState) return;
  if (e.target.textContent !== "") return;
  draw(e.target.id, huPlayer);
  const huResult = checkWin(currentBoard(), huPlayer);
  if (huResult) {
    gameOver(huResult);
    return;
  }

  if (checkEnd(currentBoard())) {
    gameOver({ winCombo: false, player: null });
    return;
  }
  draw(AiChoose(), AiPlayer);
  const AiResult = checkWin(currentBoard(), AiPlayer);
  if (AiResult) gameOver(AiResult);
};

const replayGame = () => {
  gameState = true;
  boxs_div.forEach((elem) => {
    elem.textContent = "";
    elem.classList.remove("win-bg-color");
  });
  replayMenu_div.classList.remove("show-menu");
};

boxs_div.forEach((elem) => elem.addEventListener("click", handleClick));
replayBtn_button.addEventListener("click", replayGame);
