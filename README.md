# 100:na

Numeroiden taivutus on vaikea.

<img width="570" alt="image" src="https://github.com/user-attachments/assets/4201b883-50bb-42c8-af83-6c8342ce4b4f" />

Tiny weekend project, mostly for myself, to learn the grammatical inflections of numbers in Finnish. [Try it out](https://incrop.github.io/satana/).

## How it works

You're given an inflected number in short form — for example, _12:een_ — and your task is to write it out in full: _kahteentoista_. If you're stuck, no worries — just check the correct answer and keep going.

The first exercises cover simple numbers from 0 to 10 in the nominative case, but you can gradually increase the difficulty by unlocking new topics, which the app periodically suggests:

<img width="570" alt="image" src="https://github.com/user-attachments/assets/c7a29668-6f8c-4c72-bc8b-2fade2594ee4" />

## Features

Topics can include any combination of the following:

- Numbers from 0 up to 9999, split into ranges: 0–10, 11–19, 20–99, etc.
- Singular and plural forms (e.g., _yksi_ vs _yhdet_).
- Cardinal and ordinal numbers (_kaksi_ vs _toinen_).
- One of 11 grammatical cases, split into 3 groups. You can unlock the next group after completing all cases in the current one:
  - Basic: nominatiivi, genetiivi, partitiivi
  - Locative: inessiivi, elatiivi, illatiivi, adessiivi, ablatiivi, allatiivi
  - The rest: essiivi, translatiivi

Your progress is stored locally. Topics where you’ve had more wrong answers or clicked “Don’t know” more often will be suggested more frequently.

No backend or tracking involved. The app is just a few kilobytes of raw html, css, and js.

## Kiitokset

- To [Mirtl](https://github.com/mirtlbu) for alpha testing and huesosing ❤️
- To [Tuomas Salste](https://www.tuomas.salste.net/doc/numero/sijamuodot.html) for the large collection of inflected numbers I used as a testing suite
- To [Cursor AI](https://www.cursor.com/) and LLMs involved for helping with design and UI logic.
- To [realfavicongenerator.net](https://realfavicongenerator.net/) for creating favicon pack from svg.
