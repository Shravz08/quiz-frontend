const questions = [
    {
        question: "What does JVM stand for?",
        options: ["Java Virtual Machine", "Java Variable Method", "Just Virtual Machine", "Java Verified Mode"],
        answer: 0
    },
    {
        question: "Which company developed Java?",
        options: ["Microsoft", "Sun Microsystems", "Google", "IBM"],
        answer: 1
    },
    {
        question: "Which keyword is used to inherit a class in Java?",
        options: ["this", "super", "extends", "implements"],
        answer: 2
    }
];

let currentIndex = 0;
let score = 0;

function loadQuestion() {
    let q = questions[currentIndex];
    document.getElementById("question").innerText = q.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
        let btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === questions[currentIndex].answer) {
        score++;
    }
    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
        loadQuestion();
    } else {
        document.getElementById("quiz-box").style.display = "none";
        document.getElementById("score-box").style.display = "block";
        document.getElementById("score").innerText = `${score}/${questions.length}`;
    }
}

function restartQuiz() {
    currentIndex = 0;
    score = 0;
    document.getElementById("score-box").style.display = "none";
    document.getElementById("quiz-box").style.display = "block";
    loadQuestion();
}

loadQuestion();
