let currentQuestionIndex = 0;
let time = questions.length * 15; // 15 seconds per question
let timerId;

// Elements
const timerEl = document.getElementById('time');
const startButton = document.getElementById('start');
const questionsEl = document.getElementById('questions');
const questionTitleEl = document.getElementById('question-title');
const choicesEl = document.getElementById('choices');
const endScreenEl = document.getElementById('end-screen');
const finalScoreEl = document.getElementById('final-score');
const initialsEl = document.getElementById('initials');
const submitBtn = document.getElementById('submit');
const feedbackEl = document.getElementById('feedback');

function startQuiz() {
  document.getElementById('start-screen').classList.add('hide');
  questionsEl.classList.remove('hide');
  timerId = setInterval(clockTick, 1000);
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionTitleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = '';
  currentQuestion.choices.forEach(function(choice, i) {
    const choiceButton = document.createElement('button');
    choiceButton.setAttribute('class', 'choice');
    choiceButton.setAttribute('value', choice);
    choiceButton.textContent = choice;
    choiceButton.onclick = questionClick;
    choicesEl.appendChild(choiceButton);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 10;
    if (time < 0) time = 0;
    timerEl.textContent = time;
    feedback('Wrong!', 'red');
  } else {
    feedback('Correct!', 'green');
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function clockTick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);
  questionsEl.classList.add('hide');
  endScreenEl.classList.remove('hide');
  finalScoreEl.textContent = time;
}

function saveHighscore() {
  const initials = initialsEl.value.trim();
  if (initials !== "") {
    const highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    const newScore = {
      score: time,
      initials: initials
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = 'highscores.html';
  }
}

function feedback(message, color) {
  feedbackEl.textContent = message;
  feedbackEl.style.color = color;
  feedbackEl.classList.remove('hide');
  setTimeout(() => {
    feedbackEl.classList.add('hide');
  }, 1000);
}

// Event listeners
startButton.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', saveHighscore);
initialsEl.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) { // 13 is the enter key
    saveHighscore();
  }
});