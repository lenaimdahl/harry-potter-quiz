// adding Level

class level {
  constructor(color, x, y) {
    this.color = color;
    this.x = x;
    this.y = y;
  }

  display() {
    // method!
    fill(this.color);
    circle(this.x, this.y, 20);
  }
}

let circle1;
let circle2;
let circle3;
let circle4;
let circle5;

//calculate

function preload() {
  imgBackground = loadImage("../images/Background-yellow.avif");
}

function setup() {
  const gameBoard = createCanvas(350, 50);
  gameBoard.position(360, 470);

  circle1 = new level("#c94c4c", 160, 20, 50);
  circle2 = new level("#c94c4c", 190, 20, 50);
  circle3 = new level("#c94c4c", 220, 20, 50);
  circle4 = new level("#c94c4c", 250, 20, 50);
  circle5 = new level("#c94c4c", 280, 20, 50);
}

function draw() {
  background(250);
  image(imgBackground, 0, 0, 700, 700);

  circle1.display();
  circle2.display();
  circle3.display();
  circle4.display();
  circle5.display();

  textSize(30);
  fill("#588c7e");
  text("Level:", 20, 30);
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
