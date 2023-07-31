let tousLesEtudiantsSelectionnés = false;
let etudiants = [];
let étudiantsSélectionnés = [];
const tris = {
    promotion: false,
    nom: false,
    age: false,
};

function afficherEtudiants(etudiantsFiltrés = null) {
    const tbody = document.querySelector("tbody");
    const lignes = etudiantsFiltrés === null ? etudiants : etudiantsFiltrés;
    const nAffichés = lignes.length;
    const nTotal = etudiants.length;
    const tableInfoDiv = document.querySelector(".table-info")
    tableInfoDiv.innerText = nAffichés + " sur "+ nTotal ;

    effacerTableau();

    lignes.forEach((etudiant) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="width: 20px"><input type="checkbox" onclick="selectionEtudiant(event, ${etudiant.id})"></td>
            <td>${etudiant.nom}</td>
            <td>${etudiant.age}</td>
            <td>${etudiant.promotion}</td>
            <td>
                <button
                class="icon-button danger"
                onclick="supprimerLigne(${etudiant.id})"
                >
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>`;
        tbody.appendChild(row);
    });
}

function chargerEtudiants() {
    fetch('http://localhost:3000/students')
        .then((response) => {
            return response.json();
        })
        .then((value) => {
            etudiants = value;
            afficherEtudiants();
        })
        .catch((error) => {
            console.error(error);
        });
}

function supprimerLigne(index) {
    supprimerEtudiant(index);
    etudiants = etudiants.filter((et, idx) => idx !== index);
    afficherEtudiants();
}

function filtrerEtudiants(event) {
    const filtre = event.target.value;

    if (filtre === "") {
        afficherEtudiants();
    } else {
        const resultats = etudiants.filter((etudiant) => {
            return etudiant.nom.toLowerCase().includes(filtre.toLowerCase());
        });
        afficherEtudiants(resultats);
    }
}

function effacerTableau() {
    document.querySelectorAll('tbody > tr').forEach(tr => tr.remove());
}

function réinitialiserTableau() {
    chargerEtudiants();
}

function afficherDialogueAjouterEtudiant() {
    document.querySelector('dialog').open = true;
}

function ajouterEtudiant() {
    const nom = document.querySelector('dialog > form > input[name="nom"]').value;
    const age = Number(document.querySelector('dialog > form > input[name="age"]').value);
    const promotion = document.querySelector('dialog > form > input[name="promotion"]').value;

    const etudiant = {
        nom,
        age,
        promotion,
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://localhost:3000/students', {
        method: 'POST',
        headers,
        body: JSON.stringify(etudiant)
    }).then(() => {
        etudiants.push(etudiant)
    }).catch((error) => {
        console.error(error);
    });

    réinitialiserFormulaire();
}

function réinitialiserFormulaire() {
    document.querySelector('dialog > form > input[name="nom"]').value = '';
    document.querySelector('dialog > form > input[name="age"]').value = '';
    document.querySelector('dialog > form > input[name="promotion"]').value = '';
    document.querySelector('dialog').open = false;
}

function trierParNom() {
    tris.nom = !tris.nom;

    if (tris.nom) {
        etudiants.sort((a, b) => a.nom >= b.nom ? 1 : -1);
    } else {
        etudiants.sort((a, b) => a.nom <= b.nom ? 1 : -1);
    }

    afficherEtudiants();
}

function trierParAge() {
    tris.age = !tris.age;

    if (tris.age) {
        etudiants.sort((a, b) => a.age >= b.age ? 1 : -1);
    } else {
        etudiants.sort((a, b) => a.age <= b.age ? 1 : -1);
    }

    afficherEtudiants();
}

function trierParPromotion() {
    tris.promotion = !tris.promotion;

    if(tris.promotion) {
        etudiants.sort((a,b) => a.promotion >= b.promotion ? 1 : -1);
    } else {
        etudiants.sort((a,b) => a.promotion <= b.promotion ? 1 : -1);
    }
    afficherEtudiants();
}

function supprimerEtudiants(event){
    if (tousLesEtudiantsSelectionnés) {
        etudiants.forEach((e) => supprimerEtudiant(e.id));
    } else if (étudiantsSélectionnés.length > 0) {
        // Supprimer tous les étudiants sélectionnés
        etudiants = etudiants.filter((e) => !étudiantsSélectionnés.includes(e.id));
        étudiantsSélectionnés.forEach(id => supprimerEtudiant(id));
        étudiantsSélectionnés = [];
    }

    tousLesEtudiantsSelectionnés = false;

    activerOuDésactiverBouttonSuppressionGlobal();
    afficherEtudiants();
}

function supprimerEtudiant(id) {
    // Créer une fonction qui supprime un étudiant par HTTP
    fetch(`http://localhost:3000/students/${id}`,{
        method: 'DELETE',
    }).then(() => {
        etudiants = etudiants.filter(e => e.id !== id);
    }).catch((error) => {
        console.error(error);
    });
}

function selectionnnerToutsLesEtudiant(event){
    document.querySelectorAll('input[type="checkbox"]')
            .forEach(elem => elem.checked = event.target.checked);
    tousLesEtudiantsSelectionnés = event.target.checked;

    activerOuDésactiverBouttonSuppressionGlobal();
}

function activerOuDésactiverBouttonSuppressionGlobal() {
    const gobalDeleteButton = document.querySelector("#global-delete-button");
    if (tousLesEtudiantsSelectionnés || étudiantsSélectionnés.length > 0) {
        gobalDeleteButton.disabled = false;
    } else {
        gobalDeleteButton.disabled = true;
    }

    if (!tousLesEtudiantsSelectionnés) {
        document.querySelector('input[type="checkbox"]').checked = false;
    }
}

function selectionEtudiant({ target }, index) {
    if (target.checked) {
        étudiantsSélectionnés.push(index);
    } else {
        if (tousLesEtudiantsSelectionnés) {
            étudiantsSélectionnés = [];

            for (const { id } of etudiants) {
                if (id !== index) {
                    étudiantsSélectionnés.push(id);
                }
            }
            tousLesEtudiantsSelectionnés = false;
        } else {
            tousLesEtudiantsSelectionnés = false;
            étudiantsSélectionnés = étudiantsSélectionnés.filter((et) => et.id !== index);
        }
    }

    activerOuDésactiverBouttonSuppressionGlobal();
}
