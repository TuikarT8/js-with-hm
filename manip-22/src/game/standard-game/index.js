import { Game } from "../game";

export class StandardGame extends Game {
    #element = null;

    constructor() {
        super();
        this.setup();
    }

    setup() {
        this.#element = document.querySelector('section#standard-game-panel');
        this.#element.innerHtml = '';
        this.#element.classList.add('active')
    }
}
