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
    resolveIndex: (index) => {
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
    },
    statsVersion: 1,
    practice: {
      questionCount: 10,
      minWeight: 0.1,
      decayFactor: 0.8,
    },
    newTopics: {
      initialIndex: "0,0,0,0",
      maxCount: 3,
      questionCount: 5,
    },
  };

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

  const indexToString = ({ kind, plurality, caseGroup, range }) =>
    `${kind},${plurality},${caseGroup},${range}`;

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

  const questionForTopic = (index, isNewTopic) => {
    const kind = settings.kind[index.kind];
    const plurality = settings.plurality[index.plurality];
    const caseName = settings.caseName.flat()[index.caseName];
    const maxNumberIndex = index.range;

    const minNumber =
      maxNumberIndex > 0 ? settings.range[maxNumberIndex - 1] : 0;
    const maxNumber = settings.range[maxNumberIndex];
    let number =
      Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;

    let reward;

    if (isNewTopic) {
      const { open, total } = progress();
      if (open + 1 === total) {
        reward = ["👑", "🏆", "🏅", "💎", "⭐️", "💰", "💸"];
      } else if (minNumber === 100 && caseName === "essiivi") {
        reward = ["💯", ":NA"];
        number = 100;
      }
    }

    return {
      sequence: stats.sequence + 1,
      topicIndex: index,
      number: number,
      range: [minNumber, maxNumber],
      kind: kind,
      caseName: caseName,
      plurality: plurality,
      reward: reward,
    };
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

  const generateQuestions = (topicIndex, count) => {
    const { kind, plurality, caseGroup, minNumber, maxNumber } =
      settings.resolveIndex(parseIndex(topicIndex));
    const caseNames =
      typeof caseGroup === "string" ? [caseGroup] : caseGroup.cases;

    const numbers = [];
    while (numbers.length < Math.min(count, maxNumber - minNumber)) {
      let number =
        Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
      if (numbers.includes(number)) {
        continue;
      }
      numbers.push(number);
    }

    return numbers.map((number) => {
      const caseName = caseNames[Math.floor(Math.random() * caseNames.length)];
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
        .flatMap((topicIndex) => generateQuestions(topicIndex, 1)),
    };
  };

  const generateNewTopics = () => {
    return newTopicIndexes().map((topicIndex) => {
      const topic = settings.resolveIndex(parseIndex(topicIndex));
      return {
        title: titleForTopic({
          ...topic,
          caseName:
            typeof topic.caseGroup === "string"
              ? topic.caseGroup
              : topic.caseGroup.name,
        }),
        questions: generateQuestions(
          topicIndex,
          settings.newTopics.questionCount
        ),
      };
    });
  };

  exports.generateExercises = () => {
    return {
      practice: generatePractice(),
      newTopics: generateNewTopics(),
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
