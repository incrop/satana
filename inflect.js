(function (exports) {
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
          { value: "een", lastDigit: 0, trailingZeros: [1, 3] },
          { value: "ään", lastDigit: [4, 7, 9] },
        ],
        monikko: [{ value: "iin" }, { value: "ihin", trailingZeros: 2 }],
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
        yksikko: [
          { value: "na" },
          { value: "nä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "ina" },
          { value: "inä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "inä", lastDigit: 0, trailingZeros: 1 },
        ],
      },
      translatiivi: {
        yksikko: [{ value: "ksi" }],
        monikko: [{ value: "iksi" }],
      },
      abessiivi: {
        yksikko: [
          { value: "tta" },
          { value: "ttä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "ttä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "itta" },
          { value: "ittä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "ittä", lastDigit: 0, trailingZeros: 1 },
        ],
      },
    },
    jarjestys: {
      nominatiivi: {
        yksikko: [{ value: "s" }, { value: "nen", originalNumber: [1, 2] }],
        monikko: [{ value: "nnet" }, { value: "set", originalNumber: [1, 2] }],
      },
      genetiivi: {
        yksikko: [{ value: "nnen" }, { value: "sen", originalNumber: [1, 2] }],
        monikko: [
          { value: "nsien" },
          { value: "sten", originalNumber: [1, 2] },
        ],
      },
      partitiivi: {
        yksikko: [
          { value: "tta" },
          { value: "stä", originalNumber: 1 },
          { value: "sta", originalNumber: 2 },
          { value: "ttä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "ttä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "nsia" },
          { value: "siä", originalNumber: 1 },
          { value: "sia", originalNumber: 2 },
          { value: "nsiä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nsiä", lastDigit: 0, trailingZeros: 1 },
        ],
      },
      inessiivi: {
        yksikko: [
          { value: "nnessa" },
          { value: "sessä", originalNumber: 1 },
          { value: "sessa", originalNumber: 2 },
          { value: "nnessä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nnessä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "nsissa" },
          { value: "sissä", originalNumber: 1 },
          { value: "sissa", originalNumber: 2 },
          { value: "nsissä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nsissä", lastDigit: 0, trailingZeros: 1 },
        ],
      },
      elatiivi: {
        yksikko: [
          { value: "nnesta" },
          { value: "sestä", originalNumber: 1 },
          { value: "sesta", originalNumber: 2 },
          { value: "nnestä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nnestä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "nsista" },
          { value: "sistä", originalNumber: 1 },
          { value: "sista", originalNumber: 2 },
          { value: "nsistä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nsistä", lastDigit: 0, trailingZeros: 1 },
        ],
      },
      illatiivi: {
        yksikko: [
          { value: "nteen" },
          { value: "seen", originalNumber: [1, 2] },
        ],
        monikko: [
          { value: "nsiin" },
          { value: "siin", originalNumber: [1, 2] },
        ],
      },
      adessiivi: {
        yksikko: [
          { value: "nnella" },
          { value: "sellä", originalNumber: 1 },
          { value: "sella", originalNumber: 2 },
          { value: "nnellä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nnellä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "nsilla" },
          { value: "sillä", originalNumber: 1 },
          { value: "silla", originalNumber: 2 },
          { value: "nsillä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nsillä", lastDigit: 0, trailingZeros: 1 },
        ],
      },
      ablatiivi: {
        yksikko: [
          { value: "nnelta" },
          { value: "seltä", originalNumber: 1 },
          { value: "selta", originalNumber: 2 },
          { value: "nneltä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nneltä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "nsilta" },
          { value: "siltä", originalNumber: 1 },
          { value: "silta", originalNumber: 2 },
          { value: "nsiltä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nsiltä", lastDigit: 0, trailingZeros: 1 },
        ],
      },
      allatiivi: {
        yksikko: [
          { value: "nnelle" },
          { value: "selle", originalNumber: [1, 2] },
        ],
        monikko: [
          { value: "nsille" },
          { value: "sille", originalNumber: [1, 2] },
        ],
      },
      essiivi: {
        yksikko: [
          { value: "ntena" },
          { value: "senä", originalNumber: 1 },
          { value: "sena", originalNumber: 2 },
          { value: "ntenä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "ntenä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "nsina" },
          { value: "sinä", originalNumber: 1 },
          { value: "sina", originalNumber: 2 },
          { value: "nsinä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nsinä", lastDigit: 0, trailingZeros: 1 },
        ],
      },
      translatiivi: {
        yksikko: [
          { value: "nneksi" },
          { value: "seksi", originalNumber: [1, 2] },
        ],
        monikko: [
          { value: "nsiksi" },
          { value: "siksi", originalNumber: [1, 2] },
        ],
      },
      abessiivi: {
        yksikko: [
          { value: "nnetta" },
          { value: "settä", originalNumber: 1 },
          { value: "setta", originalNumber: 2 },
          { value: "nnettä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nnettä", lastDigit: 0, trailingZeros: 1 },
        ],
        monikko: [
          { value: "nsitta" },
          { value: "sittä", originalNumber: 1 },
          { value: "sitta", originalNumber: 2 },
          { value: "nsittä", lastDigit: [1, 4, 5, 7, 9] },
          { value: "nsittä", lastDigit: 0, trailingZeros: 1 },
        ],
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
      {
        value: "yhte",
        kind: "perus",
        caseName: "essiivi",
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
      {
        value: "kahte",
        kind: "perus",
        caseName: "essiivi",
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
      {
        value: "viite",
        kind: "perus",
        caseName: "essiivi",
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
      {
        value: "kuute",
        kind: "perus",
        caseName: "essiivi",
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
      {
        value: "kymmentä",
        kind: "perus",
        caseName: "nominatiivi",
        plurality: "yksikko",
        kymmentaUseCase: true,
      },
    ],
    100: [
      { value: "sada" },
      {
        value: "sado",
        kind: "perus",
        plurality: "monikko",
      },
      {
        value: "sada",
        kind: "perus",
        caseName: "nominatiivi",
        plurality: "monikko",
      },
      {
        value: "sata",
        kind: "perus",
        caseName: "essiivi",
        plurality: "yksikko",
      },
      {
        value: "sataa",
        kind: "perus",
        caseName: "nominatiivi",
        plurality: "yksikko",
        trailingZeros: 2,
      },
      {
        value: "sata",
        kind: "perus",
        caseName: "nominatiivi",
        plurality: "yksikko",
        trailingZeros: 2,
        firstDigit: 1,
      },
      {
        value: "sat",
        kind: "perus",
        caseName: ["partitiivi", "illatiivi"],
        plurality: "yksikko",
      },
      {
        value: "sato",
        kind: "perus",
        caseName: ["genetiivi", "partitiivi", "illatiivi", "essiivi"],
        plurality: "monikko",
      },
    ],
    1000: [
      { value: "tuhanne" },
      {
        value: "tuhans",
        kind: "perus",
        plurality: "monikko",
      },
      {
        value: "tuhanne",
        kind: "perus",
        caseName: "nominatiivi",
        plurality: "monikko",
      },
      {
        value: "tuhat",
        kind: "perus",
        caseName: ["nominatiivi", "partitiivi"],
        plurality: "yksikko",
      },
      {
        value: "tuhatta",
        kind: "perus",
        caseName: "nominatiivi",
        plurality: "yksikko",
        trailingZeros: 3,
      },
      {
        value: "tuhat",
        kind: "perus",
        caseName: "nominatiivi",
        plurality: "yksikko",
        trailingZeros: 3,
        firstDigit: 1,
      },
      {
        value: "tuhante",
        kind: "perus",
        caseName: "essiivi",
        plurality: "yksikko",
      },
      {
        value: "tuhant",
        kind: "perus",
        caseName: "illatiivi",
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

  function trailingZeros(number) {
    let trailingZeros = 0;
    if (number > 0) {
      while (number % 10 === 0) {
        trailingZeros++;
        number = number / 10;
      }
    }
    return trailingZeros;
  }

  function inflect({ number: originalNumber, kind, caseName, plurality }) {
    const findSuffix = (suffixNumber, overrides = {}) => {
      let suffixOptions =
        suffixes[overrides.kind || kind][overrides.caseName || caseName][
          overrides.plurality || plurality
        ];
      return findMatchingValue(suffixOptions, {
        number: suffixNumber,
        originalNumber: originalNumber,
        lastDigit: suffixNumber % 10,
        trailingZeros: trailingZeros(suffixNumber),
        ...overrides,
      });
    };

    const findRoot = (rootNumber, suffix, overrides = {}) => {
      return (
        findMatchingValue(roots[rootNumber], {
          number: rootNumber,
          originalNumber: originalNumber,
          kind: kind,
          caseName: caseName,
          plurality: plurality,
          suffixStartVocals: ((ssv) => (ssv ? ssv[0].length : 0))(
            /^[aouäöyie]+/i.exec(suffix)
          ),
          trailingZeros: trailingZeros(rootNumber),
          ...overrides,
        }) + suffix
      );
    };

    let lastSuffix = findSuffix(originalNumber);

    const findLong = (number) => {
      if (number <= 10) {
        return findRoot(number, lastSuffix);
      }
      if (number < 20) {
        return findRoot(number - 10, lastSuffix) + "toista";
      }
      if (number < 100) {
        const firstDigit = Math.floor(number / 10);
        const lastDigit = number % 10;
        let long = "";
        long += findRoot(firstDigit, findSuffix(firstDigit));
        long += findRoot(10, findSuffix(10), { kymmentaUseCase: true });
        if (lastDigit > 0) {
          long += findRoot(lastDigit, findSuffix(lastDigit));
        }
        return long;
      }
      if (number < 1000) {
        const firstDigit = Math.floor(number / 100);
        const nuberWithoutHundreds = number - firstDigit * 100;
        let long = "";
        if (firstDigit > 1) {
          long += findRoot(firstDigit, findSuffix(firstDigit));
        }
        long += findRoot(100, findSuffix(100), { firstDigit: firstDigit });
        if (nuberWithoutHundreds > 0) {
          long += findLong(nuberWithoutHundreds);
        }
        return long;
      }
      if (number < 10000) {
        const firstDigit = Math.floor(number / 1000);
        const nuberWithoutThousands = number - firstDigit * 1000;
        let long = "";
        if (firstDigit > 1) {
          long += findRoot(firstDigit, findSuffix(firstDigit));
        }
        long += findRoot(1000, findSuffix(1000), { firstDigit: firstDigit });
        if (nuberWithoutThousands > 0) {
          long += findLong(nuberWithoutThousands);
        }
        return long;
      }
      throw new Error(`Number is not supported: ${number}`);
    };

    return {
      short: lastSuffix
        ? `${originalNumber}:${lastSuffix}`
        : `${originalNumber}`,
      long: findLong(originalNumber),
    };
  }
  exports.inflect = inflect;
})(typeof exports === "undefined" ? (this["inflect"] = {}) : exports);
