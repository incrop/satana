(function (exports) {
  const { kinds, cases, pluralities } = this.inflect;
  const maxNumber = 10000;

  exports.generate = () => ({
    number: Math.floor(Math.random() * maxNumber),
    kind: kinds[Math.floor(Math.random() * kinds.length)],
    caseName: cases[Math.floor(Math.random() * cases.length)],
    plurality: pluralities[Math.floor(Math.random() * pluralities.length)]
  });
})(typeof exports === "undefined" ? (this["question"] = {}) : exports);