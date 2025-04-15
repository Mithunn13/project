var playing = false;
var score;
var timeremaining = 60;
var action;
var correctPosition;
var correctAnswer;

// Start/Reset button functionality
document.getElementById("startreset").onclick = function () {
  if (playing === true) {
    location.reload(); // Reload the page to reset
  } else {
    playing = true;

    // Reset score and time
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;

    timeremaining = 60;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    // Show countdown and change button
    show("timeremaining");
    document.getElementById("startreset").innerHTML = "Reset Game";

    // Hide game over if it was shown previously
    hide("gameOver");

    // Start countdown and generate a question
    startcountdown();
    generateQA();
  }
};

// Fix: Use a closure or `let` to preserve `i` in each iteration
for (let i = 1; i < 5; i++) {
  document.getElementById("box" + i).onclick = function () {
    if (playing === true) {
      if (this.innerHTML == correctAnswer) {
        score++;
        document.getElementById("scorevalue").innerHTML = score;
        hide("wrong");
        show("correct");
        setTimeout(function () {
          hide("correct");
        }, 1000);
        generateQA();
      } else {
        hide("correct");
        show("wrong");
        setTimeout(function () {
          hide("wrong");
        }, 1000);
      }
    }
  };
}

function startcountdown() {
  action = setInterval(function () {
    timeremaining -= 1;
    document.getElementById("timeremainingvalue").innerHTML = timeremaining;

    if (timeremaining === 0) {
      stopcountdown();
      show("gameOver");
      document.getElementById("gameOver").innerHTML =
        "<p>Game over!</p><p>Your score is " + score + ".</p>";
      hide("timeremaining");
      hide("correct");
      hide("wrong");
      playing = false;
      document.getElementById("startreset").innerHTML = "Start Game";
    }
  }, 1000);
}

function stopcountdown() {
  clearInterval(action);
}

function hide(id) {
  document.getElementById(id).style.display = "none";
}

function show(id) {
  document.getElementById(id).style.display = "block";
}

function generateQA() {
  var x = 1 + Math.round(9 * Math.random());
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById("question").innerHTML = x + "X" + y;

  correctPosition = 1 + Math.round(3 * Math.random());
  document.getElementById("box" + correctPosition).innerHTML = correctAnswer;

  var answers = [correctAnswer];

  for (var i = 1; i < 5; i++) {
    if (i != correctPosition) {
      var wrongAnswer;
      do {
        wrongAnswer =
          (1 + Math.round(9 * Math.random())) *
          (1 + Math.round(9 * Math.random()));
      } while (answers.indexOf(wrongAnswer) > -1);
      document.getElementById("box" + i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}
