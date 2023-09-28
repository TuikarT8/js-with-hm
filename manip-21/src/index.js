import './index.scss';

/// Caractère précédent
let previousChar = '';
let charRepeatCount = 0;

/**
 *
 * @param {KeyboardEvent} event
 */
window.getCharacter = function ({ key }) {
    const element = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    if (element.includes(key)) {
        if (key === previousChar) {
            charRepeatCount++;
            document.getElementById('badge').classList.add('visible');
        } else {
            charRepeatCount = 0;
            previousChar = key;
            document.getElementById('badge').classList.remove('visible');
        }

        document.getElementById('character').innerText = key;
        document.getElementById('badge').innerText = charRepeatCount;
    }

    return
}
