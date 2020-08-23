var mainContentEl = document.querySelector("#main-content");

// Questions array containing the quiz questions and answers
var questions = [
    {   question: "Arrays in JavaScript can be used to store _________.", 
        choices: [
            {option: 1, choice: "numbers and strings"},
            {option: 2, choice: "other arrays"},
            {option: 3, choice: "booleans"},
            {option: 4, choice: "all of the above"}
        ],
        answer: 4
    },
    {   question: "Commonly used data types DO Not Include:", 
        choices: [
            {option: 1, choice: "strings"},
            {option: 2, choice: "booleans"},
            {option: 3, choice: "alerts"},
            {option: 4, choice: "numbers"}
        ],
        answer: 3
    },
    {   question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
        choices: [
            {option: 1, choice: "JavaScript"},
            {option: 2, choice: "console.log"},
            {option: 3, choice: "for loops"},
            {option: 4, choice: "terminal/bash"}
        ],
        answer: 2
    }
];
// quiz variables and default values
var timeLeft = 0;
var currentQuestionNum = 0;
var answeredCorrectly = 0;
var score = 0;
var countDown = '';

// Load home page using the DOM
var loadHomePage = function () {
    // Create header element
    var headerEl = document.createElement("header");

    // Create High Score Link
    var highScoreLinkEl = document.createElement("a");
    highScoreLinkEl.textContent = "View high scores";
    highScoreLinkEl.className = "high-score-link";
    headerEl.appendChild(highScoreLinkEl);

    // Time Remaining Section
    var timeRemainingEl = document.createElement("p");
    timeRemainingEl.className = "time-remaining";
    timeRemainingEl.innerHTML = "Time: <span id='time-remaining-span'>0</span>";
    headerEl.appendChild(timeRemainingEl);

    // Section Content Wrapper
    var sectionContentEl = document.createElement("section");
    sectionContentEl.id = "section-content";
    sectionContentEl.className = "section-content";

    // Add home section content
    var homeContentEl = document.createElement("div");
    homeContentEl.id = "home-content-wrapper";

    // Include heading element to homeContnetEl
    var homeHeaderEl = document.createElement("h2");
    homeHeaderEl.className = "home-heading";
    homeHeaderEl.textContent = "Coding Quiz Challenge";
    homeContentEl.appendChild(homeHeaderEl);

    // Include paragraph element to homeContnetEl
    var homeTextDescriptionEl = document.createElement("p");
    homeTextDescriptionEl.className = "home-description";
    homeTextDescriptionEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
    homeContentEl.appendChild(homeTextDescriptionEl);

    // Include Start Quiz button element to homeContnetEl
    var startQuizBtnEl = document.createElement("button");
    startQuizBtnEl.className = "primary-button";
    startQuizBtnEl.id = "start-quiz";
    startQuizBtnEl.textContent = "Start Quiz";

    homeContentEl.appendChild(startQuizBtnEl);

    // append homeContentEl to sectionContentEl
    sectionContentEl.appendChild(homeContentEl);

    // Add header to main content
    mainContentEl.appendChild(headerEl);
    mainContentEl.appendChild(sectionContentEl);
}

// Record Score
var recordScore = function (initials, score) {

    // retrieve high scores
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    var newScoreObj = {
        initials: initials,
        score: score
    };
    if (highScores) {
        // Loop through and add new score to high scores if it is in the top 10
        highScores.push(newScoreObj);
    } else {
        highScores = [newScoreObj];
    }
    
    // Sort highScore items in decending order
    highScores.sort(function(a,b) {
        var scores1 = parseInt(a.score);
        var scores2 = parseInt(b.score);
        var match = 0;
        if (scores1 < scores2) {
            match = 1;
        } else if (scores1 > scores2) {
            match = -1;
        }
        return match;
    });
    
    localStorage.setItem("highScores", JSON.stringify(highScores));

}


// End Quiz
var endQuiz = function(result) {

    score = answeredCorrectly / questions.length; 
    if(result === "Lost") {
        alert("You ran out of time!");
    } 

    // Section Content
    var sectionContentEl = mainContentEl.querySelector("#section-content");

    // Create quiz result container
    var quizResultsContainerEl = document.createElement("div");
    quizResultsContainerEl.id = "quiz-results-container"

    // heading
    var resultHeadingEl = document.createElement("h2");
    resultHeadingEl.textContent = "All done!";
    quizResultsContainerEl.appendChild(resultHeadingEl);

    // Final score display
    var resultScoreEl = document.createElement("p");
    resultScoreEl.textContent = "Your final score is " + timeLeft;
    quizResultsContainerEl.appendChild(resultScoreEl);

    // Add form input for initials
    var formEl = document.createElement("form");

    var formInputLabelEl = document.createElement("label");
    formInputLabelEl.setAttribute("for", "initial-input");
    formInputLabelEl.textContent = "Enter initials: ";
    formEl.appendChild(formInputLabelEl);

    // Form Initial Input Field
    var formInputEl = document.createElement("input");
    formInputEl.type = "text";
    formInputEl.name = "initial-input";
    formInputEl.id = "initial-input";
    formEl.appendChild(formInputEl);

    // Form Button
    var formSubmitBtnEl = document.createElement("button");
    formSubmitBtnEl.type = "submit";
    formSubmitBtnEl.textContent = "Submit";
    formSubmitBtnEl.id = "submit-score-btn";
    formSubmitBtnEl.className = "primary-button";
    formSubmitBtnEl.setAttribute("data-score", timeLeft)
    formEl.appendChild(formSubmitBtnEl);

    quizResultsContainerEl.appendChild(formEl);
    // Add quiz result content to section
    sectionContentEl.appendChild(quizResultsContainerEl);
}

// Quiz Section Creation 
var loadNextQuestion = function() {
    // create variable containing section
    var sectionContentEl = mainContentEl.querySelector("#section-content");

    // Create question wrapper
    var questionContentEl = document.createElement("div");
    questionContentEl.id = "question-content-wrapper";

    // Create and add question to wrapper
    var questionEl = document.createElement("h2");
    questionEl.className = "question-text";
    questionEl.textContent = questions[currentQuestionNum].question;
    questionContentEl.appendChild(questionEl);

    // Loop through question answers and add to question content
    var choiceContainerEl = document.createElement("div");
    choiceContainerEl.id = "choice-container";
    for (var i = 0; i < questions[currentQuestionNum].choices.length; i++) {
        // comment create choice button 
        var choiceButtonEl = document.createElement("button");
        choiceButtonEl.className = "primary-button";
        choiceButtonEl.id = "choice-" + questions[currentQuestionNum].choices[i].option;
        choiceButtonEl.setAttribute("data-question-number", currentQuestionNum);
        choiceButtonEl.setAttribute("data-option-number", questions[currentQuestionNum].choices[i].option);
        choiceButtonEl.textContent = questions[currentQuestionNum].choices[i].choice;
        // add new button to choice container
        choiceContainerEl.appendChild(choiceButtonEl);
    }

    // Add choices to question Container
    questionContentEl.appendChild(choiceContainerEl);

    // add new question content to section content
    sectionContentEl.appendChild(questionContentEl);

    // Increment Current Question
    currentQuestionNum++;

}

// Begin Quiz Timer
var startTimer = function() {
    timeLeft = 60;
    var timeRemainingEl = mainContentEl.querySelector("#time-remaining-span");
    timeRemainingEl.textContent = timeLeft;
    timeLeft--;
    countDown = setInterval(function() {
        if (timeLeft < 0) {
            timeRemainingEl.textContent = "0";
            clearInterval(countDown);
            endQuiz("Lost");
        } else {
            timeRemainingEl.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

// Start Quiz
var startQuiz = function() {
    // Reset Variables for new quiz
    answeredCorrectly = 0;
    currentQuestionNum = 0;
    score = 0;
    // Begin timer for quiz
    startTimer();

    // Remove Home Content
    var homeContentEl = mainContentEl.querySelector("#home-content-wrapper");
    homeContentEl.remove();

    // Start on the first question
    loadNextQuestion();
}

// Verify Question Answer and Adjust Score/Time
var verifyAnswer = function(questionNum, choiceNum) {
    // Verify Response
    var choiceResult = '';
    if (questions[questionNum].answer === parseInt(choiceNum)) {
        // Answered correctly
        answeredCorrectly++;
        choiceResult = "Correct!";
    } else {
        // Got question wrong
        choiceResult = "Wrong!";
        // Deduct 10 seconds from total time remaining
        timeLeft = timeLeft - 10;
    }
    
    // Remove previous question 
    var questionContentEl = mainContentEl.querySelector("#question-content-wrapper");
    questionContentEl.remove();

    // Verify there are more questions to render
    if (currentQuestionNum < questions.length) {
        // Go to next question
        loadNextQuestion();
        var parentContainer = mainContentEl.querySelector("#question-content-wrapper");
    } else {
        // End quiz timer
        clearInterval(countDown);

        // Go to results page
        endQuiz("Finished");
        var parentContainer = mainContentEl.querySelector("#quiz-results-container");
    }

    // Include previous question result at end if it exists
    var previousResultContainerEl = document.createElement("div");
    previousResultContainerEl.id = "previous-result-container";
    
    var previousResultTextEl = document.createElement("h3");
    previousResultTextEl.className = "previous-result";
    previousResultTextEl.textContent = choiceResult;
    previousResultContainerEl.appendChild(previousResultTextEl);

    parentContainer.appendChild(previousResultContainerEl);

}

// Determine Clicked Object 
var determineClicked = function(event) {
    event.preventDefault();
    var itemClicked = event.target;
    
    
    if (itemClicked.id === "start-quiz") {
        startQuiz();
    } else if (itemClicked.id.includes("choice-")) {
        // When question choice is clicked
        var buttonClicked = document.getElementById(itemClicked.id);
        var quetionNum = buttonClicked.getAttribute("data-question-number");
        var choiceNum = buttonClicked.getAttribute("data-option-number");
        // Call verifyAnswer function
        verifyAnswer(quetionNum,choiceNum);
    } else if (itemClicked.id === "submit-score-btn") {
        var initials = document.getElementById("initial-input").value;
        var score = itemClicked.getAttribute("data-score");
        // Ensure the user has entered their initials
        if (!initials) {
            alert("Please enter your initials before submitting.");
            return false;
        }
        recordScore(initials,score);
    }
}


// Event Listeners
mainContentEl.addEventListener("click", determineClicked);

loadHomePage();