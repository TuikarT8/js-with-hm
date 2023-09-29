import { game } from "..";
import { Game, GameDifficultyLevels } from "../game";
import { Letter } from "./letter";

let lettersGenerationInterval = 1000;
const characteres = ["A","B","C","D","E","F","G","H","I","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const chiffres = ['0','1','2','3','4','5','6','7','8','9']
const caracteresSpeciaux = ['&', 'é', "'", '"', '(', '-', 'è', 'ç', 'à', ')', '=', '*', '$', 'ù', '!', ':', ';', 'ù', ','];

export class FreeFallGame extends Game {
    #element = null;
    #letters = [];

    constructor() {
        super();
        this.setup();
    }

    setup() {
        this.#element = document.querySelector('section#free-fall-game-panel');
        this.#element.innerHtml = '';
        this.#element.classList.add('active');

        setInterval(() => {
            this.run();
        }, lettersGenerationInterval);
    }

    run() {
        if (Game.difficultyLevel === GameDifficultyLevels.Easy) {
            this.#runInEasyMode();
        } else if (Game.difficultyLevel === GameDifficultyLevels.Medium) {
            this.#runInMediumMode();
        } else {
            this.#runInHardMode();
        }
    }

    #runInEasyMode() {
        const position = this.#getRandomCharacter(characteres);
        const letter = characteres[position];
        const maxLettersForScreenWidth = Math.floor(window.innerWidth / (64 + 16));
        const letterScreenPosition = Math.floor(Math.random() * maxLettersForScreenWidth);

        this.#letters.push(new Letter(this.#element, letter, letterScreenPosition));
    }

    #getRandomCharacter(characteres) {
        return Math.floor(Math.random() * characteres.length);
    }

    #runInMediumMode() {

    }

    #runInHardMode() {

    }

}
