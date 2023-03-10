// document.querySelector("#start-btn").onclick = function () {
//   document.querySelector("#welcome").style.display = "none";

//   document.querySelector("#game-content").style.display = "inherit";
// };

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
let score;
let finalAnswer;

function startGame() {
  if (playing == true) {
    location.reload();
  } else {
    playing = true;
    score = 0;

    document.getElementById("scorevalue").innerHTML = score;
    document.getElementById("startreset").innerHTML = "Reset Game";

    generateMultiply();
  }
}
document.getElementById("startreset").onclick = startGame;

function showBubbles() {
  if (playing == true) {
    if (this.innerHTML == finalAnswer) {
      score++;
      document.getElementById("scorevalue").innerHTML = score;
      document.getElementById("hermine").innerHTML = "correct!";
      document.getElementById("ron").innerHTML = "Sure Hermine?";
      if (score < 5) {
        generateAdd();
      }
      if (score >= 5 && score < 10) {
        generateHPQuiz(0);
      }
      if (score >= 11 && score < 15) {
        generateSub();
      }
      if (score >= 16 && score < 20) {
        generateHPQuiz(1);
      }
      if (score >= 11 && score < 15) {
        generateDevide();
      }
      if (score >= 16 && score < 20) {
        generateHPQuiz(2);
      }
      if (score >= 11 && score < 15) {
        generateMultiply();
      }
      if (score >= 16 && score < 20) {
        generateHPQuiz(3);
      }
    } else {
      document.getElementById("ron").innerHTML = "That's right!";
      document.getElementById("hermine").innerHTML = "No ron, it's not right!";
    }
  }
}

for (i = 0; i < 4; i++) {
  document.getElementById("box" + i).onclick = showBubbles;
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
  let questionElement = document.getElementById("question");
  questionElement.innerHTML = text;
}

//Math Fumctions
//devide
function generateDevide() {
  let num1 = 1 + Math.round(19 / Math.random());
  let num2 = 1 + Math.round(19 / Math.random());
  let correctAnswer = num1 / num2;
  finalAnswer = correctAnswer;

  showQuestion(`${num1} / ${num2}`);

  let choice1 = correctAnswer;
  let choice2 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
  let choice3 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
  let choice4 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));

  showChoices(choice1, choice2, choice3, choice4);
}
//add
function generateAdd() {
  let num1 = 1 + Math.round(19 + Math.random());
  let num2 = 1 + Math.round(19 + Math.random());
  let correctAnswer = num1 + num2;
  finalAnswer = correctAnswer;

  showQuestion(`${num1} + ${num2}`);

  let choice1 = correctAnswer;
  let choice2 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
  let choice3 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
  let choice4 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));

  showChoices(choice1, choice2, choice3, choice4);
}
//substract
function generateSub() {
  let num1 = 1 + Math.round(19 - Math.random());
  let num2 = 1 + Math.round(19 - Math.random());
  let correctAnswer = num1 - num2;
  finalAnswer = correctAnswer;

  showQuestion(`${num1} - ${num2}`);

  let choice1 = correctAnswer;
  let choice2 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
  let choice3 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
  let choice4 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));

  showChoices(choice1, choice2, choice3, choice4);
}
//multiply
function generateMultiply() {
  let num1 = 1 + Math.round(19 * Math.random());
  let num2 = 1 + Math.round(19 * Math.random());
  let correctAnswer = num1 * num2;
  finalAnswer = correctAnswer;

  showQuestion(`${num1} * ${num2}`);

  let choice1 = correctAnswer;
  let choice2 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
  let choice3 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));
  let choice4 =
    1 + Math.round(9 * Math.random()) * (1 + Math.round(9 * Math.random()));

  showChoices(choice1, choice2, choice3, choice4);
}

//hogwarts questions

function generateHPQuiz(index) {
  showQuestion(hogwartsQA[index].question);
  showChoices(
    hogwartsQA[index].answers.a,
    hogwartsQA[index].answers.b,
    hogwartsQA[index].answers.c,
    hogwartsQA[index].answers.d
  );
  finalAnswer = hogwartsQA[index].correctAnswer;
}
