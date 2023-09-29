export function menu() {
    const start = document.querySelector('li#start-game');

    start.addEventListener('click', () => {
        document.querySelector("#game").classList.add('visible');
        document.querySelector("#menu").classList.add('invisible');
    });
}
