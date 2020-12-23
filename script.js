//Variable declaration
var score = 0;
var timer;
var isPlaying = false;
var currentQuestion;
var playerArray = [];
var players;

//Query Selectors
//Buttons
var startBtn = document.querySelector("#start");
var backBtn = document.querySelector("#back");
var highscoreBtn = document.querySelector("#highscore");
var submitBtn = document.querySelector("#button-addon2");
var aBtn = document.querySelector("#optionA");
var bBtn = document.querySelector("#optionB");
var cBtn = document.querySelector("#optionC");
var dBtn = document.querySelector("#optionD");

//Elements
var timerEl = document.querySelector("#timer");
var questionEl = document.querySelector("#question");
var correctEl = document.querySelector("#correct");
var incorrectEl = document.querySelector("#incorrect");
var buttonEl = document.querySelector("#button");
var questionCardEl = document.querySelector("#questionCard");
var promptEl = document.querySelector("#prompt");
var hsPromptEl = document.querySelector("#hsprompt");
var formEl = document.querySelector("#form");
var inputEl = document.querySelector("#input");
var hsTableEl = document.querySelector("#hsTable");
var hsListEl = document.querySelector("#hsList");


//Array of quiz questions and answers
var quizArray = [
  { question: "What is Mario's last name?",
    correctAnswer: "optionA",
    answers: {
      optionA: "Mario", //Correct
      optionB: "Bros",
      optionC: "Miyamoto",
      optionD: "Smith"
    }
  },
  { question: "Who is the main protagonist of the Halo franchise?",
    correctAnswer: "optionC",
    answers: {
      optionA: "Sergeant Johnson",
      optionB: "Papa Smurf",
      optionC: "Master Chief", //Correct
      optionD: "Gordon Freeman"
    },
  },
  {
    question: "What inspired gamemaker Satoshi Tajiri to create Pokémon?",
    correctAnswer: "optionB",
    answers: {
      optionA: "A dream",
      optionB: "Butterflies", //Correct
      optionC: "An old TV show",
      optionD: "His mom"
    },
  },
  {
    question: "What was Sonic the hedgehog's original name?",
    correctAnswer: "optionC",
    answers: {
      optionA: "Fast Blue Hedgehog",
      optionB: "Colin the Hedgehog",
      optionC: "Mr Needlemouse", //Correct
      optionD: "Steven"
    }
  },
  {
    question: "What was the first commercially successful video game?",
    correctAnswer: "optionA",
    answers: {
      optionA: "Pong", //Correct
      optionB: "Donkey Kong Country",
      optionC: "Super Mario Bros",
      optionD: "Shaq Fu"
    }
  }
]

//hide general elements that will be overwritten
function hideElements() {
  //Start page
  promptEl.classList.add('hide');
  startBtn.classList.add('hide');
  //Quiz page
  questionCardEl.classList.add('hide');
  correctEl.classList.add('hide');
  incorrectEl.classList.add('hide');
  //Gameover page
  hsPromptEl.classList.add('hide');
  formEl.classList.add('hide');
  inputEl.classList.add('hide');
  submitBtn.classList.add('hide');
  //Highscore page
  hsTableEl.classList.add('hide');
  backBtn.classList.add('hide');
}

function showStartPage() {
  promptEl.classList.remove('hide');
  startBtn.classList.remove('hide');
}

function showQuizPage() {
  questionCardEl.classList.remove('hide');
}

function showGameOverPage() {
  hsPromptEl.classList.remove('hide');
  formEl.classList.remove('hide');
  inputEl.classList.remove('hide');
  submitBtn.classList.remove('hide');
}
function showHighscorePage() {
  hsTableEl.classList.remove('hide');
  backBtn.classList.remove('hide');
}
//Load questions and answers into document
function loadNextQuestion(question) {
  questionEl.textContent = quizArray[question].question;
  aBtn.textContent = quizArray[question].answers.optionA;
  bBtn.textContent = quizArray[question].answers.optionB;
  cBtn.textContent = quizArray[question].answers.optionC;
  dBtn.textContent = quizArray[question].answers.optionD;
  incorrectEl.classList.add('hide');
  correctEl.classList.add('hide');
}

//starts the quiz
function startQuiz() {
  isPlaying = true;
  currentQuestion = 0;
  timer = 75;
  //setup quiz layout
  hideElements();
  showQuizPage();
//  questionCardEl.classList.remove('hide');

  //start timer
  setTime();

  //Load first question
  loadNextQuestion(currentQuestion);  
}

function setTime() {
  var timerInterval = setInterval(function() {
    //timer update
    timer--;
    timerEl.textContent = "Time: " + timer;

    //check for game end
    if(timer <= 0 || currentQuestion === quizArray.length) {
      clearInterval(timerInterval);
      gameOver();
    } else {
      loadNextQuestion(currentQuestion)
    };
  }, 1000);
}

//shows user if answer is corrent and increments counter
function rightAnswer(option) {
  correctEl.classList.remove('hide');
  currentQuestion++;
}

// shows user if answer is wrong and increments counter
function wrongAnswer(option) {
  timer-=10;
  incorrectEl.classList.remove('hide');
  currentQuestion++;
}

//Shows game over screen and prompts for HS initials
function gameOver() {
  score = timer;
  hideElements();
  //show game over input
  showGameOverPage();
  // hsPromptEl.classList.remove('hide');
  // formEl.classList.remove('hide');
  // inputEl.classList.remove('hide');
  // submitBtn.classList.remove('hide');
  updateHSPrompt();
}

function compareQuestion(event) {
  event.preventDefault();
  var optionSelected = event.target.id;
  //compare selected answer with the answer stored in the array
  if(optionSelected === quizArray[currentQuestion].correctAnswer) {
    //do correct answer stuff
    rightAnswer(event);
  } else {
    //do wrong answer stuff
    wrongAnswer(event);
  }
}

function viewHighscores(){
  hideElements();
  showHighscorePage();
  // hsTableEl.classList.remove('hide');
  // backBtn.classList.remove('hide');
  if(isPlaying) {
    timer = 0;
  }
}

function updateHSPrompt() {
  hsPromptEl.textContent = "Good job! You earned a score of " + score + ". Enter your initials to save your score to the leaderboards.";
}

function submitScores(event){
  var temp = inputEl.value.trim();
  playerArray.push({
    username: temp,
    userscore: score
  });

  //DEBUG
  // console.log("Temp: " + temp);
  // console.log("PlayerArray: " + playerArray);
  // console.log("Username: " + playerArray[0].username);
  // console.log("Userscore: " + playerArray[0].userscore);
  // console.log("===========");
  writeToLocal(playerArray);
  loadHighscores();
}

function addToUserObject () {

}

function writeToLocal(object) {
  localStorage.setItem("user", JSON.stringify(object));
  console.log("Reached Write to Local Storage POint");
}

function getFromLocal() {
  players = JSON.parse(localStorage.getItem("user"));
  console.log("Reached get from Local storage poiint");
  console.log(players);
  return players;
}

function loadHighscores() {
  hideElements();
  showHighscorePage();
  // hsTableEl.classList.remove('hide');
  // backBtn.classList.remove('hide');
  getFromLocal();
  //var players = JSON.parse(localStorage.getItem("user"));
  console.log(players.username);

  for (var i = 0; i < players.length; i++) {
    var player = players[i];

    //create list element
    var li = document.createElement("li");
    li.textContent = player.username;
    li.setAttribute("class", "list-group-item");

    //create child span element
    var span = document.createElement("span");
    span.textContent = player.userscore;
    span.setAttribute("class", "float-end");


    li.appendChild(span);
    hsListEl.appendChild(li);
    //DEBUG
    console.log("List: " + li);
    console.log("Span: " + span);
    console.log("Full List: " + hsListEl);
  }

}


aBtn.addEventListener("click", compareQuestion);
bBtn.addEventListener("click", compareQuestion);
cBtn.addEventListener("click", compareQuestion);
dBtn.addEventListener("click", compareQuestion);
submitBtn.addEventListener("click", submitScores);
highscoreBtn.addEventListener("click", viewHighscores);
startBtn.addEventListener("click", startQuiz);
backBtn.addEventListener("click", startQuiz);

// PSEUDO CODE
// I need to store a set of questions in an object or array
// when the start button is clicked 
// pull first question from object/array
// comapre input with database of answers
// on correct answer
//  go to next page
// on incorrect answer
//  deduct points
//  go to next page
// when timer reaches 0 or no more questions game over, transition to score page
// display score and input field for initials
// submit button to submit score to high score list
// UI needs a View highscore option to 

// var quiz = {
//   // would an array of objects be better? 
//   questionOne: ["is coding fun?", "yes", "no", "maybe", "idk", "yes"],
//   questionTwo: ["Question Two", "option 1", "option 2", "option 3", "option 4", "option 2",
//   questionThree: ["Question Three", "option 1", "option 2", "option 3", "option 4", "option 3"],
//   questionFour: ["Question Four", "option 1", "option 2", "option 3", "option 4", "option 4"],
//   questionFive: ["Question Five", "option 1", "option 2", "option 3", "option 4", "option 1"],
// }

//var timer;
//var quizStarted = false;
//HTML elements to capture
//timerEl = document.QuerySelector("#timer");
//highscoreEl ...
//startButtonEl ...
//quizContainerEl/mainContentEl ...
//initialsEl
//submitHsEl

//EventListeners
//highscoreEl.Event Listener
//start quiz. event listener
//submit HS. Event listener
//initalsEl.Event listerner

//while loop for question looping
//user click on start Quiz button
  // event listener changes quizStarted to true
//mainContentEl updates with questionOne

//functions needed
  //compareAnswer(); returns true or false
  //  if selectedAnswer === correctAnswer
  //    update display("Correct")
  //  else
  //    update display("Incorrect")
  //    deductTime()
  //      timer = timer - 10;
  //      update timerEl
  //  loadNextQuestion()

  //loadNextQuestion(); sets HTML elements to next question
    //addButton; add button for each choice for question
  //deductTime(); subtracts time from timer
  //showAnswer(); when user clicks on choice, update ui to show whether it was right or wrong
  //gameOver(); when game is over load gameOver screen
  //saveScore();