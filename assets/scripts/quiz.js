import questions from "../quiz.json";

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerInput = document.getElementById("answer-input");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const feedbackContainer = document.getElementById("feedback-container");
const feedbackText = document.getElementById("feedback-text");
const correctAnswerText = document.getElementById("correct-answer-text");
const scoreDisplay = document.getElementById("score");
const inputContainer = document.getElementById("input-container");
const lastScoreContainer = document.getElementById("last-score-container");
const lastScoreDisplay = document.getElementById("last-score");

function loadLastScore() {
  const lastScore = localStorage.getItem("quizLastScore");
  if (lastScore !== null) {
    lastScoreDisplay.textContent = lastScore;
    lastScoreContainer.style.display = "block";
  }
}

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.q;
  answerInput.value = "";
  answerInput.focus();

  feedbackContainer.classList.add("hidden");
  inputContainer.classList.remove("hidden");
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.a;
  const normalizedCorrect = correctAnswer.toLowerCase();

  let isCorrect = false;

  const cleanUser = userAnswer.replace(/[^a-z0-9]/g, "");
  const cleanCorrect = normalizedCorrect.replace(/[^a-z0-9]/g, "");

  if (cleanUser && cleanCorrect.includes(cleanUser) && cleanUser.length > 3) {
    isCorrect = true;
  } else if (cleanUser === cleanCorrect) {
    isCorrect = true;
  }

  if (isCorrect) {
    score++;
    scoreDisplay.textContent = score;
    feedbackText.textContent = "Correto!";
    feedbackText.className = "correct";
    correctAnswerText.textContent = "";
  } else {
    feedbackText.textContent = "Incorreto!";
    feedbackText.className = "incorrect";
    correctAnswerText.textContent = `A resposta correta era: ${correctAnswer}`;
  }

  inputContainer.classList.add("hidden");
  feedbackContainer.classList.remove("hidden");

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "Ver Resultado Final";
  }
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  questionText.textContent = "Quiz Terminado!";
  inputContainer.classList.add("hidden");
  feedbackContainer.classList.add("hidden");

  localStorage.setItem("quizLastScore", `${score} / ${questions.length}`);

  const resultMessage = document.createElement("div");
  resultMessage.innerHTML = `
    <h3>Sua pontuação final: ${score} / ${questions.length}</h3>
    <button onclick="location.reload()">Tentar Novamente</button>
  `;
  document.getElementById("quiz-container").appendChild(resultMessage);
}

submitBtn.addEventListener("click", checkAnswer);
answerInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkAnswer();
});
nextBtn.addEventListener("click", nextQuestion);

loadLastScore();
loadQuestion();
