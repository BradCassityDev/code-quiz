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



loadHomePage();