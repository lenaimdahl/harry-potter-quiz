let speedX = 4.5;
let speedY = 6.6;

let snitch = { x: 0, y: 0 };

function preload() {
  imgSnitch = loadImage("../images/snitch.png");
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0, "fixed");

  snitch.x = width / 2;
  snitch.y = height / 2;
}

function draw() {
  clear();
  background("rgba(255,255,255, 0)");
  image(imgSnitch, snitch.x, snitch.y, 40, 40);

  snitch.x = snitch.x + random(-speedX, speedX);
  snitch.y = snitch.y + random(-speedY, speedY);
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
        document.getElementById("pippi").innerHTML = "Sure Hermine?";
      } else {
        document.getElementById("pippi").innerHTML = "That's right!";
        document.getElementById("hermine").innerHTML =
          "No Pippi, it's not right!";
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
