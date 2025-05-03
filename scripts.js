// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Document loaded and ready!');
    
    // Mapping of numbers to their Finnish forms in different cases
    const numberForms = {
        1: {
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

    // Function to update button state
    function updateButtonState() {
        const input = document.getElementById('answer');
        const submitButton = document.getElementById('submit');
        submitButton.disabled = input.value.trim() === '';
    }

    // Function to add visual feedback classes
    function addFeedbackClasses(isCorrect) {
        const className = isCorrect ? 'correct' : 'incorrect';
        document.body.classList.add(className);
        document.querySelector('.container').classList.add(className);
        document.querySelector('h1').classList.add(className);
        document.querySelector('input').classList.add(className);
        document.querySelector('button').classList.add(className);
    }

    // Function to remove visual feedback classes
    function removeFeedbackClasses() {
        document.body.classList.remove('correct', 'incorrect');
        document.querySelector('.container').classList.remove('correct', 'incorrect');
        document.querySelector('h1').classList.remove('correct', 'incorrect');
        document.querySelector('input').classList.remove('correct', 'incorrect');
        document.querySelector('button').classList.remove('correct', 'incorrect');
    }

    // Function to update submit button emoji
    function updateSubmitEmoji(emoji) {
        document.getElementById('submit-emoji').textContent = emoji;
    }

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
        
        // Reset submit button to checkmark
        updateSubmitEmoji('✓');
        
        // Update button state
        updateButtonState();
    }

    // Function to check the answer
    function checkAnswer(isKeypress = false) {
        const userAnswer = document.getElementById('answer').value.toLowerCase().trim();
        const correctAnswer = numberForms[currentNumber][currentCase];
        
        if (userAnswer === correctAnswer) {
            addFeedbackClasses(true);
            setTimeout(() => {
                removeFeedbackClasses();
                document.getElementById('answer').value = '';
                generateQuestion();
            }, 1000);
        } else if (!isKeypress) {
            // Only show incorrect feedback when submit button is clicked
            addFeedbackClasses(false);
            document.getElementById('answer').value = correctAnswer;
            setTimeout(() => {
                removeFeedbackClasses();
                setTimeout(() => {
                    document.getElementById('answer').value = '';
                    generateQuestion();
                }, 1000);
            }, 3000);
        } else {
            // On keypress, just update the submit button emoji
            updateSubmitEmoji('🤷');
        }
    }

    // Add event listeners
    const answerInput = document.getElementById('answer');
    answerInput.addEventListener('input', () => {
        checkAnswer(true);
        updateButtonState();
    });
    document.getElementById('submit').addEventListener('click', () => checkAnswer(false));

    // Generate initial question
    generateQuestion();
}); 