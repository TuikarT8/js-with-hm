import { Api } from "./api";
import { etudiants } from "./etudiants";

export let cotes = [];


export function afficherDialogueAjouterDelibe() {
    const select = document.querySelector('dialog#dialog-delibe > form > select');
    select.querySelectorAll('option').forEach(o => o.remove());

    etudiants.forEach(e => {
        const option = document.createElement('option');
        option.value = e.id;
        option.innerText = e.nom;
        select.appendChild(option);
    });
    document.querySelector('dialog#dialog-delibe').open = true;
}

export function ajouterCotationParEtudiant() {
    const cours1 = Number(document.querySelector('dialog#dialog-delibe > form > input[name="cours1"]').value);
    const cours2 = Number(document.querySelector('dialog#dialog-delibe > form > input[name="cours2"]').value);
    const cours3 = Number(document.querySelector('dialog#dialog-delibe > form > input[name="cours3"]').value);
    const cours4 = Number(document.querySelector('dialog#dialog-delibe > form > input[name="cours4"]').value);
    const cours5 = Number(document.querySelector('dialog#dialog-delibe > form > input[name="cours5"]').value);
    const idEtudiant = Number(document.querySelector('dialog#dialog-delibe > form > #etudiant').value)
    const cote = {
       idEtudiant,
       cotes: {
        cours1,
        cours2,
        cours3,
        cours4,
        cours5
       }
    };

    Api.creerCotes(cote)
        .then(() => {
            cotes.push(cotes);
        }).catch((error) => {
            console.error(error);
        });

    réinitialiserFormulaireCotes();
}

export function réinitialiserFormulaireCotes() {
    const cours1 = document.querySelector('dialog#dialog-delibe > form > input[name="cours1"]').value = '';
    const cours2 = document.querySelector('dialog#dialog-delibe > form > input[name="cours2"]').value = '';
    const cours3 = document.querySelector('dialog#dialog-delibe > form > input[name="cours3"]').value = '';
    const cours4 = document.querySelector('dialog#dialog-delibe > form > input[name="cours4"]').value = '';
    const cours5 = document.querySelector('dialog#dialog-delibe > form > input[name="cours5"]').value = '';
    const idEtudiant = document.querySelector('dialog#dialog-delibe > form > #etudiant').value = '';
    document.querySelector('dialog#dialog-delibe').open = false;
}

export function afficherCotes(cotes) {
    const tbody = document.querySelector('tbody#tbody-cotes');

    console.log(cotes);
    effacerLignesTableau();

    cotes.forEach((cote) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${etudiants.find(e => e.id === cote.idEtudiant).nom}</td>
            <td>${etudiants.find(e => e.id === cote.idEtudiant).promotion}</td>
            <td>${cote.cotes.cours1}</td>
            <td>${cote.cotes.cours2}</td>
            <td>${cote.cotes.cours3}</td>
            <td>${cote.cotes.cours4}</td>
            <td>${cote.cotes.cours5}</td>
            <td>${calculerDecisionJury(cote)}</td>`;

            tbody.appendChild(row);
    });
}

export function calculerDecisionJury(cote) {
    const moyenneTotal = 5;
    const pourcentageValide = 60;
    const moyenne = (cote.cotes.cours1 + cote.cotes.cours2 + cote.cotes.cours3 + cote.cotes.cours4 + cote.cotes.cours5) / moyenneTotal
    if (moyenne >= pourcentageValide ) {
        return 'A réussi'
    } else {
        return 'A échoué';
    }
}

function effacerLignesTableau() {
    document.querySelectorAll('tbody#tbody-cotes > tr').forEach(tr => tr.remove());
}

export function chargerCotes() {
    Api.chargerCotes()
    .then((value) => {
        afficherCotes(value);
    })
    .catch((error) => {
        console.error(error);
    });
}
