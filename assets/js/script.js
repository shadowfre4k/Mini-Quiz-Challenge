var secondsLeft = 5; //sets default time for timer
var timeEl = document.querySelector(".time"); //selects area where timer is.
var button = document.querySelector(".button"); //selects button tag by class
var questionAreaEl = document.querySelector(".questionArea"); //Selects question area
var qCounter = 0; //needed a counter to cycle to the questions within the array

//arracy of objects to hold questions and answers
var questions = [
  {
    question: "Favorite food?",
    answers: ["Sushi", "BBQ", "Pizza", "Kdogs"],
    correct: 0,
  },
  {
    question: "Best Pet?",
    answers: ["Parrot", "Snake", "Axolotl", "Chinchilla"],
    correct: 1,
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
  var timeInterval = setInterval(function () {
    timeEl.textContent = "Timer: " + secondsLeft + " seconds left"; //replace context so we can see timer as it decrements
    secondsLeft--; //decrements timer

    //when the timer hits 0 stop decrements
    if (secondsLeft === -1) {
      clearInterval(timeInterval);
      secondsLeft = 5; //reset timer
    }
  }, 1000);
}

//function used to create an elements to populate questions and answers
//then populates questions and answers
function questionArea() {
  var q = document.createElement("ul"); //Ul initiated for type of El
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
        console.log("correct");
      } else {
        console.log("incorrect");
      }
      qCounter++; //Quesetion marker up
      q.remove(); //remove previous question

      //this will verify if the test is complete
      if (questions.length === qCounter) {
        console.log("All done!");
      } else {
        questionArea();
      } //rebuild with new question
    });
  }
}

// Start timer when start button is clicked
button.addEventListener("click", function () {
  setTime();
  // questionPrompt();
  questionArea();
  //Remove button
  button.remove();
});
