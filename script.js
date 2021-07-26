//Variable declaration
var score = 0;
var timer;
var isPlaying = false;
var currentQuestion;
var playerArray = [];

//Query Selectors
//Buttons
var startBtn = document.querySelector("#start");
var backBtn = document.querySelector("#back");
var clearBtn = document.querySelector("#clear");
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
  { question: "Question 1: What is Mario's last name?",
    correctAnswer: "optionA",
    answers: {
      optionA: "Mario", //Correct
      optionB: "Bros",
      optionC: "Miyamoto",
      optionD: "Smith"
    }
  },
  { question: "Question 2: Who is the main protagonist of the Halo franchise?",
    correctAnswer: "optionC",
    answers: {
      optionA: "Sergeant Johnson",
      optionB: "Papa Smurf",
      optionC: "Master Chief", //Correct
      optionD: "Gordon Freeman"
    },
  },
  {
    question: "Question 3: What inspired gamemaker Satoshi Tajiri to create Pokémon?",
    correctAnswer: "optionB",
    answers: {
      optionA: "A dream",
      optionB: "Butterflies", //Correct
      optionC: "An old TV show",
      optionD: "His mom"
    },
  },
  {
    question: "Question 4: What was Sonic the hedgehog's original name?",
    correctAnswer: "optionC",
    answers: {
      optionA: "Fast Blue Hedgehog",
      optionB: "Colin the Hedgehog",
      optionC: "Mr Needlemouse", //Correct
      optionD: "Steven"
    }
  },
  {
    question: "Question 5: What was the first commercially successful video game?",
    correctAnswer: "optionA",
    answers: {
      optionA: "Pong", //Correct
      optionB: "Donkey Kong Country",
      optionC: "Super Mario Bros",
      optionD: "Shaq Fu"
    }
  },
  {
    question: "Question 6: What is the highest-selling gaming console to date?",
    correctAnswer: "optionC",
    answers: {
      optionA: "Nintendo Wii",
      optionB: "Xbox 360",
      optionC: "Playstation 2", //Correct
      optionD: "Nintendo 3DS"
    }
  },
  {
    question: "Question 7: What was Nintendo's orignal product before making video games?",
    correctAnswer: "optionA",
    answers: {
      optionA: "Playing cards", //Correct
      optionB: "Tennis rackets",
      optionC: "Toy figurines",
      optionD: "Televisions"
    }
  },
  {
    question: "Question 8: In the original Donkey Kong, what was the name of the character that would later be known as Mario?",
    correctAnswer: "optionD",
    answers: {
      optionA: "Jumps McGee",
      optionB: "Mr. Overalls",
      optionC: "John Smith",
      optionD: "Jumpman" //Correct
    }
  }
]

//Hide general elements that will be overwritten
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
  clearBtn.classList.add('hide');
}

function showStartPage() {
  hideElements();
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
  hsPromptEl.textContent = "Good job! You earned a score of " + score + ". Enter your initials to save your score to the leaderboards.";
}

function showHighscorePage() {
  hsTableEl.classList.remove('hide');
  backBtn.classList.remove('hide');
  clearBtn.classList.remove('hide');
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

//Start the quiz
function startQuiz(event) {
  event.preventDefault();
  isPlaying = true;
  currentQuestion = 0;
  timer = 100;
  //setup quiz layout
  hideElements();
  showQuizPage();

  //start timer
  setTime();

  //Load first question
  loadNextQuestion(currentQuestion);  
}

//Start Timer
function setTime() {
  var timerInterval = setInterval(function() {
    //timer update
    timer--;

    //validation so timer can't be negative
    if(timer <= 0) {
      timer = 0;    
    }
    timerEl.textContent = "Time: " + timer;
  
    //check for game end
    if(timer <= 0 || currentQuestion === quizArray.length) {
      clearInterval(timerInterval);
      // timer = 0;
      gameOver();
    } else {
      loadNextQuestion(currentQuestion)
    };
  }, 1000);
}

//Compare selected answer with correct answer from quiz array
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

//Shows user if answer is corrent and increments counter
function rightAnswer(option) {
  correctEl.classList.remove('hide');
  currentQuestion++;
}

//Shows user if answer is wrong and increments counter
function wrongAnswer(option) {
  timer-=10;
  incorrectEl.classList.remove('hide');
  currentQuestion++;
}

//Shows game over view and prompts for HS initials
function gameOver() {
  score = timer;
  hideElements();
  showGameOverPage();
}

//Grab input field data to pass to local storage
function submitScores(event){
  event.stopPropagation();
  event.preventDefault();
  var temp = inputEl.value.trim();
    playerArray.push({
    username: temp,
    userscore: score
  });

  setToLocal(playerArray);
  loadHighscores();
}

//Set player highscore to local storage
function setToLocal(array) {
  localStorage.setItem("players", JSON.stringify(array));
}

//Get player highscore from local storage for loadHighscores()
function getFromLocal() {
  players = JSON.parse(localStorage.getItem("players"));
  return players;
}

//Reset screen and show highscore view
function viewHighscores(event){
  event.preventDefault();
  hideElements();
  showHighscorePage();
  
  if(isPlaying) {
    timer = 0;
    isPlaying = false;
  }

  getFromLocal();
  loadHighscores();
}

//Reset and show highscor view; create html elements for highscores
function loadHighscores() {
  hideElements();
  showHighscorePage();
  hsListEl.innerHTML = "";
  getFromLocal();

  for (var i = 0; i < players.length; i++) {
    var player = players[i];

    //create list element
    var li = document.createElement("li");
    li.textContent = player.username;
    li.setAttribute("class", "list-group-item listitem-" + i);

    //create child span element
    var span = document.createElement("span");
    span.textContent = player.userscore;
    span.setAttribute("class", "float-end");

    //append span to list and list to highscore ul
    li.appendChild(span);
    hsListEl.appendChild(li);
  }
}

function clearHighscores() {
  localStorage.clear();
  hsListEl.innerHTML = "";
  loadHighscores();
}

//Event Listeners for all interactable elements
aBtn.addEventListener("click", compareQuestion);
bBtn.addEventListener("click", compareQuestion);
cBtn.addEventListener("click", compareQuestion);
dBtn.addEventListener("click", compareQuestion);
submitBtn.addEventListener("click", submitScores);
highscoreBtn.addEventListener("click", viewHighscores);
startBtn.addEventListener("click", startQuiz);
backBtn.addEventListener("click", showStartPage);
clearBtn.addEventListener("click", clearHighscores);