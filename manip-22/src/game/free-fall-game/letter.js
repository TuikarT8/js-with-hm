import './letter.scss';
import $ from 'jquery';


export class Letter {
    /**
     * @var {HTMLDivElement}
     */
    #element = null;

    /**
     *
     * @param {HTMLDivElement} parent
     */
    constructor(parent, letter, position) {
        this.#element = document.createElement('div');
        this.#element.classList.add('letter');
        this.#element.innerText = letter;
        this.#element.style = `margin-left: ${(position * (64 + 16))}px`;

        parent.appendChild(this.#element);

        $(this.#element).animate({
            bottom: 0,
        }, 10000, 'linear');
    }

    kill() {
        this.#element.ClassList.add('hit');
    }

    tearDown() {
        this.#element.remove();
        this.#element = null;
    }
}
