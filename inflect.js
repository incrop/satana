const basicNumbers = {
  0: { base: 'nolla', stem: 'nolla' },
  1: { base: 'yksi', stem: 'yhde' },
  2: { base: 'kaksi', stem: 'kahde' },
  3: { base: 'kolme', stem: 'kolme' },
  4: { base: 'neljä', stem: 'neljä' },
  5: { base: 'viisi', stem: 'viide' },
  6: { base: 'kuusi', stem: 'kuude' },
  7: { base: 'seitsemän', stem: 'seitsemä' },
  8: { base: 'kahdeksan', stem: 'kahdeksa' },
  9: { base: 'yhdeksän', stem: 'yhdeksä' },
  10: { base: 'kymmenen', stem: 'kymmene' }
};

const frontVowelWords = new Set(['neljä', 'seitsemä', 'yhdeksä']);

const caseEndings = {
  genetiivi: {
    short: 'n',
    long: 'n'
  },
  partitiivi: {
    short: {
      front: 'ää',
      back: 'aa',
      consonant: 'ta',
      special: 'tä'
    },
    long: {
      front: 'ä',
      back: 'a'
    }
  },
  inessiivi: {
    short: {
      front: 'ssä',
      back: 'ssa'
    },
    long: {
      front: 'ssä',
      back: 'ssa'
    }
  },
  elatiivi: {
    short: {
      front: 'stä',
      back: 'sta'
    },
    long: {
      front: 'stä',
      back: 'sta'
    }
  },
  illatiivi: {
    short: {
      front: 'ään',
      back: 'aan',
      special: 'een'
    },
    long: {
      front: 'än',
      back: 'an',
      special: 'en'
    }
  },
  adessiivi: {
    short: {
      front: 'llä',
      back: 'lla'
    },
    long: {
      front: 'llä',
      back: 'lla'
    }
  },
  ablatiivi: {
    short: {
      front: 'ltä',
      back: 'lta'
    },
    long: {
      front: 'ltä',
      back: 'lta'
    }
  },
  allatiivi: {
    short: 'lle',
    long: 'lle'
  }
};

function hasFrontVowels(word) {
  return /[äöy]/.test(word) || frontVowelWords.has(word);
}

function getShortForm(number, grammaticalCase) {
  const ending = caseEndings[grammaticalCase];
  if (typeof ending.short === 'string') {
    return `${number}:${ending.short}`;
  }

  const lastDigit = number % 10;
  const stem = basicNumbers[lastDigit].stem;
  const hasFront = hasFrontVowels(stem);

  if (grammaticalCase === 'partitiivi') {
    if (lastDigit === 1 || lastDigit === 2) {
      return `${number}:${hasFront ? ending.short.special : ending.short.consonant}`;
    }
    return `${number}:${hasFront ? ending.short.front : ending.short.back}`;
  }

  if (grammaticalCase === 'illatiivi') {
    if (lastDigit === 1 || lastDigit === 2) {
      return `${number}:${ending.short.special}`;
    }
    return `${number}:${hasFront ? ending.short.front : ending.short.back}`;
  }

  return `${number}:${hasFront ? ending.short.front : ending.short.back}`;
}

function getLongForm(number, grammaticalCase) {
  if (number === 100) {
    const stem = 'sada';
    switch (grammaticalCase) {
      case 'genetiivi': return stem + 'n';
      case 'partitiivi': return stem + 'ta';
      case 'inessiivi': return stem + 'ssa';
      case 'elatiivi': return stem + 'sta';
      case 'illatiivi': return stem + 'an';
      case 'adessiivi': return stem + 'lla';
      case 'ablatiivi': return stem + 'lta';
      case 'allatiivi': return stem + 'lle';
    }
  }

  if (number === 0) {
    const stem = basicNumbers[0].stem;
    const ending = caseEndings[grammaticalCase];
    if (typeof ending.long === 'string') {
      return stem + ending.long;
    }
    return stem + ending.long.back;
  }

  const tens = Math.floor(number / 10);
  const ones = number % 10;

  if (tens === 0) {
    const stem = basicNumbers[ones].stem;
    const ending = caseEndings[grammaticalCase];
    if (typeof ending.long === 'string') {
      return stem + ending.long;
    }
    return stem + (hasFrontVowels(stem) ? ending.long.front : ending.long.back);
  }

  const tensWord = basicNumbers[tens].stem + 'nkymmene';
  const onesWord = ones === 0 ? 'n' : basicNumbers[ones].stem + 'n';

  let base = tensWord + onesWord;
  const hasFront = hasFrontVowels(base);

  switch (grammaticalCase) {
    case 'genetiivi':
      return base;
    case 'partitiivi':
      return tensWord.replace('n', 'ä') + (ones === 0 ? 'ntä' : 'n' + basicNumbers[ones].stem + (hasFront ? 'ä' : 'a'));
    case 'inessiivi':
      return tensWord.replace('n', 'ssä') + (ones === 0 ? 'ssä' : 'ssä' + basicNumbers[ones].stem + 'ssä');
    case 'elatiivi':
      return tensWord.replace('n', 'stä') + (ones === 0 ? 'stä' : 'stä' + basicNumbers[ones].stem + 'stä');
    case 'illatiivi':
      return tensWord.replace('nkymmene', 'äntokymmenee') + (ones === 0 ? 'n' : 'n' + basicNumbers[ones].stem + (hasFront ? 'än' : 'an'));
    case 'adessiivi':
      return tensWord.replace('n', 'llä') + (ones === 0 ? 'llä' : 'llä' + basicNumbers[ones].stem + 'llä');
    case 'ablatiivi':
      return tensWord.replace('n', 'ltä') + (ones === 0 ? 'ltä' : 'ltä' + basicNumbers[ones].stem + 'ltä');
    case 'allatiivi':
      return tensWord.replace('n', 'lle') + (ones === 0 ? 'lle' : 'lle' + basicNumbers[ones].stem + 'lle');
  }
}

function inflect(number, grammaticalCase) {
  if (number < 0 || number > 100) {
    throw new Error('Number must be between 0 and 100');
  }

  if (!caseEndings[grammaticalCase]) {
    throw new Error('Invalid grammatical case');
  }

  return {
    short: getShortForm(number, grammaticalCase),
    long: getLongForm(number, grammaticalCase)
  };
}

export { inflect }; 