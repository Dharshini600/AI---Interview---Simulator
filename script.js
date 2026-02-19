// =====================================
// AI INTERVIEW SIMULATOR - FULL SCRIPT
// =====================================

// ----------------------
// QUESTION DATABASE
// ----------------------

const questions = {
    frontend: [
        "What is the difference between var, let, and const?",
        "Explain event delegation in JavaScript.",
        "What is React and why is it used?",
        "Explain CSS Flexbox.",
        "What is the DOM?"
    ],
    java: [
        "What is OOP?",
        "Explain JVM architecture.",
        "What is multithreading?",
        "Difference between interface and abstract class?",
        "What is exception handling?"
    ],
    data: [
        "What is data analysis?",
        "Explain difference between SQL and NoSQL.",
        "What is data visualization?",
        "Explain primary key and foreign key.",
        "What is normalization?"
    ],
    hr: [
        "Tell me about yourself.",
        "Why should we hire you?",
        "What are your strengths and weaknesses?",
        "Where do you see yourself in 5 years?",
        "How do you handle pressure?"
    ]
};

// ----------------------
// GLOBAL VARIABLES
// ----------------------

let currentQuestion = 0;
let selectedRole = "";
let score = 0;
let timeLeft = 60;
let timer;


// ----------------------
// START INTERVIEW
// ----------------------

function startInterview() {

    selectedRole = document.getElementById("role").value;

    if (selectedRole === "") {
        alert("Please select a job role");
        return;
    }

    document.getElementById("roleSection").style.display = "none";
    document.getElementById("interviewSection").style.display = "block";
    document.getElementById("resultSection").style.display = "none";

    currentQuestion = 0;
    score = 0;

    showQuestion();
}


// ----------------------
// SHOW QUESTION
// ----------------------

function showQuestion() {

    const totalQuestions = questions[selectedRole].length;

    // Show question number
    document.getElementById("question").innerText =
        "Question " + (currentQuestion + 1) + " / " + totalQuestions +
        "\n\n" + questions[selectedRole][currentQuestion];

    document.getElementById("answer").value = "";

    startTimer();
}


// ----------------------
// TIMER FUNCTION
// ----------------------

function startTimer() {

    timeLeft = 60;
    document.getElementById("timer").innerText =
        "Time Left: " + timeLeft + " sec";

    clearInterval(timer);

    timer = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").innerText =
            "Time Left: " + timeLeft + " sec";

        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }

    }, 1000);
}


// ----------------------
// NEXT QUESTION + SCORING
// ----------------------

function nextQuestion() {

    clearInterval(timer);

    let answer = document.getElementById("answer").value.trim();

    // Professional scoring logic
    if (answer.length >= 50) {
        score += 20;  // 5 questions × 20 = 100%
    }

    currentQuestion++;

    if (currentQuestion < questions[selectedRole].length) {
        showQuestion();
    } else {
        showResult();
    }
}


// ----------------------
// SHOW RESULT
// ----------------------

function showResult() {

    document.getElementById("interviewSection").style.display = "none";
    document.getElementById("resultSection").style.display = "block";

    let message = "";

    if (score >= 80) {
        message = "Excellent Performance! 🎉";
    }
    else if (score >= 50) {
        message = "Good Job 👍";
    }
    else {
        message = "Needs Improvement 💡";
    }

    document.getElementById("score").innerText =
        "Final Score: " + score + "%\n\n" + message;
}