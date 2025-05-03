document.addEventListener("DOMContentLoaded", () => {
  const { kinds, cases, pluralities, inflect } = this.inflect;
  const { generate, right, wrong } = this.question;

  let question;
  let answer;
  let currentQuestions = [];

  function updateButtonState() {
    const input = document.getElementById("answer");
    const submitButton = document.getElementById("submit");
    submitButton.disabled = input.value.trim() === "";
  }

  function addFeedbackClasses(isCorrect) {
    const className = isCorrect ? "correct" : "incorrect";
    document.body.classList.add(className);
    document.querySelector(".container").classList.add(className);
    document.querySelector("h1").classList.add(className);
    document.querySelector("input").classList.add(className);
    document.querySelector("button").classList.add(className);
  }

  function removeFeedbackClasses() {
    document.body.classList.remove("correct", "incorrect");
    document
      .querySelector(".container")
      .classList.remove("correct", "incorrect");
    document.querySelector("h1").classList.remove("correct", "incorrect");
    document.querySelector("input").classList.remove("correct", "incorrect");
    document.querySelector("button").classList.remove("correct", "incorrect");
  }

  function updateSubmitEmoji(emoji) {
    document.getElementById("submit-emoji").textContent = emoji;
  }

  function placeholderText({ kind, caseName, plurality }) {
    let pluralityText = {
      yksikko: "Yksikkö",
      monikko: "Monikko",
    };
    let kindText = {
      perus: "perusluku",
      jarjestys: "järjestysluku",
    };
    return `${pluralityText[plurality]} ${caseName} ${kindText[kind]}`;
  }

  function showQuestion(selectedQuestion) {
    question = selectedQuestion;
    answer = inflect(question);

    document.getElementById("question").textContent = answer.short;
    document.getElementById("answer").value = "";
    document.getElementById("answer").placeholder = placeholderText(question);

    document.getElementById("choice-container").classList.remove("visible");
    document.getElementById("question-container").classList.add("visible");
    updateButtonState();
  }

  function showChoiceButtons(questions) {
    const choiceContainer = document.getElementById("choice-container");
    choiceContainer.innerHTML = "";

    questions.forEach((q) => {
      const button = document.createElement("button");
      button.className = "choice-button";
      button.textContent = inflect(q).short;
      button.onclick = () => showQuestion(q);
      choiceContainer.appendChild(button);
    });

    document.getElementById("question-container").classList.remove("visible");
    choiceContainer.classList.add("visible");
  }

  function generateQuestion() {
    currentQuestions = generate();

    if (currentQuestions.length === 1) {
      showQuestion(currentQuestions[0]);
    } else {
      showChoiceButtons(currentQuestions);
    }
  }

  function checkAnswer(isKeypress = false) {
    const userAnswer = document
      .getElementById("answer")
      .value.toLowerCase()
      .trim();
    const correctAnswer = answer.long;

    if (userAnswer === correctAnswer) {
      right(question);
      updateSubmitEmoji("✓");
      addFeedbackClasses(true);
      setTimeout(() => {
        removeFeedbackClasses();
        generateQuestion();
      }, 1000);
    } else if (!isKeypress) {
      wrong(question);
      addFeedbackClasses(false);
      document.getElementById("answer").value = correctAnswer;
      setTimeout(() => {
        updateSubmitEmoji("✓");
        removeFeedbackClasses();
        generateQuestion();
      }, 3000);
    } else {
      updateSubmitEmoji("🤔");
    }
  }

  const answerInput = document.getElementById("answer");
  answerInput.addEventListener("input", () => {
    checkAnswer(true);
    updateButtonState();
  });
  document
    .getElementById("submit")
    .addEventListener("click", () => checkAnswer(false));

  generateQuestion();
});
