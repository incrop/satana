(function (exports) {
  const settings = {
    kind: ["perus", "jarjestys"],
    plurality: ["yksikko", "monikko"],
    caseName: [
      ["nominatiivi"],
      ["genetiivi", "partitiivi"],
      [
        "inessiivi",
        "elatiivi",
        "illatiivi",
        "adessiivi",
        "ablatiivi",
        "allatiivi",
      ],
      ["essiivi", "translatiivi"],
    ],
    range: [11, 20, 100, 200, 1000, 2100, 10000],
    choices: {
      count: 3,
      interval: 5,
      rightRate: 0.9,
    },
  };

  const stats = (() => {
    const statsStr = localStorage.getItem("stats");
    if (statsStr) {
      return JSON.parse(statsStr);
    }
    const stats = {
      sequence: 0,
      topics: {
        // Indexes for kind, plurality, caseName, range
        "0,0,0,0": {
          right: 0,
          wrong: 0,
        },
      },
    };
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
    total: settings.kind.length *
      settings.plurality.length *
      settings.caseName.flat().length *
      settings.range.length
  })

  const parseIndex = (key) => {
    const [kind, plurality, caseName, range] = key
      .split(",")
      .map((s) => parseInt(s, 10));
    return {
      kind,
      plurality,
      caseName,
      range,
    };
  };

  const indexToString = ({ kind, plurality, caseName, range }) =>
    `${kind},${plurality},${caseName},${range}`;

  const knownTopicIndex = () => {
    let totalWeight = 0;
    for (const t of Object.values(stats.topics)) {
      totalWeight += (t.wrong + 1) / (t.right + 1);
    }
    const rnd = Math.random() * totalWeight;
    let inc = 0;
    for (const [key, t] of Object.entries(stats.topics)) {
      inc += (t.wrong + 1) / (t.right + 1);
      if (inc > rnd) {
        return parseIndex(key);
      }
    }
    throw Error("this should not have happened 😅");
  };

  const newTopicIndexes = () => {
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
    for (const [key, { right, wrong }] of Object.entries(stats.topics)) {
      if (right + wrong < settings.choices.interval) {
        continue;
      }
      if (right / (right + wrong) < settings.choices.rightRate) {
        continue;
      }
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
    let n = settings.choices.count;
    while (n > 0 && Object.keys(consider).length > 0) {
      const keys = Object.keys(consider);
      const pick = keys[Math.floor(Math.random() * keys.length)];
      results.push(consider[pick]);
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
      const { open, total } = progress()
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

  let previousNumbers = [-1, -1, -1, -1, -1];

  exports.generate = () => {
    const questions = [];
    while (true) {
      const knownQuestion = questionForTopic(knownTopicIndex());
      if (!previousNumbers.includes(knownQuestion.number)) {
        questions.push(knownQuestion);
        previousNumbers.push(knownQuestion.number);
        previousNumbers.shift();
        break;
      }
    }
    if (stats.sequence % settings.choices.interval === 0) {
      questions.push(
        ...newTopicIndexes().map((index) => questionForTopic(index, true))
      );
    }
    return questions;
  };

  exports.right = (question) => {
    const key = indexToString(question.topicIndex);
    if (stats.topics[key]) {
      stats.topics[key].right++;
    } else {
      stats.topics[key] = { right: 1, wrong: 0 };
    }
    stats.sequence = question.sequence;
    if (question.sequence % settings.choices.interval === 0) {
      localStorage.setItem("stats", JSON.stringify(stats));
    }
  };

  exports.wrong = (question) => {
    const key = indexToString(question.topicIndex);
    if (stats.topics[key]) {
      stats.topics[key].wrong++;
    } else {
      stats.topics[key] = { wrong: 1, right: 0 };
    }
    stats.sequence = question.sequence;
    if (question.sequence % settings.choices.interval === 0) {
      localStorage.setItem("stats", JSON.stringify(stats));
    }
  };

  exports.progress = progress;
})(typeof exports === "undefined" ? (this["question"] = {}) : exports);
