// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded and ready!');
    
    // Mapping of numbers to their Finnish forms in different cases
    const numberForms = {
        1: {
            nominatiivi: 'yksi',
            genetiivi: 'yhden',
            partitiivi: 'yhtä',
            inessiivi: 'yhdessä',
            elatiivi: 'yhdestä',
            illatiivi: 'yhteen',
            adessiivi: 'yhdellä',
            ablatiivi: 'yhdeltä',
            allatiivi: 'yhdelle'
        },
        2: {
            nominatiivi: 'kaksi',
            genetiivi: 'kahden',
            partitiivi: 'kahta',
            inessiivi: 'kahdessa',
            elatiivi: 'kahdesta',
            illatiivi: 'kahteen',
            adessiivi: 'kahdella',
            ablatiivi: 'kahdelta',
            allatiivi: 'kahdelle'
        },
        3: {
            nominatiivi: 'kolme',
            genetiivi: 'kolmen',
            partitiivi: 'kolmea',
            inessiivi: 'kolmessa',
            elatiivi: 'kolmesta',
            illatiivi: 'kolmeen',
            adessiivi: 'kolmella',
            ablatiivi: 'kolmelta',
            allatiivi: 'kolmelle'
        },
        4: {
            nominatiivi: 'neljä',
            genetiivi: 'neljän',
            partitiivi: 'neljää',
            inessiivi: 'neljässä',
            elatiivi: 'neljästä',
            illatiivi: 'neljään',
            adessiivi: 'neljällä',
            ablatiivi: 'neljältä',
            allatiivi: 'neljälle'
        },
        5: {
            nominatiivi: 'viisi',
            genetiivi: 'viiden',
            partitiivi: 'viittä',
            inessiivi: 'viidessä',
            elatiivi: 'viidestä',
            illatiivi: 'viiteen',
            adessiivi: 'viidellä',
            ablatiivi: 'viideltä',
            allatiivi: 'viidelle'
        },
        6: {
            nominatiivi: 'kuusi',
            genetiivi: 'kuuden',
            partitiivi: 'kuutta',
            inessiivi: 'kuudessa',
            elatiivi: 'kuudesta',
            illatiivi: 'kuuteen',
            adessiivi: 'kuudella',
            ablatiivi: 'kuudelta',
            allatiivi: 'kuudelle'
        },
        7: {
            nominatiivi: 'seitsemän',
            genetiivi: 'seitsemän',
            partitiivi: 'seitsemää',
            inessiivi: 'seitsemässä',
            elatiivi: 'seitsemästä',
            illatiivi: 'seitsemään',
            adessiivi: 'seitsemällä',
            ablatiivi: 'seitsemältä',
            allatiivi: 'seitsemälle'
        },
        8: {
            nominatiivi: 'kahdeksan',
            genetiivi: 'kahdeksan',
            partitiivi: 'kahdeksaa',
            inessiivi: 'kahdeksassa',
            elatiivi: 'kahdeksasta',
            illatiivi: 'kahdeksaan',
            adessiivi: 'kahdeksalla',
            ablatiivi: 'kahdeksalta',
            allatiivi: 'kahdeksalle'
        },
        9: {
            nominatiivi: 'yhdeksän',
            genetiivi: 'yhdeksän',
            partitiivi: 'yhdeksää',
            inessiivi: 'yhdeksässä',
            elatiivi: 'yhdeksästä',
            illatiivi: 'yhdeksään',
            adessiivi: 'yhdeksällä',
            ablatiivi: 'yhdeksältä',
            allatiivi: 'yhdeksälle'
        },
        10: {
            nominatiivi: 'kymmenen',
            genetiivi: 'kymmenen',
            partitiivi: 'kymmentä',
            inessiivi: 'kymmenessä',
            elatiivi: 'kymmenestä',
            illatiivi: 'kymmeneen',
            adessiivi: 'kymmenellä',
            ablatiivi: 'kymmeneltä',
            allatiivi: 'kymmenelle'
        }
    };

    // List of grammar cases with their endings
    const grammarCases = {
        nominatiivi: '',
        genetiivi: ':n',
        partitiivi: ':a',
        inessiivi: ':ssa',
        elatiivi: ':sta',
        illatiivi: ':een',
        adessiivi: ':lla',
        ablatiivi: ':lta',
        allatiivi: ':lle'
    };

    let currentNumber = 0;
    let currentCase = '';

    // Function to generate a random question
    function generateQuestion() {
        // Generate random number between 1 and 10
        currentNumber = Math.floor(Math.random() * 10) + 1;
        
        // Get random case and its ending
        const cases = Object.keys(grammarCases);
        currentCase = cases[Math.floor(Math.random() * cases.length)];
        const ending = grammarCases[currentCase];
        
        // Update the question element
        document.getElementById('question').textContent = 
            `${currentNumber}${ending}`;
    }

    // Function to check the answer
    function checkAnswer() {
        const userAnswer = document.getElementById('answer').value.toLowerCase().trim();
        const correctAnswer = numberForms[currentNumber][currentCase];
        
        if (userAnswer === correctAnswer) {
            alert('Correct!');
            document.getElementById('answer').value = '';
            generateQuestion();
        } else {
            alert(`Incorrect. The correct answer is: ${correctAnswer}`);
        }
    }

    // Add event listener to the submit button
    document.getElementById('submit').addEventListener('click', checkAnswer);

    // Generate initial question
    generateQuestion();
}); 