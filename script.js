const quizData = {
  java: [
    { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Method", "Just Virtual Machine", "Java Verified Mode"], answer: 0 },
    { question: "Which company developed Java?", options: ["Microsoft", "Sun Microsystems", "Google", "IBM"], answer: 1 },
    { question: "Which keyword is used to inherit a class in Java?", options: ["this", "super", "extends", "implements"], answer: 2 }
  ],
  iot: [
    { question: "IoT stands for?", options: ["Internet of Things", "Internet on Time", "Integration of Technology", "Input of Tools"], answer: 0 },
    { question: "Which protocol is widely used in IoT?", options: ["HTTP", "MQTT", "FTP", "SMTP"], answer: 1 },
    { question: "IoT devices are connected via?", options: ["LAN", "Internet", "Bluetooth", "All of these"], answer: 3 }
  ],
  html: [
    { question: "HTML stands for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "High Text Markup Language", "None"], answer: 1 },
    { question: "Which tag creates a paragraph in HTML?", options: ["<head>", "<p>", "<body>", "<br>"], answer: 1 },
    { question: "Which attribute sets an image source?", options: ["src", "href", "link", "img"], answer: 0 }
  ]
};

let selectedSubject = null;
let currentIndex = 0;
let score = 0;

// 🟢 Go to Subject Selection
function goToSubjects() {
  document.getElementById("start-page").style.display = "none";
  document.getElementById("subject-page").style.display = "block";
}

// 🟡 Subject Selected
function selectSubject(subject) {
  selectedSubject = subject;
  document.getElementById("subject-page").style.display = "none";
  document.getElementById("quiz-box").style.display = "block";
  loadQuestion();
}

// 🧩 Load Question
function loadQuestion() {
  const questions = quizData[selectedSubject];
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

  updateProgress();
}

// ✅ Check Answer
function checkAnswer(selected) {
  const questions = quizData[selectedSubject];
  if (selected === questions[currentIndex].answer) {
    score++;
  }
  document.getElementById("next-btn").disabled = false;
}

// ⏭ Next Question
function nextQuestion() {
  const questions = quizData[selectedSubject];
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

// 📊 Progress Bar
function updateProgress() {
  const questions = quizData[selectedSubject];
  const total = questions.length;
  const current = currentIndex + 1;
  const percent = (current / total) * 100;
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-text").innerText = `Question ${current} of ${total}`;
}

// 🟣 Show Score
function showScore() {
  document.getElementById("quiz-box").style.display = "none";
  document.getElementById("score-box").style.display = "block";
  document.getElementById("score").innerText = `${score}/${quizData[selectedSubject].length}`;
}

// 🔁 Restart
function restartQuiz() {
  selectedSubject = null;
  currentIndex = 0;
  score = 0;
  document.getElementById("score-box").style.display = "none";
  document.getElementById("start-page").style.display = "block";
}
