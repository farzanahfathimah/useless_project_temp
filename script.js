 const questions = [
    "Do you often feel afraid of how the other person will react to you?",

    "Do they repeatedly hurt you and then become unusually loving or apologetic?",

    "Do you find yourself making excuses for their harmful behaviour?",

    "Do you feel responsible for keeping the relationship peaceful?",

    "Have you become distant from friends or family because of the relationship?",

    "Do you feel that you cannot leave even though you know the relationship is unhealthy?",

    "Do you frequently feel confused about whether the relationship is good or bad for you?",

    "Do you feel like you must constantly change yourself to avoid conflict?"
];


let currentQuestion = 0;
let score = 0;


function answer(value) {

    score += value;

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    updateQuestion();
}


function updateQuestion() {

    const questionElement = document.getElementById("question");
    const numberElement = document.getElementById("question-number");
    const progressBar = document.getElementById("progress-bar");

    questionElement.textContent = questions[currentQuestion];

    numberElement.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";
}


function showResult() {

    document.getElementById("question-area").classList.add("hidden");

    const result = document.getElementById("result");

    result.classList.remove("hidden");

    const title = document.getElementById("result-title");
    const text = document.getElementById("result-text");


    if (score <= 2) {

        title.textContent = "Few warning signs reported";

        text.textContent =
            "Your answers indicate relatively few of the warning signs included in this awareness check. This does not determine whether a relationship is healthy or unhealthy. Continue paying attention to how you feel, whether you feel respected, and whether you feel safe.";

    }

    else if (score <= 5) {

        title.textContent = "Some warning signs are present";

        text.textContent =
            "Your answers indicate that some concerning patterns may be present. Consider talking with someone you trust and learning more about healthy relationship boundaries and emotional safety.";

    }

    else {

        title.textContent = "Several warning signs are present";

        text.textContent =
            "Your answers indicate several patterns that can occur in unhealthy or harmful relationships. This result is not a diagnosis, but it may be worth speaking with a trusted person or qualified professional. If you are in immediate danger, seek local emergency help.";
    }
}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    document.getElementById("question-area").classList.remove("hidden");

    document.getElementById("result").classList.add("hidden");

    updateQuestion();
}


updateQuestion();