import fs from "fs";
import { inflect } from "./inflect.js";

const testData = JSON.parse(fs.readFileSync("./test_data.json"), "utf8");

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
  //   "essiivi",
  //   "translatiivi",
  //   "abessiivi",
];

const pluralities = ["yksikko", "monikko"];

let passedCount = 0;
let errors = [];

for (let number = 0; number <= 19; number++) {
  if (!testData[number.toString()]) {
    continue;
  }
  for (const kind of kinds) {
    for (const caseName of cases) {
      for (const plurality of pluralities) {
        const expected = testData[number.toString()][kind][caseName][plurality];
        const actual = inflect(number, kind, caseName, plurality);

        if (expected.short === actual.short && expected.long === actual.long) {
          passedCount++;
        } else {
          errors.push({
            number,
            kind,
            caseName,
            plurality,
            expected,
            actual,
          });
        }
      }
    }
  }
}

if (errors.length === 0) {
  console.log(`✅ All ${passedCount} tests passed!`);
} else {
  console.log(
    `❌ ${errors.length} tests of ${passedCount + errors.length} failed:`
  );
  errors.forEach((error) => {
    console.log(
      `Number ${error.number} in ${error.kind} ${error.caseName} ${error.plurality}:`
    );
    console.log(`  Expected: ${JSON.stringify(error.expected)}`);
    console.log(`  Actual:   ${JSON.stringify(error.actual)}`);
  });
}

// console.log(inflect(1, "jarjestys", "genetiivi", plurality))
