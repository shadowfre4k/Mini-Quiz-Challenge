//sets default time for timer
var mainEl = document.querySelector("main"); //main area
var checkEl = document.querySelector(".check"); //check score area
var timeEl = document.querySelector(".time"); //selects area where timer is.
var start = document.querySelector(".start"); //selects button tag by class
var checkScore = document.createElement("div");
var questionAreaEl = document.querySelector(".questionArea"); //Selects question area
var q = document.createElement("ul"); //Ul initiated for type of El
var h1El = document.createElement("h2");
var restart = document.createElement("button");
var saveScore = document.createElement("button");

var qCounter = 0; //needed a counter to cycle to the questions within the array
var secondsLeft = 30;
var playerStats = [];
var player = {
  right: 0,
  wrong: 0,
  score: 0,
};
//arracy of objects to hold questions and answers
var questions = [
  {
    question: "Best food?",
    answers: ["Sushi", "BBQ", "Pizza", "Kdogs"],
    correct: 3,
  },
  {
    question: "Best Pet?",
    answers: ["Parrot", "Snake", "Axolotl", "Chinchilla"],
    correct: 3,
  },
  {
    question: "Best anime?",
    answers: [
      "Kill la Kill",
      "Assassination Classroom",
      "Bleach",
      "Darling in the Franxx",
    ],
    correct: 2,
  },
  {
    question: "Best game",
    answers: ["Zelda", "StarFox", "Mario", "Sonic"],
    correct: 1,
  },
  {
    question: "Best Board Game?",
    answers: ["Here to Slay", "Secret Hitler", "Space Base", "Moon Rakers"],
    correct: 1,
  },
  {
    question: "Best Rage game",
    answers: ["League", "Overwatch", "Valorant", "Apex"],
    correct: 0,
  },
  {
    question: "which Symbol means OR?",
    answers: ["&&", "||", "<>", "()"],
    correct: 3,
  },
];

// Start timer when start button is clicked
start.addEventListener("click", function () {
  setTime();
  questionArea();
  start.remove(); //Remove  start button
});

//timer function
function setTime() {
  var timeInterval = setInterval(function () {
    timeEl.textContent = "Timer: " + secondsLeft + " seconds left"; //replace context so we can see timer as it decrements
    secondsLeft--; //decrements timer

    //when the timer hits 0 stop decrements
    if (secondsLeft <= -1 || questions.length === qCounter) {
      clearInterval(timeInterval);
      q.remove();
      quizComplete();
    }
  }, 1000);
}

function questionArea() {
  questionAreaEl.appendChild(q); //creates Els for question
  q.textContent = questions[qCounter].question; // populates with question

  for (let i = 0; i < questions[qCounter].answers.length; i++) {
    var ans = document.createElement("li"); //initiates El as Li

    q.appendChild(ans); //creates Els for each answer
    ans.textContent = questions[qCounter].answers[i]; // populates with answer options
    //adds click event listener to each answer
    ans.addEventListener("click", function () {
      if (questions[qCounter].correct === i) {
        player.right += 1;
      } else {
        player.wrong += 1;
        secondsLeft = secondsLeft - 3;
      }
      qCounter++; //Quesetion marker up
      q.remove(); //remove previous question
      //this will verify if the test is complete
      if (questions.length === qCounter) {
        quizComplete();
      } else {
        questionArea();
      } //rebuild with new question
    });
  }
}

//function used to create an elements to populate questions and answers
//then populates questions and answers
function quizComplete() {
  player.score = (player.right / questions.length) * 100;

  questionAreaEl.appendChild(h1El);
  h1El.textContent = "Congratulations your Score is " + player.score;
  questionAreaEl.appendChild(restart);
  restart.textContent = "Play again!";
  questionAreaEl.appendChild(saveScore);
  saveScore.textContent = "Save Score";

  restart.addEventListener("click", function () {
    location.reload();
  });

  saveScore.addEventListener("click", function () {
    addPlayer(player.score);
    location.reload();
  });
}

//set and get function
function addPlayer(playerScore) {
  var player = []; // create an array to store objects
  letter = prompt("Please enter initials");
  //create an object to store locally
  var playerStats = {
    initials: letter,
    score: playerScore,
  };

  player.unshift(playerStats); //push to top of list (it's entering backwards for some reason)
  player = player.concat(JSON.parse(localStorage.getItem("player") || "[]")); // get item out to amend new data

  localStorage.setItem("player", JSON.stringify(player)); //amend new data
}

checkEl.addEventListener("click", function () {
  mainEl.appendChild(checkScore); //add section for scores
  checkScore.textContent =
    "sorry not here at the moment please check console application"; // have it say score board

  for (
    i = 0;
    i < JSON.parse(localStorage.getItem("player")).length;
    i++ //create a loop to cycle through objects in array
  )
    var scoreboard = JSON.parse(localStorage.getItem("player")); //parse
  scoreString = JSON.stringify(scoreboard); //stringify
  console.log(scoreString); // i cant get the onject to come out properly
});
