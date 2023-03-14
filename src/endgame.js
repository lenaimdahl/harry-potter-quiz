let answeredHPExtraQuestions = [];
let currentHPExtraQuestion;

// fight Endgame
document.querySelector("#more-QA-btn").onclick = function () {
  document.querySelector(".heading").style.display = "none";
  document.querySelector("#more-QA-btn").style.display = "none";
  document.querySelector("#endgame").style.display = "inherit";
  document.querySelector(".figure-1").style.display = "none";
  document.querySelector(".figure-2").style.display = "none";
};

//start the game
function startEndgame() {
  if (playing == true) {
    location.reload();
  } else {
    playing = true;
    score = 0;

    document.getElementById("startreset-endgame").innerHTML = "Reset Game";

    generateHPQuizEndgame();
  }
}
document.getElementById("startreset-endgame").onclick = startEndgame;

function finishEndgame() {
  let textEndgame = document.querySelector(".heading-endgame");
  textEndgame.innerHTML = "`We killed the monster! Congrats!";
  textEndgame.style.fontSize = "50pt";
  textEndgame.style.marginTop = "500pxpx";
  textEndgame.style.marginLeft = "400px";
  document.querySelector(".end-board").style.display = "none";
  document.querySelector("#soundeffect").src = "./music/endgame.wav";
  document.querySelector("#soundeffect").play();
}

function checkAnswerEndgame() {
  if (playing == true) {
    if (this.innerHTML == finalAnswer) {
      score++;
      answeredHPExtraQuestions.push(currentHPExtraQuestion);
      if (score === 5) {
        finishEndgame();
      } else {
        generateHPQuizEndgame();
      }
    }
  }
}

for (i = 0; i < 4; i++) {
  document.getElementById("box-endgame" + i).onclick = checkAnswerEndgame;
}

function showChoicesEndgame(correctAnswer, choice2, choice3, choice4) {
  let boxes = [];

  for (i = 0; i < 4; i++) {
    let boxId;
    do {
      boxId = Math.round(3 * Math.random());
    } while (boxes.includes(boxId));

    boxes.push(boxId);
  }

  let box0 = document.querySelector(`#box-endgame${boxes[0]}`);
  box0.innerHTML = correctAnswer;

  let box1 = document.querySelector(`#box-endgame${boxes[1]}`);
  box1.innerHTML = choice2;

  let box2 = document.querySelector(`#box-endgame${boxes[2]}`);
  box2.innerHTML = choice3;

  let box3 = document.querySelector(`#box-endgame${boxes[3]}`);
  box3.innerHTML = choice4;
}

function showQuestionEndgame(text) {
  let questionElement = document.getElementById("question-text-endgame");
  questionElement.innerHTML = text;
}

function setQuestionStyleEndgame(size = "40pt") {
  document.querySelector("#question-text-endgame").style.fontSize = size;
}
function setChoicesStyleEndgame(size = "30pt") {
  for (let i = 0; i < 4; i++) {
    document.querySelector(`#box-endgame${i}`).style.fontSize = size;
  }
}

//HP question extra

function generateHPQuizEndgame() {
  setChoicesStyleEndgame("17pt");
  setQuestionStyleEndgame("25pt");

  let index;
  do {
    index = Math.round(hogwartsQAExtra.length * Math.random());
  } while (answeredHPExtraQuestions.includes(index));

  showQuestionEndgame(hogwartsQAExtra[index].question);
  showChoicesEndgame(
    hogwartsQAExtra[index].answers.a,
    hogwartsQAExtra[index].answers.b,
    hogwartsQAExtra[index].answers.c,
    hogwartsQAExtra[index].answers.d
  );
  finalAnswer = hogwartsQAExtra[index].correctAnswer;
  currentHPExtraQuestion = index;
}
