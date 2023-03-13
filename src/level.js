//enter intro of game
document.querySelector("#reveal-btn").onclick = function () {
  document.querySelector("#dark").style.display = "block";
  document.querySelector("#beginning").style.display = "none";
  document.querySelector("#welcome").style.display = "flex";
  document.querySelector("#enter-btn").style.display = "inherit";

  let song = document.getElementById("mySong");
  song.play();
};

//enter the game
document.querySelector("#enter-btn").onclick = function () {
  document.querySelector("#enter-btn").style.display = "none";
  document.querySelector("#welcome").style.display = "none";
  document.querySelector("canvas").style.display = "inherit";
  document.querySelector("#game-content").style.display = "flex";
  document.body.style.backgroundImage = `url("./images/hall.jpg")`;
};

//disclaimer open
document.querySelector("#disclaimer-open-btn").onclick = function () {
  document.querySelector(".disclaimer").style.display = "inherit";
  document.querySelector("#disclaimer-open-btn").style.display = "none";
  document.querySelector("#disclaimer-close-btn").style.display = "inherit";
};
//disclaimer close
document.querySelector("#disclaimer-close-btn").onclick = function () {
  document.querySelector(".disclaimer").style.display = "none";
  document.querySelector("#disclaimer-close-btn").style.display = "none";
  document.querySelector("#disclaimer-open-btn").style.display = "inherit";
};

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
  document.body.style.backgroundImage = `url("../images/chamber_end.jpg")`;
  document.querySelector("canvas").style.display = "none";
  document.querySelector(".activity-field").style.display = "none";

  let textEndingGame = document.querySelector(".heading");
  textEndingGame.innerHTML = "You entered the Chamber of Secrets";
  textEndingGame.style.fontSize = "40pt";
  textEndingGame.style.marginTop = "100px";
  document.querySelector(".question-extra").style.display = "flex";
  document.querySelector("#more-QA-btn").style.display = "flex";

  stopCountdown();

  document.getElementById("hermione").innerHTML = "Congrats. You did it!";
  document.getElementById("ron").innerHTML = "Good Luck!";
}

function checkAnswer() {
  if (playing == true) {
    if (this.innerHTML == finalAnswer) {
      score++;
      document.querySelector("#level-text").innerHTML = "";
      document.getElementById("scorevalue").innerHTML = score;
      document.getElementById("hermione").innerHTML = "correct!";
      document.getElementById("ron").innerHTML = "Sure Hermione?";

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
      document.getElementById("hermione").innerHTML =
        "No, Ron, that's not right!";
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

// obj p5.js

let speedX = 2.5;
let speedY = 2.6;

let imgSnitch;
let key1 = { x: 0, y: 0 };
let key2 = { x: 0, y: 0 };
let key3 = { x: 0, y: 0 };
let key4 = { x: 0, y: 0 };
let key5 = { x: 0, y: 0 };
let key6 = { x: 0, y: 0 };
let key7 = { x: 0, y: 0 };
let key8 = { x: 0, y: 0 };
let key9 = { x: 0, y: 0 };
let snitch = { x: 0, y: 0 };

function preload() {
  imgSnitch = loadImage("images/snitch.png");
  key1 = loadImage("images/key1.png");
  key2 = loadImage("images/key2.png");
  key3 = loadImage("images/key3.png");
  key4 = loadImage("images/key1.png");
  key5 = loadImage("images/key2.png");
  key6 = loadImage("images/key3.png");
  key7 = loadImage("images/key1.png");
  key8 = loadImage("images/key2.png");
  key9 = loadImage("images/key3.png");
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0, "fixed");

  snitch.x = 350;
  snitch.y = 200;

  key1.x = 250;
  key1.y = 100;

  key2.x = 550;
  key2.y = 200;

  key3.x = 700;
  key3.y = 60;

  key4.x = 100;
  key4.y = 90;

  key5.x = 500;
  key5.y = 150;

  key6.x = 700;
  key6.y = 100;

  key7.x = 350;
  key7.y = 300;

  key8.x = 400;
  key8.y = 210;

  key9.x = 600;
  key9.y = 40;
}

function draw() {
  clear();
  background("rgba(255,255,255, 0)");

  snitch.x = constrain(snitch.x, 10, windowWidth - 10);
  snitch.y = constrain(snitch.y, 10, windowWidth - 10);
  key1.x = constrain(key1.x, 10, windowWidth - 10);
  key1.y = constrain(key1.y, 10, windowWidth - 10);
  key2.x = constrain(key2.x, 10, windowWidth - 10);
  key2.y = constrain(key2.y, 10, windowWidth - 10);
  key3.x = constrain(key3.x, 10, windowWidth - 10);
  key3.y = constrain(key3.y, 10, windowWidth - 10);
  key4.x = constrain(key4.x, 10, windowWidth - 10);
  key4.y = constrain(key4.y, 10, windowWidth - 10);
  key5.x = constrain(key5.x, 10, windowWidth - 10);
  key5.y = constrain(key5.y, 10, windowWidth - 10);
  key6.x = constrain(key6.x, 10, windowWidth - 10);
  key6.y = constrain(key6.y, 10, windowWidth - 10);
  key7.x = constrain(key7.x, 10, windowWidth - 10);
  key7.y = constrain(key7.y, 10, windowWidth - 10);
  key8.x = constrain(key8.x, 10, windowWidth - 10);
  key8.y = constrain(key8.y, 10, windowWidth - 10);
  key9.x = constrain(key9.x, 10, windowWidth - 10);
  key9.y = constrain(key9.y, 10, windowWidth - 10);

  image(imgSnitch, snitch.x, snitch.y, 50, 50);
  image(key1, key1.x, key1.y, 40, 40);
  image(key2, key2.x, key2.y, 40, 40);
  image(key3, key3.x, key3.y, 40, 40);
  image(key4, key4.x, key4.y, 40, 40);
  image(key5, key5.x, key5.y, 40, 40);
  image(key6, key6.x, key6.y, 40, 40);
  image(key7, key7.x, key7.y, 40, 40);
  image(key8, key8.x, key8.y, 40, 40);
  image(key9, key9.x, key9.y, 40, 40);

  snitch.x = snitch.x + random(-speedX, speedX);
  snitch.y = snitch.y + random(-speedY, speedY);

  key1.x = key1.x + random(-speedX, speedX) * 3;
  key1.y = key1.y + random(-speedY, speedY) * 2;

  key2.x = key2.x + random(-speedX, speedX) * 2;
  key2.y = key2.y + random(-speedY, speedY) * 1;

  key3.x = key3.x + random(-speedX, speedX) * 3;
  key3.y = key3.y + random(-speedY, speedY) * 1;

  key4.x = key4.x + random(-speedX, speedX) * 3;
  key4.y = key4.y + random(-speedY, speedY) * 1;

  key5.x = key5.x + random(-speedX, speedX) * 3;
  key5.y = key5.y + random(-speedY, speedY) * 1;

  key6.x = key6.x + random(-speedX, speedX) * 3;
  key6.y = key6.y + random(-speedY, speedY) * 1;

  key7.x = key7.x + random(-speedX, speedX) * 3;
  key7.y = key7.y + random(-speedY, speedY) * 1;

  key8.x = key8.x + random(-speedX, speedX) * 3;
  key8.y = key8.y + random(-speedY, speedY) * 1;

  key9.x = key9.x + random(-speedX, speedX) * 3;
  key9.y = key9.y + random(-speedY, speedY) * 1;
}
