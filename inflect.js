const kinds = ["perus", "jarjestys"];

const cases = [
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
];

const pluralities = ["yksikko", "monikko"];

const suffixes = {
  perus: {
    nominatiivi: {
      yksikko: [{ suffix: "" }],
      monikko: [{ suffix: "t" }],
    },
    genetiivi: {
      yksikko: [{ suffix: "n" }],
      monikko: [
        { suffix: "ien" },
        { suffix: "jen", trailingZeros: 2 },
      ],
    },
    partitiivi: {
      yksikko: [
        { suffix: "aa" },
        { suffix: "tä", lastDigit: [1, 5] },
        { suffix: "tä", lastDigit: 0, trailingZeros: 1 },
        { suffix: "ta", lastDigit: [2, 6] },
        { suffix: "ta", lastDigit: 0, trailingZeros: 3 },
        { suffix: "a", lastDigit: 3 },
        { suffix: "ää", lastDigit: [4, 7, 9] },
      ],
      monikko: [
        { suffix: "ia" },
        { suffix: "iä", lastDigit: [1, 4, 5, 7, 9] },
        { suffix: "iä", lastDigit: 0, trailingZeros: 1 },
        { suffix: "ja", lastDigit: 0, trailingZeros: 2 },
      ],
    },
    inessiivi: {
      yksikko: [{ suffix: "ssa" }],
      monikko: [{ suffix: "issa" }],
    },
    elatiivi: {
      yksikko: [{ suffix: "sta" }],
      monikko: [{ suffix: "ista" }],
    },
    illatiivi: {
      yksikko: [{ suffix: "aan" }],
      monikko: [{ suffix: "iin" }],
    },
    adessiivi: {
      yksikko: [{ suffix: "lla" }],
      monikko: [{ suffix: "illa" }],
    },
    ablatiivi: {
      yksikko: [{ suffix: "lta" }],
      monikko: [{ suffix: "ilta" }],
    },
    allatiivi: {
      yksikko: [{ suffix: "lle" }],
      monikko: [{ suffix: "ille" }],
    },
    essiivi: {
      yksikko: [{ suffix: "na" }],
      monikko: [{ suffix: "ina" }],
    },
    translatiivi: {
      yksikko: [{ suffix: "ksi" }],
      monikko: [{ suffix: "iksi" }],
    },
    abessiivi: {
      yksikko: [{ suffix: "tta" }],
      monikko: [{ suffix: "itta" }],
    },
  },
  jarjestys: {
    nominatiivi: {
      yksikko: [{ suffix: "s" }, { suffix: "nen", number: [1, 2] }],
      monikko: [{ suffix: "nnet" }, { suffix: "set", number: [1, 2] }],
    },
    genetiivi: {
      yksikko: [
        { suffix: "nnen" },
        { suffix: "sen", number: [1, 2] },
      ],
      monikko: [
        { suffix: "nsien" },
        { suffix: "sten", number: [1, 2] },
      ],
    },
    partitiivi: {
      yksikko: [
        { suffix: "tta" },
        { suffix: "stä", number: 1 },
        { suffix: "sta", number: 2 },
        { suffix: "ttä", lastDigit: [1, 4, 5, 7, 9] },
        { suffix: "ttä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { suffix: "nsia" },
        { suffix: "siä", number: 1 },
        { suffix: "sia", number: 2 },
        { suffix: "nsiä", lastDigit: [1, 4, 5, 7, 9] },
        { suffix: "nsiä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    inessiivi: {
      yksikko: [{ suffix: "nnessa" }],
      monikko: [{ suffix: "nsissa" }],
    },
    elatiivi: {
      yksikko: [{ suffix: "nnesta" }],
      monikko: [{ suffix: "nsista" }],
    },
    illatiivi: {
      yksikko: [{ suffix: "nteen" }],
      monikko: [{ suffix: "nsiin" }],
    },
    adessiivi: {
      yksikko: [{ suffix: "nnella" }],
      monikko: [{ suffix: "nsilla" }],
    },
    ablatiivi: {
      yksikko: [{ suffix: "nnelta" }],
      monikko: [{ suffix: "nsilta" }],
    },
    allatiivi: {
      yksikko: [{ suffix: "nnelle" }],
      monikko: [{ suffix: "nsille" }],
    },
    essiivi: {
      yksikko: [{ suffix: "ntena" }],
      monikko: [{ suffix: "nsina" }],
    },
    translatiivi: {
      yksikko: [{ suffix: "nneksi" }],
      monikko: [{ suffix: "nsiksi" }],
    },
    abessiivi: {
      yksikko: [{ suffix: "nnetta" }],
      monikko: [{ suffix: "nsitta" }],
    },
  },
};

function findMatchingSuffix(options, query) {
  let bestMatch = options[0];
  for (const option of options.slice(1)) {
    let allPropsMatch = true;
    for (const [key, value] of Object.entries(option)) {
      if (key === "suffix") {
        continue;
      }
      if (Array.isArray(value) && value.includes(query[key])) {
        continue;
      }
      if (value == query[key]) {
        continue;
      }
      allPropsMatch = false;
      break;
    }
    if (allPropsMatch) {
      const improvement =
        Object.keys(option).length > Object.keys(bestMatch).length;
      if (improvement > 0) {
        bestMatch = option;
      } else if (improvement === 0) {
        throw new Error(
          `Ambiguity between ${JSON.stringify(option)} and ${JSON.stringify(
            bestMatch
          )}`
        );
      }
    }
  }
  return bestMatch.suffix;
}

function inflect(number, kind, caseName, plurality) {
  if (number < 0 || number > 10000) {
    throw new Error(`Unexpected number: ${number}`);
  }
  if (!kinds.includes(kind)) {
    throw new Error(`Unexpected kind: ${kind}`);
  }
  if (!cases.includes(caseName)) {
    throw new Error(`Unexpected case: ${caseName}`);
  }
  if (!pluralities.includes(plurality)) {
    throw new Error(`Unexpected plurality: ${plurality}`);
  }

  let trailingZeros = 0;
  if (number > 0) {
    let n = number;
    while (n % 10 === 0) {
      trailingZeros++;
      n = n / 10;
    }
  }

  let suffixOptions = suffixes[kind][caseName][plurality];
  let suffix = findMatchingSuffix(suffixOptions, {
    number: number,
    lastDigit: number % 10,
    trailingZeros: trailingZeros,
  });

  return {
    short: suffix ? `${number}:${suffix}` : `${number}`,
    long: "todo",
  };
}

export { inflect };
