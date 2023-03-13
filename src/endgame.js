// fight Endgame
document.querySelector("#more-QA-btn").onclick = function () {
  document.querySelector(".heading").style.display = "none";
  document.querySelector("#more-QA-btn").style.display = "none";
  document.querySelector("#endgame").style.display = "inherit";
  document.querySelector(".figure-1").style.display = "none";
  document.querySelector(".figure-2").style.display = "none";
};

//start the game
function startGameEndgame() {
  if (playing == true) {
    location.reload();
  } else {
    playing = true;
    score = 0;

    document.getElementById("scorevalue").innerHTML = score;
    document.getElementById("startreset").innerHTML = "Reset Game";

    generateHPQuizEndgame();
    startCountdown();
  }
}
document.getElementById("startreset").onclick = startGame;

function startCountdown() {
  timeremaining = 30;
  document.querySelector("#timeremaining").style.display = "inherit";
  document.getElementById("timeremainingvalue").innerHTML = timeremaining;

  timer = setInterval(() => {
    timeremaining -= 1;

    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    if (timeremaining === 0) {
      stopCountdown();
      document.querySelector("#question-text-endgame").style.display = "none";
      document.querySelector("#game-over").style.display = "inherit";
    }
    if (chance === 0) {
      stopCountdown();
      document.querySelector("#question-text-endgame").style.display = "none";
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

function finishEndgame() {
  let textEndgame = document.querySelector(".heading");
  textEndgame.innerHTML = "We killed the monster!";
  textEndgame.style.fontSize = "40pt";
  textEndgame.style.marginTop = "500px";

  stopCountdown();
}

function checkAnswerEndgame() {
  if (playing == true) {
    if (this.innerHTML == finalAnswer) {
      score++;
      document.getElementById("scorevalue").innerHTML = score;

      if (score >= 0 && score < 5) {
        generateHPQuizEndgame();
      }
      if (score === 5) {
        finishEndgame();
      } else {
        resetCountdown();
      }
    } else {
      chance--;
      document.querySelector("#chancevalue").innerHTML = chance;
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

  let box0 = document.querySelector(`#box${boxes[0]}`);
  box0.innerHTML = correctAnswer;

  let box1 = document.querySelector(`#box${boxes[1]}`);
  box1.innerHTML = choice2;

  let box2 = document.querySelector(`#box${boxes[2]}`);
  box2.innerHTML = choice3;

  let box3 = document.querySelector(`#box${boxes[3]}`);
  box3.innerHTML = choice4;
}

function showQuestionEndgame(text) {
  let questionElement = document.getElementById("question-text-endgame");
  questionElement.innerHTML = text;
}

//HP question extra
function generateHPQuizEndgame() {
  setChoicesStyle("17pt");
  setQuestionStyle("25pt");
  showQuestionEndgame(hogwartsQAExtra[HPQuizIndex].question);
  showChoicesEndgame(
    hogwartsQAExtra[HPQuizIndex].answers.a,
    hogwartsQAExtra[HPQuizIndex].answers.b,
    hogwartsQAExtra[HPQuizIndex].answers.c,
    hogwartsQAExtra[HPQuizIndex].answers.d
  );
  finalAnswer = hogwartsQAExtra[HPQuizIndex].correctAnswer;
  HPQuizIndex++;
}
