document.addEventListener("DOMContentLoaded", () => {
  const { inflect } = this.inflect;
  const { generateExercises, right, wrong, progress } = this.question;

  let question;
  let answer;
  let currentQuestions =
    JSON.parse(localStorage.getItem("currentQuestions")) || [];
  let showingCorrectAnswer = false;
  let holdAnswer = "";

  function updateButtonState() {
    const input = document.getElementById("answer");
    const dontknowButton = document.getElementById("dontknow");
    dontknowButton.disabled = holdAnswer ? true : input.value.trim() === "";
  }

  function addFeedbackClasses(className) {
    document.body.classList.add(className);
    document.querySelector(".container").classList.add(className);
    document.querySelector("h1").classList.add(className);
    document.querySelector("input").classList.add(className);
    document.querySelector("button").classList.add(className);
    document.querySelector(".answer-hint").classList.add(className);
  }

  function removeFeedbackClasses(classNames) {
    document.body.classList.remove(classNames);
    document.querySelector(".container").classList.remove(classNames);
    document.querySelector("h1").classList.remove(classNames);
    document.querySelector("input").classList.remove(classNames);
    document.querySelector("button").classList.remove(classNames);
    document.querySelector(".answer-hint").classList.remove(classNames);
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

  function updateDontknowEmoji(emoji) {
    document.getElementById("dontknow-emoji").textContent = emoji;
  }

  function showQuestion(selectedQuestion) {
    question = selectedQuestion;
    answer = inflect(question);

    document.getElementById("question").textContent = answer.short;
    document.getElementById("answer").disabled = false;
    document.getElementById("answer").value = "";
    document.querySelector(".answer-hint").textContent = question.title;

    document.getElementById("choice-container").classList.remove("visible");
    document.getElementById("question-container").classList.add("visible");
    updateButtonState();
    document.getElementById("answer").focus();
  }

  function setCurrentQuestions(questions) {
    currentQuestions = questions;
    localStorage.setItem("currentQuestions", JSON.stringify(questions));
    nextQuestionOrChoices();
  }

  function nextQuestionOrChoices() {
    if (currentQuestions.length > 0) {
      showQuestion(currentQuestions[0]);
      return;
    }
    const exercises = generateExercises();
    showChoiceButtons(exercises);
  }

  function showChoiceButtons({ practice, newTopics }) {
    const choiceContainer = document.getElementById("choice-container");
    choiceContainer.innerHTML = "";

    if (practice) {
      const practiceHeader = document.createElement("div");
      practiceHeader.className = "choice-header";
      practiceHeader.textContent = "Jatka harjoittelua";
      choiceContainer.appendChild(practiceHeader);

      const practiceButton = document.createElement("button");
      practiceButton.className = "choice-button known-topic";
      practiceButton.textContent = inflect(practice.questions[0]).short;
      practiceButton.onclick = () => {
        setCurrentQuestions(practice.questions);
      };
      choiceContainer.appendChild(practiceButton);

      const practiceHint = document.createElement("div");
      practiceHint.className = "choice-hint";
      practiceHint.textContent = practice.title;
      choiceContainer.appendChild(practiceHint);
    }

    if (newTopics.length > 0) {
      const newHeader = document.createElement("div");
      newHeader.className = "choice-header";

      const headerText = document.createElement("span");
      headerText.className = "choice-header-text";
      headerText.textContent =
        newTopics.length > 1 ? "Avaa uudet aiheet" : "Avaa uusi aihe";
      newHeader.appendChild(headerText);

      const progressText = document.createElement("span");
      progressText.className = "choice-hint progress-text";
      const { open, total } = progress();
      progressText.textContent = `${open} / ${total}`;
      newHeader.appendChild(progressText);

      choiceContainer.appendChild(newHeader);

      for (const topic of newTopics) {
        const button = document.createElement("button");
        button.className = "choice-button new-topic";
        if (topic.reward) {
          button.classList.add("reward");
        }
        button.textContent = inflect(topic.questions[0]).short;
        button.onclick = () => {
          setCurrentQuestions(topic.questions);
          if (topic.reward) {
            addFeedbackClasses("reward");
            const emojis = topic.reward;
            for (let j = 0; j < emojis.length * 5; j++) {
              setTimeout(() => {
                createFlyingEmoji(
                  emojis[Math.floor(Math.random() * emojis.length)]
                );
              }, Math.random() * 1500);
            }
            setTimeout(() => {
              removeFeedbackClasses("reward");
            }, 3500);
          }
        };
        choiceContainer.appendChild(button);
        const hint = document.createElement("div");
        hint.className = "choice-hint";
        hint.textContent = topic.title;
        choiceContainer.appendChild(hint);
      }
    }

    document.getElementById("question-container").classList.remove("visible");
    choiceContainer.classList.add("visible");
  }

  function checkAnswer(source) {
    const userAnswer = document.getElementById("answer").value;
    const userAnswerNormalized = userAnswer.toLowerCase().trim();

    if (holdAnswer) {
      document.getElementById("answer").value = holdAnswer;
    } else if (showingCorrectAnswer) {
      if (source === "button") {
        removeFeedbackClasses("incorrect");
        setCurrentQuestions([
          ...currentQuestions.slice(1),
          { ...currentQuestions[0], repeated: true },
        ]);
        showingCorrectAnswer = false;
      }
    } else if (source === "input") {
      if (userAnswerNormalized === answer.long) {
        if (!question.repeated) {
          right(question);
        }
        updateDontknowEmoji("✓");
        addFeedbackClasses("correct");
        holdAnswer = userAnswer;
        if (currentQuestions.length === 1) {
          document.getElementById("answer").disabled = true;
        }
        updateButtonState();
        setTimeout(() => {
          holdAnswer = "";
          removeFeedbackClasses("correct");
          setCurrentQuestions(currentQuestions.slice(1));
        }, 1000);
      } else {
        updateDontknowEmoji("🤔");
      }
    } else if (source === "button") {
      if (!question.repeated) {
        wrong(question);
      }
      addFeedbackClasses("incorrect");
      document.getElementById("answer").value = answer.long;
      document.getElementById("answer").disabled = true;
      updateDontknowEmoji("✓");
      showingCorrectAnswer = true;
    }
  }

  const answerInput = document.getElementById("answer");
  answerInput.addEventListener("input", () => {
    checkAnswer("input");
    updateButtonState();
  });
  document.getElementById("dontknow").addEventListener("click", (event) => {
    if (!event.currentTarget.disabled) {
      checkAnswer("button");
    }
  });

  nextQuestionOrChoices();
});
