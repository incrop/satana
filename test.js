const fs = require('fs');

// Read the test data file
const testData = JSON.parse(fs.readFileSync('test_data.json', 'utf8'));

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

// Function to check if a value is empty
const isEmpty = (value) => {
    return value === undefined || value === null || value === '';
};

// Function to validate a number's data
const validateNumber = (number) => {
    const data = testData[number];
    if (!data) {
        console.error(`❌ Missing data for number ${number}`);
        return false;
    }

    // Check short form
    if (!data.short) {
        console.error(`❌ Missing short form for number ${number}`);
        return false;
    }

    // Check long form
    if (!data.long) {
        console.error(`❌ Missing long form for number ${number}`);
        return false;
    }

    // Check all cases in short form
    for (const caseName of cases) {
        if (isEmpty(data.short[caseName])) {
            console.error(`❌ Missing short form ${caseName} for number ${number}`);
            return false;
        }
    }

    // Check all cases in long form
    for (const caseName of cases) {
        if (isEmpty(data.long[caseName])) {
            console.error(`❌ Missing long form ${caseName} for number ${number}`);
            return false;
        }
    }

    return true;
};

// Main validation loop
let allValid = true;
for (let i = 0; i <= 100; i++) {
    const number = i.toString();
    if (!validateNumber(number)) {
        allValid = false;
    }
}

if (allValid) {
    console.log('✅ All numbers from 0 to 100 have complete data in both short and long forms!');
} else {
    console.log('❌ Some numbers are missing data. Please check the errors above.');
    process.exit(1);
} 