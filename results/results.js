const points = sessionStorage.getItem('points')

window.onload = function onload() {
    let p = document.querySelector('.points')
    p.innerHTML += points
}

// NON MODIFICARE IL CODICE SOPRA. SE SI NECESSITA IL NUMERO DI PUNTI LAVORARE CON 'points'



