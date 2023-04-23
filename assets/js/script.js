var secondsLeft = 5; //sets default time for timer
var timeEl = document.querySelector(".time"); //selects area where timer is.
var button = document.querySelector(".button"); //selects button tag by class
var articleEl = document.querySelector("article"); //selects article tag
var questionEl = document.querySelector(".question"); //Selects question area

//object to hold questions and answers
var questions = {
  question: "Favorite food?",
  answers: ["Sushi", "BBQ", "Pizza", "Kdogs"],
  correct: 4,
};

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

// this function should be able to insert an element for the questions
function questionPrompt() {
  var q = document.createElement("ul");
  q.textContent = questions.question;
  questionEl.appendChild(q); //add question section and insert question prompt
  answersPopulate(); // populate questions
}

//populate answers
function answersPopulate() {
  for (let i = 0; i < questions.answers.length; i++) {
    var ans = document.createElement("li");
    ans.textContent = questions.answers[i];
    questionEl.appendChild(ans);

    //added event listeners to each answer so we know when clicked
    ans.addEventListener("click", function () {
      console.log("clicked!");
    });
  }
}

// Start timer when start button is clicked
button.addEventListener("click", function () {
  setTime();
  questionPrompt();
});
