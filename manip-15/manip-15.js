
function enregistrerFormulaire() {
    const inputs = document.querySelectorAll('form > input');
    for (const input of inputs) {
        localStorage.setItem(input.id, input.value);
    }
}

function restituerFormulaire() {
    const inputs = document.querySelectorAll('form > input');
    for (const input of inputs) {
        input.value = localStorage.getItem(input.id);
    }
}

function effacerFormulaire() {
    const inputs = document.querySelectorAll('form > input');
    for (const input of inputs) {
        localStorage.removeItem(input.id)
        input.value = null;
    }
}

function copierParagrapheDansPressePapier() {
    const text = document.querySelector('p > span')
    navigator.clipboard.writeText(text.innerText)
        .then(() => console.log('Successfully copied text to clipboard'))
        .catch(console.error);
}

function validerInput({ target }) {
    if(target.value.length < 2) {
        target.classList.add("error");
    }
}

function supprimerLaClasseErreur({target}) {
    target.classList.remove("error")
}

function confirmerFormulaire() {
    event.stopPropagation();
    event.preventDefault();
    const lines = []
    const boiteDeDialogue = document.createElement('div');
    const inputs = document.querySelectorAll('input[type="text"]')

    for (const input of inputs) {
        let key = input.name;
        key = key.charAt().toUpperCase() + key.slice(1);
        lines.push(`<tr><td>${key}</td><td>${input.value}</td></tr>`);
    }

    boiteDeDialogue.innerHTML  = `
        <h3>Confirmation</h3>
        <p>Confirmez vous que les informations sont correctes ?</p>
        <table class="table">
            <thead><tr style="font-weight: 700;"><td>Champ</td><td>Valeur</td></tr></thead>
            <tbody>${lines.join('\n')}</tbody>
        </table>
        <button type="submit" class="subtle-button" onclick="fermerBoiteDeDialogue()">Annuler</button>
        <button type="submit" class="positive-button" onclick="confirmerLaBoiteDeDialogue()">Confirmer</button>
    `;
    boiteDeDialogue.id = "boite-de-dialogue"
    boiteDeDialogue.classList.add("form-confirmation-dialog");
    document.body.appendChild(boiteDeDialogue);
}

function fermerBoiteDeDialogue() {
    const dialog = document.querySelector('div#boite-de-dialogue');
    dialog.remove();
}

function confirmerLaBoiteDeDialogue() {
    const form = document.querySelector('form');
    form.submit();
    fermerBoiteDeDialogue();
}

function démarrerChronoValidation() {
    let secondes = 45;
    const compteur = document.querySelector("div#compteur")

    const timer = setInterval(() => {
        compteur.innerText = `Le formulaire sera desactivé dans ${--secondes} secondes`;

        if (secondes <= 0) {
            clearInterval(timer);
            const form = document.querySelector('form');
            document.querySelectorAll('input').forEach(elem => elem.disabled = true);
            document.querySelectorAll('button').forEach(elem => elem.disabled = true);
        }
    }, 1000);
}
