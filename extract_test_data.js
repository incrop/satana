// https://www.tuomas.salste.net/doc/numero/sijamuodot.html

const data = {}

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
  "essiivi",
  "translatiivi",
  "abessiivi",
]

function sanitize(str) {
  return str.replace(/[^a-z0-9äö: ]/g, '').trim()
}

document
  .querySelector('#perus')
  .closest('details')
  .querySelectorAll('tbody')
  .forEach(tbody => {
    const num = parseInt(tbody.querySelector('td').textContent.replace(/[^0-9]/g, ''), 10)
    if (isNaN(num)) return;
    data[num] = {};
    data[num].perus = {};
    cases.forEach(caseName => {
      data[num].perus[caseName] = {};
      tbody.querySelectorAll(`tr[title=${caseName}]`).forEach((tr, idx) => {
        const tds = Array.from(tr.querySelectorAll('td'))
        const values = {
          short: sanitize(tds[0].textContent),
          long:  sanitize(tds[1].textContent),
        }
        data[num].perus[caseName][idx === 0 ? 'yksikko' : 'monikko'] = values;
      })
    });
  })

document
  .querySelector('#jarjestys')
  .closest('details')
  .querySelectorAll('tbody')
  .forEach(tbody => {
    const num = parseInt(tbody.querySelector('td').textContent.replace(/[^0-9]/g, ''), 10)
    if (isNaN(num)) return;
    data[num].jarjestys = {};
    cases.forEach(caseName => {
      data[num].jarjestys[caseName] = {};
      tbody.querySelectorAll(`tr[title=${caseName}]`).forEach((tr, idx) => {
        const tds = Array.from(tr.querySelectorAll('td'))
        const values = {
          short: sanitize(tds[0].textContent),
          long: sanitize(tds[2].textContent),
        }
        data[num].jarjestys[caseName][idx === 0 ? 'yksikko' : 'monikko'] = values;
      })
    });
  })

console.log(data);
