let demo1 = new Object();
let demo2 = {};
let demo3 = new Array();
let demo4 = [];
let demo5 = "bonjour le monde";
let demo6 = true;
let demo7 = 6;
let demo8 = null;
let tousLesEtudiantsSelectionnés = false;

const etudiantsBase =  [
    {nom: 'Jimmy Mulumba', age: 33, promotion: 'L2'},
    {nom: 'Harte Ntumba', age: 23, promotion: 'G2'},
    {nom: 'Jessica Lowa', age: 13, promotion: 'G1'},
    {nom: 'Patrick Tshibamba', age: 34, promotion: 'G3'},
    {nom: 'Belo Kisombe', age: 31, promotion: 'L1'},
    {nom: 'Samy Kamoto', age: 19, promotion: 'G2'},
    {nom: 'Pays Ilunga', age: 56, promotion: 'M1'},
];
let etudiants = [...etudiantsBase];

function afficher() {
    console.log(typeof demo1);
    console.log(typeof demo2);
    console.log(typeof demo3);
    console.log(typeof demo4);
    console.log(typeof demo5);
    console.log(typeof demo6);
    console.log(typeof demo7);
    console.log(typeof demo8);
    demo4 = 3;
    console.log(typeof demo4);
}

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

    lignes.forEach((etudiant, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="width: 20px"><input type="checkbox" onclick="selectionEtudiant(event, ${index})"></td>
            <td>${etudiant.nom}</td>
            <td>${etudiant.age}</td>
            <td>${etudiant.promotion}</td>
            <td>
                <button
                class="icon-button danger"
                onclick="supprimerLigne(${index})"
                >
                <i class="fa-solid fa-trash"></i>
                </button>
            </td>`;
        tbody.appendChild(row);
    });
}

function supprimerLigne(index) {
    etudiants = etudiants.filter((et, idx) => idx != index);
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
    etudiants = [ ...etudiantsBase ];
    afficherEtudiants();
}

function afficherDialogueAjouterEtudiant() {
    document.querySelector('dialog').open = true;
}

function ajouterEtudiant() {
    const nom = document.querySelector('dialog > form > input[name="nom"]').value;
    const age = Number(document.querySelector('dialog > form > input[name="age"]').value);
    const promotion = document.querySelector('dialog > form > input[name="promotion"]').value;

    etudiants.push({
        nom,
        age,
        promotion,
    });

    afficherEtudiants();
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

    console.log(etudiants);
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
        // Supprimer tous les étudiants
        etudiants = [];
    } else if (étudiantsSélectionnés.length > 0) {
        // Supprimer tous les étudiants sélectionnés
        etudiants = etudiants.filter((e, id) => !étudiantsSélectionnés.includes(id));
    }

    tousLesEtudiantsSelectionnés = false;

    activerOuDésactiverBouttonSuppressionGlobal();
    afficherEtudiants();
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

            for (const idx in etudiants) {
                if (Number(idx) !== index) {
                    étudiantsSélectionnés.push(Number(idx));
                }
            }
            tousLesEtudiantsSelectionnés = false;
        } else {
            tousLesEtudiantsSelectionnés = false;
            étudiantsSélectionnés = étudiantsSélectionnés.filter((et, idx) => idx !== index);
        }
    }

    activerOuDésactiverBouttonSuppressionGlobal();
}
