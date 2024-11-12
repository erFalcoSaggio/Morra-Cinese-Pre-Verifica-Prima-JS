// Tutti i diritti riservati © 2024 Falcari Alessandro

// const e variabili globali
const sasso = document.getElementById('sasso');
const carta = document.getElementById('carta');
const forbice = document.getElementById('forbice');
const erroreID = document.getElementById('errore');

let punteggio1 = 0;
let punteggio2 = 0;


function inizioGioco() {
    // Rendo subito invisibile il bottone e cambio il titolo
    let stageIniziale = document.getElementById('stageIniziale');
    stageIniziale.style.display = 'none';
    let titolo = document.getElementById('titolo');
    titolo.innerText = 'Sas-so car-ta for-bi-ce?';

    // Faccio comparire 'sfida'
    let sfida = document.getElementById('sfida');
    sfida.style.display = 'flex';
}

function sceltaPersonale(sceltaPersonale) {
    // vedo cosa è stato cliccato
    // debugging
    console.log(sceltaPersonale);

    // Generare una risposta dell'avversario
    let sceltaAvversario = genera();
    console.log(sceltaAvversario)

    // Uso un switch per assegnare il valore generato ad una mossa
    switch (sceltaAvversario) {
        case 0:
            sceltaAvversario = 'sasso';
            break;
        case 1:
            sceltaAvversario = 'carta';
            break;
        case 2:
            sceltaAvversario = 'forbice';
            break;
        default:
            errore = 'errore nello switch!';
    }

    // debugging
    console.log(sceltaAvversario);

    // dichiaro altre variabili (id per immagine scelta e punti)
    let risRound = document.getElementById('risRound');
    let stageFinale = document.getElementById('stageFinale');
    let sceltaPersonaleIMG = document.getElementById('sceltaPersonale');
    let sceltaAvversarioIMG = document.getElementById('sceltaAvversario');
    let punteggioPersonale = document.getElementById('punteggioPersonale');
    let punteggioAvversario = document.getElementById('punteggioAvversario');


    // determinare chi ha vinto
    let risultato = vincitori(sceltaPersonale, sceltaAvversario);
    console.log(risultato); // debugging

    // stampo risultato
    risRound.innerText = risultato;

    // metto visibile la tabella
    stageFinale.style.display = 'block';

    // modifico immagini delle scelte
    sceltaPersonaleIMG.src = `assets/${sceltaPersonale}.png`;
    sceltaAvversarioIMG.src = `assets/${sceltaAvversario}.png`;

    // incremento il punteggio del vincitore
    switch (risultato) {
        case 'Hai vinto questo round!':
            // incremento punteggio della persona
            punteggio1++;
            punteggioPersonale.innerText = punteggio1;
            break;
        case 'Hai perso, ritenta!':
            // incremento punteggio dell'avversario
            punteggio2++;
            punteggioAvversario.innerText = punteggio2;
            break;
        case 'Pareggio!':
            // non incremento nulla
            break;  
        default:
            errore = 'errore nello switch!';
    }
    erroreID.innerText = errore;
}

function genera() {
    return Math.floor(Math.random() * 3);
}

function vincitori(sceltaPersonale, sceltaAvversario) {
    // oggetto regole
    const regole = {
        'sasso' : 'forbice', // metto una relazione --> sasso vince su forbici ( riprendo dopo con un if )
        'forbice' : 'carta',
        'carta' : 'sasso'
    };

    // scelta uguale
    if (sceltaPersonale == sceltaAvversario) {
        return 'Pareggio!';
    }

    // casi di vittori
    if (regole[sceltaPersonale] == sceltaAvversario) {
        // qui vince sceltaPersonale
        return 'Hai vinto questo round!';
    } else {
        // vince sceltaAvversario per esclusione sarebbe => regole[sceltaAvversario] == sceltaPersonale
        return 'Hai perso, ritenta!';
    }
}