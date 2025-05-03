(function (exports) {
  const filterFromParams = (input) => {
    const overrides = {};
    const url = new URL(window.location.href);
    url.searchParams.forEach((value, key) => {
      if (!overrides[key]) {
        overrides[key] = [];
      }
      overrides[key].push(value);
    });
    const output = {};
    for (const [key, values] of Object.entries(input)) {
      if (!overrides[key]) {
        output[key] = values;
      } else {
        output[key] = values.filter((value) =>
          overrides[key].includes(String(value))
        );
      }
    }
    return output;
  };

  const settings = filterFromParams({
    kind: ["perus", "jarjestys"],
    plurality: ["yksikko", "monikko"],
    range: [11, 20, 100, 200, 1000, 2000, 10000],
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
  });

  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

  exports.generate = () => {
    const kind = sample(settings.kind);
    const plurality = sample(settings.plurality);
    const caseName = sample(settings.case);

    const maxNumberIndex = Math.floor(Math.random() * settings.range.length);
    const minNumber =
      maxNumberIndex > 0 ? settings.range[maxNumberIndex - 1] : 0;
    const maxNumber = settings.range[maxNumberIndex];
    const number =
      Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;

    return {
      number: number,
      kind: kind,
      caseName: caseName,
      plurality: plurality,
    };
  };
})(typeof exports === "undefined" ? (this["question"] = {}) : exports);
