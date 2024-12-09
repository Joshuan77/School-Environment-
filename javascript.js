//Runs once at the beginning
function setup() {
  var googleSheetLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSnm5Qt1j-aVlISQFepuhX0CCXNQ_yQ7odXeIrkgaAljvCEdi0hRiStpwOBekHteTzYISzTIX88f6S2/pub?output=csv";
  trivia.loadGoogleSheet(googleSheetLink).then(displayWelcome); 
}

var correct = new Audio("sounds/correctsound.mp3");
var wrong = new Audio("sounds/wrongsound.mp3");

function displayWelcome() {
  $(".screen").hide();
  $("#welcome-screen").show();
  $("#question-count").html(`There are ${trivia.totalQuestions} questions waiting for you: are you ready to expand your knowledge?`);
}


function displayQuestion() {
  $(".screen").hide();
  $("#question-screen").show();
  trivia.insertQuestionInfo();
  trivia.shuffleAnswers();
  $("#correctAnswer").removeClass("highlight");
  $("#feedback").hide();
}

function displayThankyou() {
  $(".screen").hide();
  $("#thankyou-screen").show();
  $("#game-results").html(`You got ${trivia.totalCorrect} of ${trivia.totalAnswered} correct.`);
}

function onClickedAnswer(isCorrect) {
  if (isCorrect) {
    // Display feedback for correct answer
    $("#feedback").html("You really know your stuff!").show();
    correct.play();  // Play correct sound effect
    $("#correctAnswer").addClass("highlight");  // Highlight correct answer
    // Add the "Next Question" button
    $("#feedback").append('<br><button onclick="trivia.gotoNextQuestion();">Next Question</button>');
  } else {
    // Display feedback for incorrect answer
    $("#feedback").html("Wrong, better luck next time!").show();
    wrong.play();  // Play wrong sound effect
    $("#correctAnswer").addClass("highlight");  // Highlight correct answer
    // Add the "Next Question" button
    $("#feedback").append('<br><button onclick="trivia.gotoNextQuestion();">Next Question</button>');
  }
}



function onClickedStart() {
    displayQuestion();
}

//Loops continously for background effects and animations. (p5.js)


function draw() {
   if (trivia.state == "welcome") background("lightblue");
  else if (trivia.state == "question") background("lightblue");
  else if (trivia.state == "correct") background("green");
  else if (trivia.state == "incorrect") background("red");
  else if (trivia.state == "thankyou") background("lightblue");
  $('#score').html(`${trivia.totalCorrect} of ${trivia.totalAnswered} Correct`);
}





//balloons rising to the top
function balloons() {
  background("gray");
  var sFrame = floor(frameCount / (4*height))*4*height; //starting frame for looping
  for (var i = 0; i < 30; i++) { //let's do 30 balloons
    randomSeed(10510 * i + 2); //ensures a repeatable random #
    var y = int(random(height*4) - (frameCount - sFrame)/2);
    randomSeed(30260 * i + 1); //ensures another repeatable random #
    var x = int(random(width));
    fill("red");
    line(x, y, x, y + 30);//balloon string
    ellipse(x, y, 10, 15);//balloon
  }
}