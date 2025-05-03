import fs from 'fs';
import { inflect } from './inflect.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the test data file
const testData = JSON.parse(fs.readFileSync(join(__dirname, 'test_data.json'), 'utf8'));

// List of all grammatical cases to check
const cases = [
    'genetiivi',
    'partitiivi',
    'inessiivi',
    'elatiivi',
    'illatiivi',
    'adessiivi',
    'ablatiivi',
    'allatiivi'
];

let allPassed = true;
let errors = [];

for (let number = 0; number <= 100; number++) {
    for (const caseName of cases) {
        const expected = {
            short: testData[number.toString()].short[caseName],
            long: testData[number.toString()].long[caseName]
        };
        const actual = inflect(number, caseName);
        
        if (JSON.stringify(expected) !== JSON.stringify(actual)) {
            allPassed = false;
            errors.push({
                number,
                case: caseName,
                expected,
                actual
            });
        }
    }
}

if (allPassed) {
    console.log('✅ All numbers from 0 to 100 have complete data in both short and long forms!');
} else {
    console.log('❌ Some tests failed:');
    errors.forEach(error => {
        console.log(`Number ${error.number} in ${error.case}:`);
        console.log(`  Expected: ${JSON.stringify(error.expected)}`);
        console.log(`  Actual:   ${JSON.stringify(error.actual)}`);
    });
} 