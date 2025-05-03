# 100:na

Numeroiden taivutus on vaikea.

<img width="570" alt="image" src="https://github.com/user-attachments/assets/4201b883-50bb-42c8-af83-6c8342ce4b4f" />

Tiny weekend project, mostly for myself to learn grammatical inflections of numbers in Finnish. [Try it out](https://incrop.github.io/satana/).

## How it works

You are given inflected number in short form, for example _12:een_ - write it down as text: _kahteen­toista_. If you struggle - no worries, check the correct answer and continue.

First exercises are simple numbers from 0 to 10 in nominative case, but you can gradully increase the complexity by unlocking new topics periodically suggested by the app: 

<img width="570" alt="image" src="https://github.com/user-attachments/assets/c7a29668-6f8c-4c72-bc8b-2fade2594ee4" />

## Features

Topics can be any combination of the following:
- Numbers from 0 up to 9999, split into ranges 0-10, 11-19, 20-99, etc.
- Singulars and plurals (yksi vs yhdet).
- Basic and ordinal numbers (kaksi vs toinen).
- One of 12 cases, split into 3 groups. Cases from next group can be unlocked after unlocking all cases from previous group:
  - basic ones: nominatiivi, genetiivi, partitiivi;
  - locatives: inessiivi, elatiivi, illatiivi, adessiivi, ablatiivi, allatiivi;
  - "the rest": essiivi, translatiivi, abessiivi.

Stats per topic are stored in local storage. Exercises for topics with less correct answers and more "Don't know" clicks are suggested more often.

No backend or tracking. The app is ~40KB of unminified HTML, CSS and JS.

## Kudos

- To [Mirtl](https://github.com/mirtlbu) for inspiration and suggestions ❤️
- To [Tuomas Salste](https://www.tuomas.salste.net/doc/numero/sijamuodot.html) for large collection of inflected numbers I've used as a testing suite.
- To [Cursor AI](https://www.cursor.com/) and LLMs for styles and most of the UI logic. 
