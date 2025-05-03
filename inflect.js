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
      yksikko: [{ value: "" }],
      monikko: [{ value: "t" }],
    },
    genetiivi: {
      yksikko: [{ value: "n" }],
      monikko: [{ value: "ien" }, { value: "jen", trailingZeros: 2 }],
    },
    partitiivi: {
      yksikko: [
        { value: "aa" },
        { value: "tä", lastDigit: [1, 5] },
        { value: "tä", lastDigit: 0, trailingZeros: 1 },
        { value: "ta", lastDigit: [2, 6] },
        { value: "ta", lastDigit: 0, trailingZeros: 3 },
        { value: "a", lastDigit: 3 },
        { value: "ää", lastDigit: [4, 7, 9] },
      ],
      monikko: [
        { value: "ia" },
        { value: "iä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "iä", lastDigit: 0, trailingZeros: 1 },
        { value: "ja", lastDigit: 0, trailingZeros: 2 },
      ],
    },
    inessiivi: {
      yksikko: [
        { value: "ssa" },
        { value: "ssä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "ssä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "issa" },
        { value: "issä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "issä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    elatiivi: {
      yksikko: [
        { value: "sta" },
        { value: "stä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "stä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "ista" },
        { value: "istä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "istä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    illatiivi: {
      yksikko: [
        { value: "aan" },
        { value: "een", lastDigit: [1, 2, 3, 5, 6] },
        { value: "een", lastDigit: 0, trailingZeros: 1 },
        { value: "ään", lastDigit: [4, 7, 9] },
      ],
      monikko: [{ value: "iin" }],
    },
    adessiivi: {
      yksikko: [
        { value: "lla" },
        { value: "llä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "llä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "illa" },
        { value: "illä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "illä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    ablatiivi: {
      yksikko: [
        { value: "lta" },
        { value: "ltä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "ltä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "ilta" },
        { value: "iltä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "iltä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    allatiivi: {
      yksikko: [{ value: "lle" }],
      monikko: [{ value: "ille" }],
    },
    essiivi: {
      yksikko: [{ value: "na" }],
      monikko: [{ value: "ina" }],
    },
    translatiivi: {
      yksikko: [{ value: "ksi" }],
      monikko: [{ value: "iksi" }],
    },
    abessiivi: {
      yksikko: [{ value: "tta" }],
      monikko: [{ value: "itta" }],
    },
  },
  jarjestys: {
    nominatiivi: {
      yksikko: [{ value: "s" }, { value: "nen", number: [1, 2] }],
      monikko: [{ value: "nnet" }, { value: "set", number: [1, 2] }],
    },
    genetiivi: {
      yksikko: [{ value: "nnen" }, { value: "sen", number: [1, 2] }],
      monikko: [{ value: "nsien" }, { value: "sten", number: [1, 2] }],
    },
    partitiivi: {
      yksikko: [
        { value: "tta" },
        { value: "stä", number: 1 },
        { value: "sta", number: 2 },
        { value: "ttä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "ttä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "nsia" },
        { value: "siä", number: 1 },
        { value: "sia", number: 2 },
        { value: "nsiä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nsiä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    inessiivi: {
      yksikko: [
        { value: "nnessa" },
        { value: "sessä", number: 1 },
        { value: "sessa", number: 2 },
        { value: "nnessä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nnessä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "nsissa" },
        { value: "sissä", number: 1 },
        { value: "sissa", number: 2 },
        { value: "nsissä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nsissä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    elatiivi: {
      yksikko: [
        { value: "nnesta" },
        { value: "sestä", number: 1 },
        { value: "sesta", number: 2 },
        { value: "nnestä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nnestä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "nsista" },
        { value: "sistä", number: 1 },
        { value: "sista", number: 2 },
        { value: "nsistä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nsistä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    illatiivi: {
      yksikko: [{ value: "nteen" }, { value: "seen", number: [1, 2] }],
      monikko: [{ value: "nsiin" }, { value: "siin", number: [1, 2] }],
    },
    adessiivi: {
      yksikko: [
        { value: "nnella" },
        { value: "sellä", number: 1 },
        { value: "sella", number: 2 },
        { value: "nnellä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nnellä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "nsilla" },
        { value: "sillä", number: 1 },
        { value: "silla", number: 2 },
        { value: "nsillä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nsillä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    ablatiivi: {
      yksikko: [
        { value: "nnelta" },
        { value: "seltä", number: 1 },
        { value: "selta", number: 2 },
        { value: "nneltä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nneltä", lastDigit: 0, trailingZeros: 1 },
      ],
      monikko: [
        { value: "nsilta" },
        { value: "siltä", number: 1 },
        { value: "silta", number: 2 },
        { value: "nsiltä", lastDigit: [1, 4, 5, 7, 9] },
        { value: "nsiltä", lastDigit: 0, trailingZeros: 1 },
      ],
    },
    allatiivi: {
      yksikko: [{ value: "nnelle" }, { value: "selle", number: [1, 2] }],
      monikko: [{ value: "nsille" }, { value: "sille", number: [1, 2] }],
    },
    essiivi: {
      yksikko: [{ value: "ntena" }],
      monikko: [{ value: "nsina" }],
    },
    translatiivi: {
      yksikko: [{ value: "nneksi" }],
      monikko: [{ value: "nsiksi" }],
    },
    abessiivi: {
      yksikko: [{ value: "nnetta" }],
      monikko: [{ value: "nsitta" }],
    },
  },
};

const roots = {
  0: [{ value: "nolla" }, { value: "noll", suffixStartVocals: [1, 2] }],
  1: [
    { value: "yhde" },
    { value: "ensimmäi", kind: "jarjestys", originalNumber: 1 },
    { value: "yks", suffixStartVocals: [1, 2] },
    {
      value: "yksi",
      kind: "perus",
      caseName: "nominatiivi",
      plurality: "yksikko",
    },
    {
      value: "yh",
      kind: "perus",
      caseName: "partitiivi",
      plurality: "yksikko",
    },
    {
      value: "yht",
      kind: "perus",
      caseName: "illatiivi",
      plurality: "yksikko",
    },
  ],
  2: [
    { value: "kahde" },
    { value: "toi", kind: "jarjestys", originalNumber: 2 },
    { value: "kaks", suffixStartVocals: [1, 2] },
    {
      value: "kaksi",
      kind: "perus",
      caseName: "nominatiivi",
      plurality: "yksikko",
    },
    {
      value: "kah",
      kind: "perus",
      caseName: "partitiivi",
      plurality: "yksikko",
    },
    {
      value: "kaht",
      kind: "perus",
      caseName: "illatiivi",
      plurality: "yksikko",
    },
  ],
  3: [
    { value: "kolme" },
    { value: "kolm", suffixStartVocals: [1, 2] },
    { value: "kolma", kind: "jarjestys" },
    {
      value: "kolme",
      kind: "perus",
      caseName: "partitiivi",
      plurality: "yksikko",
    },
  ],
  4: [{ value: "neljä" }, { value: "nelj", suffixStartVocals: [1, 2] }],
  5: [
    { value: "viide" },
    { value: "viis", suffixStartVocals: [1, 2] },
    {
      value: "viisi",
      kind: "perus",
      caseName: "nominatiivi",
      plurality: "yksikko",
    },
    {
      value: "viit",
      kind: "perus",
      caseName: ["partitiivi", "illatiivi"],
      plurality: "yksikko",
    },
  ],
  6: [
    { value: "kuude" },
    { value: "kuus", suffixStartVocals: [1, 2] },
    {
      value: "kuusi",
      kind: "perus",
      caseName: "nominatiivi",
      plurality: "yksikko",
    },
    {
      value: "kuut",
      kind: "perus",
      caseName: ["partitiivi", "illatiivi"],
      plurality: "yksikko",
    },
  ],
  7: [
    { value: "seitsemä" },
    { value: "seitsem", suffixStartVocals: [1, 2] },
    {
      value: "seitsemän",
      kind: "perus",
      caseName: "nominatiivi",
      plurality: "yksikko",
    },
  ],
  8: [
    { value: "kahdeksa" },
    { value: "kahdeks", suffixStartVocals: [1, 2] },
    {
      value: "kahdeksan",
      kind: "perus",
      caseName: "nominatiivi",
      plurality: "yksikko",
    },
  ],
  9: [
    { value: "yhdeksä" },
    { value: "yhdeks", suffixStartVocals: [1, 2] },
    {
      value: "yhdeksän",
      kind: "perus",
      caseName: "nominatiivi",
      plurality: "yksikko",
    },
  ],
  10: [
    { value: "kymmene" },
    { value: "kymmen", suffixStartVocals: [1, 2] },
    {
      value: "kymmen",
      kind: "perus",
      caseName: "partitiivi",
      plurality: "yksikko",
    },
    {
      value: "kymmenen",
      kind: "perus",
      caseName: "nominatiivi",
      plurality: "yksikko",
    },
  ],
};

function findMatchingValue(options, query) {
  let bestMatch = options[0];
  for (const option of options.slice(1)) {
    let allPropsMatch = true;
    for (const [key, value] of Object.entries(option)) {
      if (key === "value") {
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
      if (Object.keys(option).length > Object.keys(bestMatch).length) {
        bestMatch = option;
      }
    }
  }
  return bestMatch.value;
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
  let suffix = findMatchingValue(suffixOptions, {
    number: number,
    lastDigit: number % 10,
    trailingZeros: trailingZeros,
  });

  const findRoot = (rootNumber, extra = {}) => {
    return findMatchingValue(roots[rootNumber], {
      number: rootNumber,
      originalNumber: number,
      kind: kind,
      caseName: caseName,
      plurality: plurality,
      suffixStartVocals: ((ssv) => (ssv ? ssv[0].length : 0))(
        /^[aouäöyie]+/i.exec(suffix)
      ),
      ...extra,
    });
  };

  let long;
  if (number <= 10) {
    long = findRoot(number) + suffix;
  } else if (number < 20) {
    long = findRoot(number - 10) + suffix + "toista";
  } else {
    throw new Error(`Nuber is not supported: ${number}`);
  }

  return {
    short: suffix ? `${number}:${suffix}` : `${number}`,
    long: long,
  };
}

export { inflect };
