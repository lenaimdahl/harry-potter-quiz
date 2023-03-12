//enter first page

document.querySelector("#reveal-btn").onclick = function () {
  document.querySelector("#beginning").style.display = "none";
  document.querySelector("#welcome").style.display = "flex";
  document.querySelector("#enter-btn").style.display = "inherit";

  let song = document.getElementById("mySong");
  song.play();
};

//enter game

document.querySelector("#enter-btn").onclick = function () {
  document.querySelector("#enter-btn").style.display = "none";
  document.querySelector("#welcome").style.display = "none";
  document.querySelector("canvas").style.display = "inherit";
  document.querySelector("#game-content").style.display = "flex";
};
//credits open
document.querySelector("#credits-open-btn").onclick = function () {
  document.querySelector(".credits").style.display = "inherit";
  document.querySelector("#credits-open-btn").style.display = "none";
  document.querySelector("#credits-close-btn").style.display = "inherit";
};
//credits close
document.querySelector("#credits-close-btn").onclick = function () {
  document.querySelector(".credits").style.display = "none";
  document.querySelector("#credits-close-btn").style.display = "none";
  document.querySelector("#credits-open-btn").style.display = "inherit";
};
// obj p5.js

let speedX = 2.5;
let speedY = 2.6;

let snitch = { x: 0, y: 0 };
let key = { x: 0, y: 0 };

function preload() {
  imgSnitch = loadImage("images/snitch.png");
  key1 = loadImage("images/key1.png");
  key2 = loadImage("images/key2.png");
  key3 = loadImage("images/key3.png");
}
function setup() {
  let canvas = createCanvas(windowWidth, 400);
  canvas.position(0, 0, "fixed");

  snitch.x = 350;
  snitch.y = 200;

  key1.x = 250;
  key1.y = 100;

  key2.x = 550;
  key2.y = 200;

  key3.x = 700;
  key3.y = 60;
}

function draw() {
  clear();
  background("rgba(255,255,255, 0)");

  snitch.x = constrain(snitch.x, 10, 700);
  snitch.y = constrain(snitch.y, 10, 400);

  key1.x = constrain(key1.x, 10, 700);
  key1.y = constrain(key1.y, 10, 300);

  key2.x = constrain(key2.x, 10, 700);
  key2.y = constrain(key2.y, 10, 300);

  key3.x = constrain(key3.x, 10, 700);
  key3.y = constrain(key3.y, 10, 300);

  image(imgSnitch, snitch.x, snitch.y, 50, 50);
  image(key1, key1.x, key1.y, 50, 50);
  image(key2, key2.x, key2.y, 50, 50);
  image(key3, key3.x, key3.y, 50, 50);

  snitch.x = snitch.x + random(-speedX, speedX);
  snitch.y = snitch.y + random(-speedY, speedY);

  key1.x = key1.x + random(-speedX, speedX) * 3;
  key1.y = key1.y + random(-speedY, speedY) * 2;

  key2.x = key2.x + random(-speedX, speedX) * 2;
  key2.y = key2.y + random(-speedY, speedY) * 1;

  key3.x = key3.x + random(-speedX, speedX) * 3;
  key3.y = key3.y + random(-speedY, speedY) * 1;
}

// set up game questions
let playing = false;
let score = 0;
let chance = 10;
let finalAnswer;
let level = 1;
let HPQuizIndex = 0;
let timeremaining;
let timer;

// create random number
function createRandomNum(min = 1, max = 19) {
  return min + Math.round(max * Math.random());
}

//start the game
function startGame() {
  if (playing == true) {
    location.reload();
  } else {
    playing = true;
    score = 0;

    document.getElementById("scorevalue").innerHTML = score;
    document.getElementById("startreset").innerHTML = "Reset Game";

    generateAdd();
    startCountdown();
  }
}
document.getElementById("startreset").onclick = startGame;

// level

function createLevel() {
  const oldLevel = level;
  if (score === 10) {
    level = 2;
  }
  if (score === 20) {
    level = 3;
  }
  if (score === 30) {
    level = 4;
  }
  if (score === 40) {
    level = 5;
  }

  document.querySelector("#levelvalue").innerHTML = level;
  if (level > oldLevel) {
    document.querySelector("#level-text").innerHTML =
      "You reached a new Level!";
  }
}

function startCountdown() {
  timeremaining = 30;
  document.querySelector("#timeremaining").style.display = "inherit";
  document.getElementById("timeremainingvalue").innerHTML = timeremaining;

  timer = setInterval(() => {
    timeremaining -= 1;

    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    if (timeremaining === 0) {
      stopCountdown();
      document.querySelector("#question-text").style.display = "none";
      document.querySelector("#game-over").style.display = "inherit";
    }
    if (chance === 0) {
      stopCountdown();
      document.querySelector("#question-text").style.display = "none";
      document.querySelector("#game-over").style.display = "inherit";
    }
  }, 1000);
}

function stopCountdown() {
  clearInterval(timer);
}

function resetCountdown() {
  stopCountdown();
  startCountdown();
}

function finishGame() {
  document.body.style.backgroundImage = `url("../images/Chamber Kopie.jpg")`;
  document.querySelector("canvas").style.display = "none";
  document.querySelector(".activity-field").style.display = "none";

  let textEndingGame = document.querySelector(".heading");
  textEndingGame.innerHTML = "You entered the Chamber of Secrets";
  textEndingGame.style.fontSize = "40pt";
  textEndingGame.style.marginTop = "500px";

  stopCountdown();

  document.getElementById("hermine").innerHTML = "Congrats. You did it!";
  document.getElementById("ron").innerHTML = "Thank you!";
}

function checkAnswer() {
  if (playing == true) {
    if (this.innerHTML == finalAnswer) {
      score++;
      document.querySelector("#level-text").innerHTML = "";
      document.getElementById("scorevalue").innerHTML = score;
      document.getElementById("hermine").innerHTML = "correct!";
      document.getElementById("ron").innerHTML = "Sure Hermine?";

      createLevel();

      if (score < 5) {
        generateAdd();
      }
      if (score >= 5 && score < 10) {
        generateHPQuiz();
      }
      if (score >= 10 && score < 15) {
        generateSub();
      }
      if (score >= 15 && score < 20) {
        generateHPQuiz();
      }
      if (score >= 20 && score < 25) {
        generateMultiply();
      }
      if (score >= 25 && score < 30) {
        generateHPQuiz();
      }
      if (score >= 30 && score < 35) {
        generatePlusMinus();
      }
      if (score >= 35 && score < 40) {
        generateHPQuiz();
      }
      if (score === 40) {
        finishGame();
      } else {
        resetCountdown();
      }
    } else {
      chance--;
      document.querySelector("#chancevalue").innerHTML = chance;
      document.getElementById("ron").innerHTML = "That's right!";
      document.getElementById("hermine").innerHTML = "No ron, it's not right!";
    }
  }
}

for (i = 0; i < 4; i++) {
  document.getElementById("box" + i).onclick = checkAnswer;
}

function showChoices(correctAnswer, choice2, choice3, choice4) {
  let boxes = [];

  for (i = 0; i < 4; i++) {
    let boxId;
    do {
      boxId = Math.round(3 * Math.random());
    } while (boxes.includes(boxId));

    boxes.push(boxId);
  }

  let box0 = document.querySelector(`#box${boxes[0]}`);
  box0.innerHTML = correctAnswer;

  let box1 = document.querySelector(`#box${boxes[1]}`);
  box1.innerHTML = choice2;

  let box2 = document.querySelector(`#box${boxes[2]}`);
  box2.innerHTML = choice3;

  let box3 = document.querySelector(`#box${boxes[3]}`);
  box3.innerHTML = choice4;
}

function showQuestion(text) {
  let questionElement = document.getElementById("question-text");
  questionElement.innerHTML = text;
}

//Math Fumctions
//divide
function generatePlusMinus() {
  setChoicesStyle();
  setQuestionStyle();
  let num1 = createRandomNum();
  let num2 = createRandomNum();
  let num3 = createRandomNum();
  let correctAnswer = num1 + num2 * num3;
  finalAnswer = correctAnswer;

  showQuestion(`${num1} + ${num2} * ${num3}`);

  let choice1 = correctAnswer;
  let choice2 = createRandomNum() + createRandomNum() * createRandomNum();
  let choice3 = createRandomNum() + createRandomNum() * createRandomNum();
  let choice4 = createRandomNum() + createRandomNum() * createRandomNum();

  showChoices(choice1, choice2, choice3, choice4);
}
//add
function generateAdd() {
  setChoicesStyle();
  setQuestionStyle();
  let num1 = createRandomNum(1, 99);
  let num2 = createRandomNum(1, 99);
  let correctAnswer = num1 + num2;
  finalAnswer = correctAnswer;

  showQuestion(`${num1} + ${num2}`);

  let choice1 = correctAnswer;
  let choice2 = createRandomNum(1, 99) + createRandomNum(1, 99);
  let choice3 = createRandomNum(1, 99) + createRandomNum(1, 99);
  let choice4 = createRandomNum(1, 99) + createRandomNum(1, 99);

  showChoices(choice1, choice2, choice3, choice4);
}
//substract
function generateSub() {
  setChoicesStyle();
  setQuestionStyle();
  let num1 = createRandomNum(1, 99);
  let num2 = createRandomNum(1, 99);

  let correctAnswer = num1 - num2;
  finalAnswer = correctAnswer;

  showQuestion(`${num1} - ${num2}`);

  let choice1 = correctAnswer;
  let choice2 = createRandomNum(1, 99) - createRandomNum(1, 99);
  let choice3 = createRandomNum(1, 99) - createRandomNum(1, 99);
  let choice4 = createRandomNum(1, 99) - createRandomNum(1, 99);

  showChoices(choice1, choice2, choice3, choice4);
}
//multiply
function generateMultiply() {
  setChoicesStyle();
  setQuestionStyle();
  let num1 = createRandomNum();
  let num2 = createRandomNum();
  let correctAnswer = num1 * num2;
  finalAnswer = correctAnswer;

  showQuestion(`${num1} * ${num2}`);

  let choice1 = correctAnswer;
  let choice2 = createRandomNum() * createRandomNum();
  let choice3 = createRandomNum() * createRandomNum();
  let choice4 = createRandomNum() * createRandomNum();

  showChoices(choice1, choice2, choice3, choice4);
}

//hogwarts questions
function setQuestionStyle(size = "40pt") {
  document.querySelector("#question-text").style.fontSize = size;
}
function setChoicesStyle(size = "30pt") {
  for (let i = 0; i < 4; i++) {
    document.querySelector(`#box${i}`).style.fontSize = size;
  }
}

function generateHPQuiz() {
  setChoicesStyle("17pt");
  setQuestionStyle("25pt");
  showQuestion(hogwartsQA[HPQuizIndex].question);
  showChoices(
    hogwartsQA[HPQuizIndex].answers.a,
    hogwartsQA[HPQuizIndex].answers.b,
    hogwartsQA[HPQuizIndex].answers.c,
    hogwartsQA[HPQuizIndex].answers.d
  );
  finalAnswer = hogwartsQA[HPQuizIndex].correctAnswer;
  HPQuizIndex++;
}
