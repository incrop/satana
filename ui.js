document.addEventListener("DOMContentLoaded", () => {
  const { inflect } = this.inflect;
  const { generate, right, wrong } = this.question;

  let question;
  let answer;
  let currentQuestions = [];
  let showingCorrectAnswer = false;

  function updateButtonState() {
    const input = document.getElementById("answer");
    const dontknowButton = document.getElementById("dontknow");
    dontknowButton.disabled = input.value.trim() === "";
  }

  function addFeedbackClasses(isCorrect) {
    const className = isCorrect ? "correct" : "incorrect";
    document.body.classList.add(className);
    document.querySelector(".container").classList.add(className);
    document.querySelector("h1").classList.add(className);
    document.querySelector("input").classList.add(className);
    document.querySelector("button").classList.add(className);
  }

  function addRewardClasses() {
    document.body.classList.add("reward");
    document.querySelector(".container").classList.add("reward");
    document.querySelector("h1").classList.add("reward");
    document.querySelector("input").classList.add("reward");
    document.querySelector("button").classList.add("reward");
  }

  function removeRewardClasses() {
    document.body.classList.remove("reward");
    document.querySelector(".container").classList.remove("reward");
    document.querySelector("h1").classList.remove("reward");
    document.querySelector("input").classList.remove("reward");
    document.querySelector("button").classList.remove("reward");
  }

  function createFlyingEmoji(emoji) {
    const emojiElement = document.createElement("div");
    emojiElement.className = "reward-emoji";
    emojiElement.textContent = emoji;
    const startX = Math.random() * window.innerWidth;
    emojiElement.style.left = `${startX}px`;
    document.body.appendChild(emojiElement);
    setTimeout(() => {
      emojiElement.remove();
    }, 3000);
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

  function updateDontknowEmoji(emoji) {
    document.getElementById("dontknow-emoji").textContent = emoji;
  }

  function placeholderText({
    kind,
    caseName,
    plurality,
    range: [minNumber, maxNumber],
  }) {
    let kindText = {
      perus: "Perusluvut",
      jarjestys: "Järjestysluvut",
    };
    let pluralityText = {
      yksikko: "yksikön",
      monikko: "monikon",
    };
    return `${kindText[kind]} ${minNumber}-${maxNumber - 1}: ${
      pluralityText[plurality]
    } ${caseName}`;
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
    document.getElementById("answer").focus();
  }

  function showChoiceButtons(questions) {
    const choiceContainer = document.getElementById("choice-container");
    choiceContainer.innerHTML = "";

    const knownHeader = document.createElement("div");
    knownHeader.className = "choice-header";
    knownHeader.textContent = "Jatka harjoittelua";
    choiceContainer.appendChild(knownHeader);

    const knownButton = document.createElement("button");
    knownButton.className = "choice-button known-topic";
    knownButton.textContent = inflect(questions[0]).short;
    knownButton.onclick = () => {
      showQuestion(questions[0]);
    };
    choiceContainer.appendChild(knownButton);
    const knownHint = document.createElement("div");
    knownHint.className = "choice-hint";
    knownHint.textContent = placeholderText(questions[0]);
    choiceContainer.appendChild(knownHint);

    const newHeader = document.createElement("div");
    newHeader.className = "choice-header";
    newHeader.textContent = "tai avaa uudet aiheet";
    choiceContainer.appendChild(newHeader);

    for (let i = 1; i < questions.length; i++) {
      const button = document.createElement("button");
      button.className = "choice-button new-topic";
      if (questions[i].reward) {
        button.classList.add("reward");
      }
      button.textContent = inflect(questions[i]).short;
      button.onclick = () => {
        if (questions[i].reward) {
          addRewardClasses();
          const emojis = questions[i].reward;
          for (let j = 0; j < emojis.length * 5; j++) {
            setTimeout(() => {
              createFlyingEmoji(
                emojis[Math.floor(Math.random() * emojis.length)]
              );
            }, Math.random() * 1500);
          }
          setTimeout(() => {
            removeRewardClasses();
            showQuestion(questions[i]);
          }, 3500);
          return;
        }
        showQuestion(questions[i]);
      };
      choiceContainer.appendChild(button);
      const hint = document.createElement("div");
      hint.className = "choice-hint";
      hint.textContent = placeholderText(questions[i]);
      choiceContainer.appendChild(hint);
    }

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

  function checkAnswer(source) {
    const userAnswer = document
      .getElementById("answer")
      .value.toLowerCase()
      .trim();
    const correctAnswer = answer.long;

    if (showingCorrectAnswer) {
      if (source === "button") {
        removeFeedbackClasses();
        generateQuestion();
        showingCorrectAnswer = false;
      }
    } else if (source === "input") {
      if (userAnswer === correctAnswer) {
        right(question);
        updateDontknowEmoji("✓");
        addFeedbackClasses(true);
        setTimeout(() => {
          removeFeedbackClasses();
          generateQuestion();
        }, 1000);
      } else {
        updateDontknowEmoji("🤔");
      }
    } else if (source === "button") {
      wrong(question);
      addFeedbackClasses(false);
      document.getElementById("answer").value = correctAnswer;
      updateDontknowEmoji("✓");
      showingCorrectAnswer = true;
    }
  }

  const answerInput = document.getElementById("answer");
  answerInput.addEventListener("input", () => {
    checkAnswer("input");
    updateButtonState();
  });
  document
    .getElementById("dontknow")
    .addEventListener("click", () => checkAnswer("button"));

  generateQuestion();
});
