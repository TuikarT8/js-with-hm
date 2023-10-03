import { afficherCotes } from "./cotes";

export class Api {
    /**
     * Charge des évènements depuis le serveur
     */
    static chargerEvenements() {
        // 1. Récupérer tous les évènements et les afficher dans #events-panel-contents
        return fetch('http://localhost:3000/events', {
            method: 'GET',
        }).then((response) => {
            return response.json();
        });
    }

    /**
     * Charge des étudiants depuis la base de données
     */
    static chargerEtudiants() {
        return fetch('http://localhost:3000/students');
    }

    /**
     * Crée un étudiant
     * @param {{nom: string, age: number, promotion: string}} etudiant
     * @returns
     */
    static creerEtudiant(etudiant) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch('http://localhost:3000/students', {
            method: 'POST',
            headers,
            body: JSON.stringify(etudiant)
        }).then(() => {
            onCreateStudent(etudiant);
        });
    }

    /**
     * Crée un étudiant
     * @param {{idEtudiant: number, cotes :{cours1:number, cours2:number, cours3:number, cours4:number, cours5:number }}} cote
     * @returns {Promise<void>}
     */
    static creerCotes(cotes) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return fetch('http://localhost:3000/cotes', {
            method: 'POST',
            headers,
            body: JSON.stringify(cotes)
        });
    }

    static chargerCotes() {
        return fetch('http://localhost:3000/cotes', {
            method: 'GET',
        }).then((response) => {
            return response.json();
        });
    }

    /**
     * Supprime plusieurs étudiants
     * @param {number[]} ids
     * @returns {Promise<void>}
     */
    static supprimerEtudiants(ids = []) {
        const promises = ids.map(id => this.supprimerEtudiant(id));
        return Promise.all(promises)
            .then(() => onDeleteManyStudents(etudiants));
    }

    /**
     * Supprime un seul étudiant
     * @param {number} id
     * @returns {Promise<void>}
     */
    static supprimerEtudiant(id) {
        // Créer une fonction qui supprime un étudiant par HTTP
        return fetch(`http://localhost:3000/students/${id}`,{
            method: 'DELETE',
        });
    }

    /**
     * Modifie un étudiant
     * @param {{nom: string, age: number, promotion: string}} etudiant
     */
    static modifierEtudiant(etudiant) {

    }
}
