import './index.scss';

const buttons = [];

export class SwitchButton {
    #ouvert = false;
    #element = null;

    constructor(element) {
        console.log('Inside the SwitchButton constructor');
        console.log(element.id);
        this.#element = element;
        this.#element.addEventListener('click', () => this.#onClick());
        this.#element.onclick = "() => {console.log('The inner onclick')}"
        console.log(this.#element);
    }

    #onClick() {
        console.log('Onclick');
        this.#ouvert = !this.#ouvert;
        if (this.#ouvert) {
            this.#element.classList.add('open');
        } else {
            this.#element.classList.remove('open');
        }

        const event = new Event('switched');
        event.switched = this.#ouvert;

        this.#element.dispatchEvent(event);
    }

    static register() {
        document.querySelectorAll('.switch-button').forEach(element => {
            buttons.push(new SwitchButton(element));
        });
    }
}
