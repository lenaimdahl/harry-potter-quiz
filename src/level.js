// obj p5js

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

// calculating
let playing = false;
let score;
let action;
let correctAnswer;

document.getElementById("startreset").onclick = function () {
  if (playing == true) {
    location.reload();
  } else {
    playing = true;
    score = 0;

    document.getElementById("startreset").innerHTML = "Reset Game";

    //generate quetion
    generateQA();
  }
};

for (i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    if (playing == true) {
      if (this.innerHTML == correctAnswer) {
        //increase score
        score++;
        document.getElementById("hermine").innerHTML = "correct!";
        document.getElementById("ron").innerHTML = "Sure Hermine?";
      } else {
        document.getElementById("ron").innerHTML = "That's right!";
        document.getElementById("hermine").innerHTML =
          "No ron, it's not right!";
      }
    }
  };
}

//guestion
function generateQA() {
  let x = 1 + Math.round(9 * Math.random());
  let y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;

  document.getElementById("question").innerHTML = x + "x" + y;
  let correctPosition = 1 + Math.round(3 * Math.random());

  document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //correct answer

  //wrong answers
  let answers = [correctAnswer];

  for (i = 1; i < 5; i++) {
    if (i != correctPosition) {
      let wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random())); //wrong answer
      } while (answers.indexOf(wrongAnswer) > -1);

      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
