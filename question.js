(function (exports) {
  const settings = {
    kind: ["perus", "jarjestys"],
    plurality: ["yksikko", "monikko"],
    case: [
      "nominatiivi",
      "genetiivi",
      "partitiivi",
      "inessiivi",
      "elatiivi",
      "illatiivi",
      "adessiivi",
      "ablatiivi",
      "allatiivi",
      "essiivi",
      "translatiivi",
      "abessiivi",
    ],
    range: [11, 20, 100, 200, 1000, 2000, 10000],
    intervalLength: 3,
  };

  const stats = (() => {
    const statsStr = localStorage.getItem("stats");
    if (statsStr) {
      return JSON.parse(statsStr);
    }
    const stats = {
      lastId: 0,
      topics: {
        // Indexes for kind, plurality, case, range
        "0,0,0,0": {
          right: 0,
          wrong: 0,
        },
      },
    };
    return stats;
  })();

  const randomTopicIndex = () => {
    let totalWeight = 0;
    for (const t of Object.values(stats.topics)) {
      totalWeight += (t.wrong + 1) / (t.right + 1);
    }
    let rnd = Math.random() * totalWeight;
    for (const [key, t] of Object.entries(stats.topics)) {
      rnd -= (t.wrong + 1) / (t.right + 1);
      if (rnd < 0) {
        return key.split(",").map((s) => parseInt(s, 10));
      }
    }
    throw Error("this should not have happened 😅");
  };

  const questionForTopic = (index) => {
    const kind = settings.kind[index[0]];
    const plurality = settings.plurality[index[1]];
    const caseName = settings.case[index[2]];
    const maxNumberIndex = index[3];

    const minNumber =
      maxNumberIndex > 0 ? settings.range[maxNumberIndex - 1] : 0;
    const maxNumber = settings.range[maxNumberIndex];
    const number =
      Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;

    return {
      id: stats.lastId + 1,
      topicIndex: index,
      number: number,
      kind: kind,
      caseName: caseName,
      plurality: plurality,
    };
  };

  exports.generate = () => {
    const index = randomTopicIndex();
    console.log(stats);
    return questionForTopic(index);
  };

  exports.right = (question) => {
    const key = question.topicIndex.toString();
    if (stats.topics[key]) {
      stats.topics[key].right++;
    } else {
      stats.topics[key] = { rigth: 1, wrong: 0 };
    }
    stats.lastId = question.id;
  };

  exports.wrong = (question) => {
    const key = question.topicIndex.toString();
    if (stats.topics[key]) {
      stats.topics[key].wrong++;
    } else {
      stats.topics[key] = { wrong: 1, right: 0 };
    }
    stats.lastId = question.id;
  };
})(typeof exports === "undefined" ? (this["question"] = {}) : exports);
