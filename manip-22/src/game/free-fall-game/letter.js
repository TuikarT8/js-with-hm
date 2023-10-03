import './letter.scss';
import $ from 'jquery';
import { Events } from '../../events';

export class Letter {
    /**
     * @var {HTMLDivElement}
     */
    #element = null;
    running = false;

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

        $(this.#element).animate(
            { bottom: 0 },
            {
                duration: 10000,
                easing: 'linear',
                start: () => {
                    this.running = true;
                    const callback = () => {
                        this.onGameOver();
                        document.removeEventListener(Events.GameOver, callback);
                    };
                    document.addEventListener(Events.GameOver, callback);
                },
                done: () => {
                    if (this.running) {
                        document.dispatchEvent(new Event(Events.GameOver));
                    }
                }
            }
        );
    }

    clean() {
        this.#element?.remove();
        this.#element = null;
    }

    kill() {
        this.running = false;
        $(this.#element).stop();
        this.clean();
    }

    onGameOver() {
        this.kill();
    }
}
