document.addEventListener("DOMContentLoaded", () => {
  const { kinds, cases, pluralities, inflect } = this.inflect;
  const { generate } = this.question;

  let current = {};

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

  function generateQuestion() {
    question = generate();
    current = inflect(question);

    document.getElementById("question").textContent = current.short;
    document.getElementById("answer").value = "";
    document.getElementById("answer").placeholder = placeholderText(question);

    updateSubmitEmoji("✓");

    updateButtonState();
  }

  function checkAnswer(isKeypress = false) {
    const userAnswer = document
      .getElementById("answer")
      .value.toLowerCase()
      .trim();
    const correctAnswer = current.long;

    if (userAnswer === correctAnswer) {
      addFeedbackClasses(true);
      setTimeout(() => {
        removeFeedbackClasses();
        generateQuestion();
      }, 1000);
    } else if (!isKeypress) {
      addFeedbackClasses(false);
      document.getElementById("answer").value = correctAnswer;
      setTimeout(() => {
        removeFeedbackClasses();
        setTimeout(() => {
          generateQuestion();
        }, 1000);
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
