class Api {
    /**
     * Charge des évènements depuis le serveur
     */
    static chargerEvenements() {
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
     * Charge des étudiants depuis la base de données
     */
    static chargerEtudiants() {
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
