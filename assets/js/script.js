//sets default time for timer
var timeEl = document.querySelector(".time"); //selects area where timer is.
var start = document.querySelector(".start"); //selects button tag by class
var questionAreaEl = document.querySelector(".questionArea"); //Selects question area
var q = document.createElement("ul"); //Ul initiated for type of El
var h1El = document.createElement("h2");
var restart = document.createElement("button");
var qCounter = 0; //needed a counter to cycle to the questions within the array
var right = 0;
var wrong = 0;

//arracy of objects to hold questions and answers
var questions = [
  {
    question: "Favorite food?",
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
];

//timer function
function setTime() {
  var secondsLeft = 5;
  var timeInterval = setInterval(function () {
    timeEl.textContent = "Timer: " + secondsLeft + " seconds left"; //replace context so we can see timer as it decrements
    secondsLeft--; //decrements timer

    //when the timer hits 0 stop decrements
    if (secondsLeft === -1 || questions.length === qCounter) {
      clearInterval(timeInterval);
      secondsLeft = 5; //reset timer
    }
  }, 1000);
}

//function used to create an elements to populate questions and answers
//then populates questions and answers
function quizComplete() {
  q.remove();
  score = (right / 3) * 100;
  questionAreaEl.appendChild(h1El);
  h1El.textContent = "Congratulations your Score is " + score;
  questionAreaEl.appendChild(restart);
  restart.textContent = "Play again!";
  restart.addEventListener("click", function () {
    location.reload();
  });
  // restart.addEventListener("click", function{
  //   questionAreaEl.remove()
  //   set
  // });
}

function questionArea() {
  questionAreaEl.appendChild(q); //creates Els for question
  q.textContent = questions[qCounter].question; // populates with question

  for (let i = 0; i < questions[qCounter].answers.length; i++) {
    var ans = document.createElement("li"); //initiates El as Li

    q.appendChild(ans); //creates Els for each answer
    ans.textContent = questions[qCounter].answers[i]; // populates with answer options
    ans.addEventListener("click", function () {
      //adds click event listener to each answer
      //check answer function;
      if (questions[qCounter].correct === i) {
        right = right + 1;
      } else {
        wrong += 1;
      }
      qCounter++; //Quesetion marker up
      q.remove(); //remove previous question
      //this will verify if the test is complete
      if (questions.length === qCounter) {
        quizComplete();
        return score;
      } else {
        questionArea();
      } //rebuild with new question
    });
  }
}

// Start timer when start button is clicked
start.addEventListener("click", function () {
  setTime();
  questionArea();
  //Remove  start button
  start.remove();
});
