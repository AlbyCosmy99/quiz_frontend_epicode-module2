const points = sessionStorage.getItem('points')

// Per testare il funzionamento dei punti togliere il commento di window.onload (le 4 righe di codice sotto)

const params = new URLSearchParams(window.location.search)

window.onload = function onload() {
    let p = document.querySelector('.points')
    console.log(params)
    p.innerHTML += points
}

// NON MODIFICARE IL CODICE SOPRA. SE SI NECESSITA IL NUMERO DI PUNTI LAVORARE CON 'points'



