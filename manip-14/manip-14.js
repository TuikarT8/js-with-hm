var operationEnCours = false;
var lastCursorX = 0;
var lastCursorY = 0;

/**
 * Démarre la fonctionalité drag-n-drop.
 * Exécutée lorsqu'un click gauche est effectué sur le cercle sans que
 * l'utilisateur ne lache le boutton gauche de la souris. Elle a pour effet
 * de changer le positionnement du cercle en position fixe.
 * @param {MouseEvent} event
 */
function onMouseDown(event) {
    operationEnCours = true;
    const cercle = document.querySelector('div#cercle');
    const rect = cercle.getBoundingClientRect();
    cercle.classList.add('floating');
    cercle.classList.remove('stationnary');

    cercle.style = `top: ${rect.top}; left: ${rect.left}`;

    lastCursorX = event.clientX;
    lastCursorY = event.clientY;
}

/**
 * Gère le déplacement de la souris
 * Ne doit être invoquée que pendant que le boutton gauche de la souris
 * est enfoncé. Cette fonction positionne le cercle selon la position de la souris.
 * @param {MouseEvent} event
 */
function onMouseMove(event) {
    if (!operationEnCours) {
        return;
    }

    repositionCircle(event);
}

function repositionCircle(event) {
    const cercle = document.querySelector('div#cercle');
    const offsetX = event.clientX - lastCursorX;
    const offsetY = event.clientY - lastCursorY;
    const rect = cercle.getBoundingClientRect();
    const positionX = rect.left + offsetX;
    const positionY = rect.top + offsetY;

    lastCursorX = event.clientX;
    lastCursorY = event.clientY;

    cercle.style = `left: ${positionX}px; top: ${positionY}px`;
}

/**
 * Désactive la fonctionalité drag-n-drop.
 * Cette fonction est exécutée lorsque l'utilisateur lache le boutton gauche
 * de la souris.
 * @param {MouseEvent} event
 */
function onMouseUp(event) {
    console.warn('End of it');
    operationEnCours = false;
    const cercle = document.querySelector('div#cercle');
    cercle.classList.remove('floating');
    cercle.classList.add('stationnary');
    cercle.style = "";
}

function onMouseEnter(event) {
    if (!operationEnCours) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const cercle = document.querySelector('div#cercle');
    event.target.appendChild(cercle);
}
