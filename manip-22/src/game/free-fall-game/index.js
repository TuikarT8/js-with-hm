import { Events } from '../../events';
import { Game, GameDifficultyLevels } from "../game";
import { Letter } from "./letter";
import './index.scss';

const characteres = ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const chiffres = ['0','1','2','3','4','5','6','7','8','9']
const caracteresSpeciaux = ['&', 'é', "'", '"', '(', '-', 'è', 'ç', 'à', ')', '=', '*', '$', 'ù', '!', ':', ';', 'ù', ','];

export class FreeFallGame extends Game {
    #element = null;
    #letters = {};
    #interval = null;
    #running = false;
    #missedCount = 0;
    #successCount = 0;
    #fallSpeed = 30000;
    #generationSpeed = 1000;

    onKeyUp = (event) => {
        const key = event.key.toUpperCase();
        const letter = this.#letters[key]?.[0];
        if (!letter) {
            this.#onMissedKey();
            this.#recalculateAndRenderStats();
            return;
        }

        this.#onSuccessfulKey();

        letter.kill();
        this.#letters[key]?.splice(0, 1);
        this.#recalculateAndRenderStats();
    }

    constructor() {
        super();
        this.setup();
    }

    setup() {
        this.#element = document.querySelector('section#free-fall-game-panel');
        this.#element.innerHtml = '';
        this.#element.classList.add('active');

        document.addEventListener(Events.GameOver, () => {
            /**
             * On passe running à false car on veut rendre possible le démarrage d'une nouvelle
             * partie.
             */
            this.#running = false;

            clearInterval(this.#interval);
            this.#displayGameOverPopup();
            this.#clean();
        });
    }

    start() {
        /**
         * Ne pas demarrer une nouvelle partie s'il y en a déjà une en cours d'exécution.
         */
        if (this.#running) {
            return;
        }

        this.#element.querySelector('#stats').innerHTML = 'Précision 0%';
        this.#hookKeyboardEvents();

        this.#running = true;
        this.#interval = setInterval(() => {
            this.runIteration();
        }, this.#generationSpeed);
    }

    #hookKeyboardEvents() {
        document.addEventListener('keyup', this.onKeyUp);
    }

    #unhookToKeyboardEvents() {
        document.removeEventListener('keyup', this.onKeyUp);
    }

    runIteration() {
        if (Game.difficultyLevel === GameDifficultyLevels.Easy) {
            this.#runInEasyMode();
        } else if (Game.difficultyLevel === GameDifficultyLevels.Medium) {
            this.#runInMediumMode();
        } else {
            this.#runInHardMode();
        }

        this.#recalculateAndRenderStats();
    }

    #runInEasyMode() {
        const position = this.#getRandomCharacter(characteres);
        const letter = characteres[position];
        const maxLettersForScreenWidth = Math.floor(window.innerWidth / (64 + 16));
        const letterScreenPosition = Math.floor(Math.random() * maxLettersForScreenWidth);

        if (!this.#letters[letter]) {
            this.#letters[letter] = [];
        }

        this.#letters[letter]
            .push(new Letter(this.#element, letter, letterScreenPosition, this.#fallSpeed));

    }

    #getRandomCharacter(characteres) {
        return Math.floor(Math.random() * characteres.length);
    }

    #runInMediumMode() {

    }

    #runInHardMode() {

    }

    #clean() {
        this.#unhookToKeyboardEvents();

        for (const key in this.#letters) {
            this.#letters[key].forEach(l => l.kill());
            this.#letters[key] = [];
        }
    }

    #displayGameOverPopup() {
        document.querySelector('#game-over-popup').classList.add('visible');
        document.querySelector('.dialog-mask').classList.add('visible');
    }

    #onMissedKey() {
        this.#missedCount++;
    }

    #recalculateAndRenderStats() {
        const stats = document.getElementById('stats');
        const precision = Math.floor((this.#successCount * 100) / (this.#missedCount + this.#successCount));
        stats.innerHTML = `Précison ${precision || 100}%`;
    }

    #onSuccessfulKey() {
        this.#successCount++;

        if (this.#successCount % 200 === 0) {
            this.#generationSpeed -= 10;
            this.#fallSpeed -= 1000;
        }
    }
}
