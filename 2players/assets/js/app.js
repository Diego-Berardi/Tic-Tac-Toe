const boxs_div = document.querySelectorAll(".box");
const xUser_span = document.querySelector(".x-num-win");
const oUser_span = document.querySelector(".o-num-win");

const replayMenu_div = document.querySelector(".replay-menu");
const reset_button = document.querySelector(".replay-btn");
const resultText_p = document.querySelector(".result-text");

let index = 0;
let xUser = 0;
let oUser = 0;

const endGame = (user) => {
  if (user === "x") {
    xUser_span.textContent = ++xUser;
    resultText_p.textContent = "x win";
    replayMenu_div.classList.remove("lose-bg-color");
    replayMenu_div.classList.add("win-bg-color");
  }
  if (user === "o") {
    oUser_span.textContent = ++oUser;
    resultText_p.textContent = "o win";
    replayMenu_div.classList.remove("win-bg-color");
    replayMenu_div.classList.add("lose-bg-color");
  }
  if (user === "n") {
    resultText_p.textContent = "No winner";
    replayMenu_div.classList.remove("lose-bg-color");
    replayMenu_div.classList.remove("win-bg-color");
  }

  replayMenu_div.classList.add("show-menu");
};

const checkIfEnd = () => {
  let sum = 0;
  boxs_div.forEach((e) => {
    if (e.textContent !== "") sum++;
  });

  if (sum === boxs_div.length) endGame("n");
};

const checkWin = () => {
  boxs_div.forEach((elem, i) => {
    if (elem.textContent === "") return;
    if (
      (i === 0 || i === 3 || i === 6) &&
      elem.textContent === boxs_div[i + 1].textContent &&
      elem.textContent === boxs_div[i + 2].textContent
    )
      endGame(elem.textContent);
    if (
      i < 3 &&
      elem.textContent === boxs_div[i + 3].textContent &&
      elem.textContent === boxs_div[i + 6].textContent
    )
      endGame(elem.textContent);
    if (
      i === 0 &&
      elem.textContent === boxs_div[4].textContent &&
      elem.textContent === boxs_div[8].textContent
    )
      endGame(elem.textContent);
    if (
      i === 2 &&
      elem.textContent === boxs_div[4].textContent &&
      elem.textContent === boxs_div[6].textContent
    )
      endGame(elem.textContent);
  });
};

const handleClick = (e) => {
  if (e.target.textContent !== "") return;
  if (index % 2 === 0) {
    e.target.textContent = "x";
  } else {
    e.target.textContent = "o";
  }
  index++;
  checkWin();
  checkIfEnd();
};

const resetBoard = () => {
  boxs_div.forEach((e) => (e.textContent = ""));
  index = 0;
  replayMenu_div.classList.remove("show-menu");
};

boxs_div.forEach((elem) => elem.addEventListener("click", handleClick));
reset_button.addEventListener("click", resetBoard);
