document.addEventListener("DOMContentLoaded", () => {
  const { kinds, cases, pluralities, inflect } = this.inflect;
  const maxNumber = 100;

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

  function generateQuestion() {
    const number = Math.floor(Math.random() * maxNumber);
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const caseName = cases[Math.floor(Math.random() * cases.length)];
    const plurality =
      pluralities[Math.floor(Math.random() * pluralities.length)];
    current = inflect(number, kind, caseName, plurality);

    // Update the question element
    document.getElementById("question").textContent = current.short;
    document.getElementById("answer").value = "";
    document.getElementById(
      "answer"
    ).placeholder = `${kind} ${plurality} ${caseName}`;

    // Reset submit button to checkmark
    updateSubmitEmoji("✓");

    // Update button state
    updateButtonState();
  }

  // Function to check the answer
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
      // Only show incorrect feedback when submit button is clicked
      addFeedbackClasses(false);
      document.getElementById("answer").value = correctAnswer;
      setTimeout(() => {
        removeFeedbackClasses();
        setTimeout(() => {
          generateQuestion();
        }, 1000);
      }, 3000);
    } else {
      // On keypress, just update the submit button emoji
      updateSubmitEmoji("🤷");
    }
  }

  // Add event listeners
  const answerInput = document.getElementById("answer");
  answerInput.addEventListener("input", () => {
    checkAnswer(true);
    updateButtonState();
  });
  document
    .getElementById("submit")
    .addEventListener("click", () => checkAnswer(false));

  // Generate initial question
  generateQuestion();
});
