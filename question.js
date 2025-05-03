(function (exports) {
  const settings = {
    kind: ["perus", "jarjestys"],
    plurality: ["yksikko", "monikko"],
    caseGroup: [
      ["nominatiivi"],
      ["genetiivi", "partitiivi"],
      [
        {
          name: "paikallissijat",
          cases: [
            "inessiivi",
            "elatiivi",
            "adessiivi",
            "ablatiivi",
            "allatiivi",
          ],
        },
        "illatiivi",
      ],
      ["essiivi", "translatiivi"],
    ],
    range: [11, 20, 100, 200, 1000, 2100, 10000],
    statsVersion: 1,
    practice: {
      questionCount: 10,
      minWeight: 0.1,
      decayFactor: 0.8,
    },
    newTopics: {
      initialIndex: "0,0,0,0",
      maxCount: 3,
      questionCountDefault: 5,
      questionCountFirstRange: 11,
      questionCountLocatives: 10,
    },
  };

  const indexToString = ({ kind, plurality, caseGroup, range }) =>
    `${kind},${plurality},${caseGroup},${range}`;

  const parseIndex = (key) => {
    const [kind, plurality, caseGroup, range] = key
      .split(",")
      .map((s) => parseInt(s, 10));
    return {
      kind,
      plurality,
      caseGroup,
      range,
    };
  };

  const resolveIndex = (index) => {
    const kind = settings.kind[index.kind];
    const plurality = settings.plurality[index.plurality];
    const caseGroup = settings.caseGroup.flat()[index.caseGroup];
    const maxNumberIndex = index.range;

    const minNumber =
      maxNumberIndex > 0 ? settings.range[maxNumberIndex - 1] : 0;
    const maxNumber = settings.range[maxNumberIndex];
    return {
      kind,
      plurality,
      caseGroup,
      minNumber,
      maxNumber,
    };
  };

  const stats = (() => {
    let stats = JSON.parse(localStorage.getItem("stats")) || {};
    if (stats.version !== settings.statsVersion) {
      stats = {
        version: settings.statsVersion,
        topics: {},
      };
    }
    return stats;
  })();

  if (window.location.hash === "#stats") {
    var par = document.createElement("p");
    var text = document.createTextNode(JSON.stringify(stats));
    par.appendChild(text);
    document.body.appendChild(par);
  }

  const progress = () => ({
    open: Object.keys(stats.topics).length,
    total:
      settings.kind.length *
      settings.plurality.length *
      settings.caseGroup.flat().length *
      settings.range.length,
  });

  const knownTopicIndex = () => {
    const weight = (topicStats) => {
      const { minWeight, decayFactor } = settings.practice;
      const { right, wrong, streak } = topicStats;
      return (
        (Math.pow(decayFactor, streak) * (wrong + 1)) / (right + 1) + minWeight
      );
    };
    let totalWeight = 0;
    for (const t of Object.values(stats.topics)) {
      totalWeight += weight(t);
    }
    const rnd = Math.random() * totalWeight;
    let inc = 0;
    for (const [key, t] of Object.entries(stats.topics)) {
      inc += weight(t);
      if (inc > rnd) {
        return key;
      }
    }
    throw Error("this should not have happened 😅");
  };

  const newTopicIndexes = () => {
    if (Object.keys(stats.topics).length === 0) {
      return [settings.newTopics.initialIndex];
    }
    const candidateIndexes = (dim, i) => {
      if (!Array.isArray(settings[dim][0])) {
        if (i + 1 === settings[dim].length) {
          return [];
        }
        return [i + 1];
      }
      let j = 0;
      for (const group of settings[dim]) {
        if (j > i) {
          return group.map((_, k) => j + k);
        }
        j += group.length;
      }
      return [];
    };
    const dependencyIndexes = (dim, i) => {
      if (!Array.isArray(settings[dim][0])) {
        if (i === 0) {
          return [];
        }
        return [i - 1];
      }
      let j = 0;
      let prevGroup = [];
      for (const group of settings[dim]) {
        if (j + group.length > i) {
          return prevGroup.map((_, k) => j - k - 1);
        }
        j += group.length;
        prevGroup = group;
      }
      return [];
    };

    const consider = {};
    const reject = {};
    for (const key of Object.keys(stats.topics)) {
      const index = parseIndex(key);
      for (const [dim, i] of Object.entries(index)) {
        candidates: for (const candidateIdx of candidateIndexes(dim, i)) {
          const candidate = { ...index, [dim]: candidateIdx };
          const candidateKey = indexToString(candidate);
          if (
            stats.topics[candidateKey] ||
            consider[candidateKey] ||
            reject[candidateKey]
          ) {
            continue;
          }
          for (const [cdim, j] of Object.entries(candidate)) {
            for (const dependencyIdx of dependencyIndexes(cdim, j)) {
              const dependency = { ...candidate, [cdim]: dependencyIdx };
              const dependencyKey = indexToString(dependency);
              if (stats.topics[dependencyKey]) {
                continue;
              }
              reject[candidateKey] = true;
              continue candidates;
            }
          }
          consider[candidateKey] = candidate;
        }
      }
    }
    const results = [];
    let n = settings.newTopics.maxCount;
    while (n > 0 && Object.keys(consider).length > 0) {
      const keys = Object.keys(consider);
      const pick = keys[Math.floor(Math.random() * keys.length)];
      results.push(pick);
      delete consider[pick];
      n--;
    }
    return results;
  };

  const titleForTopic = ({
    kind,
    caseName,
    plurality,
    minNumber,
    maxNumber,
  }) => {
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
  };

  const shuffle = (array) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      const tmp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = tmp;
    }
  };

  const generateQuestions = (topicIndex, mode) => {
    const { kind, plurality, caseGroup, minNumber, maxNumber } = resolveIndex(
      parseIndex(topicIndex)
    );

    const numbers = [];
    if (mode === "new-topic" && maxNumber === settings.range[0]) {
      for (let i = 0; i < settings.newTopics.questionCountFirstRange; i++) {
        numbers.push(i);
      }
      shuffle(numbers);
    } else {
      let count;
      if (mode === "practice") {
        count = 1;
      } else if (caseGroup.names === "paikallissijat") {
        count = settings.newTopics.questionCountLocatives;
      } else {
        count = settings.newTopics.questionCountDefault;
      }
      while (numbers.length < Math.min(count, maxNumber - minNumber)) {
        let number =
          Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
        if (numbers.includes(number)) {
          continue;
        }
        numbers.push(number);
      }
    }

    let caseNames = caseGroup;
    if (caseGroup.cases) {
      caseNames = [...caseGroup.cases];
      shuffle(caseNames);
      while (caseNames.length < numbers.length) {
        caseNames.push(...caseGroup.cases);
      }
      caseNames = caseNames.slice(0, numbers.length);
      shuffle(caseNames);
    }

    return numbers.map((number, i) => {
      const caseName = typeof caseNames === "string" ? caseNames : caseNames[i];
      const title = titleForTopic({
        kind,
        caseName,
        plurality,
        minNumber,
        maxNumber,
      });
      return {
        number,
        kind,
        caseName,
        plurality,
        minNumber,
        maxNumber,
        topicIndex,
        title,
      };
    });
  };

  const generatePractice = () => {
    if (Object.keys(stats.topics).length === 0) {
      return null;
    }
    return {
      title: `Tee ${settings.practice.questionCount} satunnaista tehtävää`,
      questions: Array(settings.practice.questionCount)
        .fill()
        .map(() => knownTopicIndex())
        .flatMap((topicIndex) => generateQuestions(topicIndex, "practice")),
    };
  };

  const generateNewTopics = () => {
    return newTopicIndexes().map((topicIndex) => {
      const topic = resolveIndex(parseIndex(topicIndex));
      return {
        title: titleForTopic({
          ...topic,
          caseName:
            typeof topic.caseGroup === "string"
              ? topic.caseGroup
              : topic.caseGroup.name,
        }),
        questions: generateQuestions(topicIndex, "new-topic"),
      };
    });
  };

  const addRewardsForTopic = (topic) => {
    const { open, total } = progress();
    if (open + 1 === total) {
      topic.reward = ["👑", "🏆", "🏅", "💎", "⭐️", "💰", "💸"];
      return topic;
    }
    const question = topic.questions[0];
    if (question.minNumber === 100 && question.caseName === "essiivi") {
      topic.questions[0].number = 100;
      topic.reward = ["💯", ":NA"];
    }
    return topic;
  };

  exports.generateExercises = () => {
    return {
      practice: generatePractice(),
      newTopics: generateNewTopics().map(addRewardsForTopic),
    };
  };

  exports.right = (question) => {
    const statsForTopic = stats.topics[question.topicIndex] || {
      right: 0,
      wrong: 0,
      streak: 0,
    };
    statsForTopic.streak++;
    statsForTopic.right++;
    stats.topics[question.topicIndex] = statsForTopic;
    localStorage.setItem("stats", JSON.stringify(stats));
  };

  exports.wrong = (question) => {
    const statsForTopic = stats.topics[question.topicIndex] || {
      right: 0,
      wrong: 0,
    };
    statsForTopic.streak = 0;
    statsForTopic.wrong++;
    stats.topics[question.topicIndex] = statsForTopic;
    localStorage.setItem("stats", JSON.stringify(stats));
  };

  exports.progress = progress;
})(typeof exports === "undefined" ? (this["question"] = {}) : exports);
