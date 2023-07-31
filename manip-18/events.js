const TypesEvenements = {
    AjoutSingulerEtudiant: 'AJOUT_SINGULER_ETUDIANT',
    SuppressionSinguliereEtudiant: 'SUPPRESSION_SINGULIERE_ETUDIANT',
    SuppressionMultipleEtudiants: 'SUPPRESSION_MULTIPLE_ETUDIANTS',
};
const headers = new Headers();
headers.append('Content-Type', 'application/json');

/**
 * Crée un évènement du type {nom: string, date: Date, type: 'AJOUT_SINGULIER_ETUDIANT'}
 * @param {{nom: string, age?: number, promotion?: string }} etudiant
 */
function onCreateStudent(etudiant) {
    if (!etudiant) return;

    // 1. Contacter le serveur pour créér l'évènement
    fetch('http://localhost:3000/events', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            nom: etudiant.nom,
            date: new Date(),
            type: TypesEvenements.AjoutSingulerEtudiant,
        })
    }).catch((error) => {
        console.error(error);
    });
}

/**
 * Crée un évènement du type {nom: string, date: Date, type: 'SUPPRESSION_SINGULIERE_ETUDIANT'}
 * @param {{nom: string, age?: number, promotion?: string }} etudiant
 */
function onDeleteStudent(etudiant) {
    // 1. Contacter le serveur pour créer l'évènement
    fetch('http://localhost:3000/events', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            nom: etudiant.nom,
            date: new Date(),
            type: TypesEvenements.SuppressionSinguliereEtudiant,
        })
    }).catch((error) => {
        console.error(error);
    });
}

/**
 * Crée un évènement du type {nom: string, date: Date, type: 'SUPPRESSION_MULTIPE_ETUDIANTS'}
 * @param {Array<{nom: string, age?: number, promotion?: string }>} etudiants
 */
function onDeleteManyStudents(etudiants) {
    // 1. Contacter le serveur pour crééer l'évènement
    fetch('http://localhost:3000/events', {
        method: 'POST',
        headers,
        body: JSON.stringify({
            noms: etudiants.map(etudiant => etudiant.nom),
            date: new Date(),
            type: TypesEvenements.SuppressionMultipleEtudiants,
        })
    }).catch((error) => {
        console.error(error);
    });
}

function openEventsPane() {
    document.querySelector('aside#events-panel').classList.add('open');
}

function closeEventsPane() {
    document.querySelector('aside#events-panel').classList.remove('open');
}

function chargerEvenements() {
    // 1. Récupérer tous les évènements et les afficher dans #events-panel-contents
    fetch('http://localhost:3000/events', {
        method: 'GET',
    }).then((response) => {
        return response.json();
    })
    .then((value) => {
        afficherEvenements(value);
    })
    .catch((error) => {
        console.error(error);
    });
}

/**
 * Affiche les évènements dans le panneaux d'évènements
 * @param {{nom?: string, noms: string[], date: string, type: 'AJOUT_SINGULER_ETUDIANT' | 'AJOUT_MULTIPLE_ETUDIANTS' | 'SUPPRESSION_MULTIPE_ETUDIANTS'}[]} evenements
 */
function afficherEvenements(evenements) {
    supprimerLignes();

    // afficher les évènements dans #events-panel-contents
    const eventPanel = document.querySelector('#events-panel-contents');
    evenements.forEach(evenement => {
        const row = document.createElement('div');

        row.classList.add('event-line');
        row.classList.add(evenement.type === TypesEvenements.AjoutSingulerEtudiant ? 'ajout' : 'suppression');
        row.innerHTML = `
            ${evenement.type === TypesEvenements.AjoutSingulerEtudiant ? '<i class="fa-solid fa-user-plus"></i>' : '<i class="fa-solid fa-user-xmark"></i>'}
            <span>${makeEventDescription(evenement)}</span>
        `
        eventPanel.appendChild(row);
    });
}

/**
 * Affiche les évènements dans le panneaux d'évènements
 * @param {{nom?: string, noms: string[], date: string, type: 'AJOUT_SINGULER_ETUDIANT' | 'AJOUT_MULTIPLE_ETUDIANTS' | 'SUPPRESSION_MULTIPE_ETUDIANTS'}} evenements
 */
function makeEventDescription(evenement) {
    if (evenement.type === TypesEvenements.AjoutSingulerEtudiant) {
        return `A ajouté l'étudiant ${evenement.nom}`
    } else if (evenement.type === TypesEvenements.SuppressionSinguliereEtudiant) {
        return `A supprimé l'étudiant ${evenement.nom}`;
    } else {
        return `A supprimé plusieurs étudiants`;
    }
}

function supprimerLignes() {
    document.querySelectorAll('#events-panel-contents > div').forEach(e => e.remove());
}
