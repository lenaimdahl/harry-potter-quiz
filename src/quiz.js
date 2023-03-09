//hogwarts questions
let hogwartsQA = [
  {
    question: "In what house is Pansy Parkinson?",
    answers: {
      a: "Gryffindor",
      b: "Ravenclaw",
      c: "Slytherin",
      d: "Hufflepuff",
    },
    correctAnswer: "Slytherin",
  },
  {
    question: "What is the name of Hagrid's boarhound dog?",
    answers: { a: "Fang", b: "Bing", c: "Fluffy", d: "Snoopy" },
    correctAnswer: "1",
  },
];

function generateHPQuiz() {
  showQuestion(hogwartsQA[0]);

  for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
      if (playing == true) {
        if (this.innerHTML === hogwartsQA.correctAnswer) {
          score++;
          document.getElementById("scorevalue").innerHTML = score;

          document.getElementById("hermine").innerHTML = "yes, that's correct!";
          document.getElementById("ron").innerHTML = "Good job!";

          generateQA();
        } else {
          document.getElementById("ron").innerHTML = "I'm not sure";
          document.getElementById("hermine").innerHTML = "Try again!";
        }
      }
    };
  }
}

function showQuestion(hogwartsQA) {
  let qA = document.getElementById("question");
  qA.innerHTML = hogwartsQA.question;
  qA.style.fontSize = "larger";

  let answer1 = document.querySelector("#box1");
  answer1.innerHTML = hogwartsQA.answers.a;
  answer1.style.fontSize = "larger";

  let answer2 = document.querySelector("#box2");
  answer2.innerHTML = hogwartsQA.answers.b;
  answer2.style.fontSize = "larger";

  let answer3 = document.querySelector("#box3");
  answer3.innerHTML = hogwartsQA.answers.c;
  answer3.style.fontSize = "larger";

  let answer4 = document.querySelector("#box4");
  answer4.innerHTML = hogwartsQA.answers.d;
  answer4.style.fontSize = "larger";
}
