import {
    afficherDialogueAjouterEtudiant,
    afficherEtudiants,
    ajouterEtudiant,
    chargerEtudiants,
    filtrerEtudiants,
    réinitialiserFormulaire,
    réinitialiserTableau,
    selectionnnerToutsLesEtudiant,
    supprimerEtudiants,
    trierParAge,
    trierParNom,
    trierParPromotion
} from './etudiants';
import { onNavLinkClick } from './nav';
import { openEventsPane, chargerEvenements, closeEventsPane } from './events';
import { Tabs } from './app';
import { afficherDialogueAjouterDelibe, ajouterCotationParEtudiant, réinitialiserFormulaireCotes , afficherCotes, chargerCotes} from './cotes';

document.body.onload = () => {
    chargerEtudiants();

    document.querySelector('a#history-nav-link').onclick = (event) => {
        onNavLinkClick(event);
        openEventsPane();
        chargerEvenements();
    };

    document.querySelector('tbody');

    document.querySelector('a#delibe-nav-link').onclick = (event) => {
        onNavLinkClick(event);
        Tabs.setSelectedtab('delibe-tab-panel');
        chargerCotes();
    }

    document.querySelector('input#filter-students').oninput = filtrerEtudiants;
    document.querySelector('button#global-delete-button').onclick = supprimerEtudiants;
    document.querySelector('button#global-add-student-button').onclick = afficherDialogueAjouterEtudiant;
    document.querySelector('button#global-init-table').onclick = réinitialiserTableau;

    document.querySelector('input#global-select-students-checkbox').onclick = selectionnnerToutsLesEtudiant;
    document.querySelector('th#th-nom').onclick = trierParNom;
    document.querySelector('th#th-age').onclick = trierParAge;
    document.querySelector('th#th-promotion').onclick = trierParPromotion;
    document.querySelector('div#table-info').onload = afficherEtudiants;
    document.querySelector('button#primary-button').onclick = ajouterEtudiant;
    document.querySelector('button#subtle-button').onclick = réinitialiserFormulaire;
    document.querySelector('button#window-button').onclick = closeEventsPane;

    document.querySelector('button#student-view-back-btn').onclick = () => Tabs.setSelectedtab('table-section');
    document.querySelector('button#delibe-view-back-btn').onclick = () => Tabs.setSelectedtab('table-section');
    document.querySelector('button#global-add-delibe-button').onclick = afficherDialogueAjouterDelibe;
    document.querySelector('button#primary-button-delibe').onclick  = ajouterCotationParEtudiant;
    document.querySelector('button#subtle-button-delibe').onclick = réinitialiserFormulaireCotes;
    document.querySelector('div#table-info').onload = afficherCotes;
}
