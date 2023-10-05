import { FreeFallGame } from './free-fall-game';
import { Game, GameDifficultyLevels, GameModes } from './game';
import { StandardGame } from './standard-game';
import $ from 'jquery';
import './index.scss';

let gameEngine = new FreeFallGame();
let controlsPaneOpened = true;

function switchGameMode(mode) {
    document.querySelectorAll('section[role="game-panel"]')
        .forEach(element => {
            element.classList.remove('active');
        });

    if (mode === GameModes.FreeFall) {
        gameEngine = new FreeFallGame();
    } else {
        gameEngine = new StandardGame();
    }
}

function toggleControls() {
    const controls = document.querySelectorAll('div#controls');

    if (controlsPaneOpened) {
        $(controls).animate({right: -230, height: 42,});
        $('button#hide-button > span').animate({rotate: '180deg',});
    } else {
        $(controls).animate({right: 16,height: 289,});
        $('button#hide-button > span').animate({rotate: '0deg',});
    }

    controlsPaneOpened = !controlsPaneOpened;
}

export function game() {
    document.querySelector('button#exit-button')
        .addEventListener('click', () => {
            document.querySelector("#game").classList.remove('visible');
            document.querySelector("#menu").classList.remove('invisible');
        });

    document.querySelector('button#start-button')
        .addEventListener('click', () => {
            toggleControls();
            gameEngine.start();
        });

    document.querySelector('button#try-button')
        .addEventListener('click', () => {
            gameEngine.start();
            document.querySelector("#game-over-popup").classList.remove('visible');
            document.querySelector(".dialog-mask").classList.remove('visible');
        });

    document.querySelector('div#game-mode-switch')
        .addEventListener('switched', (event) => {
            switchGameMode(event.switched ? GameModes.Standard : GameModes.FreeFall);
        });

    document.querySelector('button#hide-button')
        .addEventListener( 'click', toggleControls);

    document.querySelectorAll('.hardness-box > input[type="radio"].hardness-level')
        .forEach((element) => {
            element.addEventListener('click', ()=> {
                switch(element.role) {
                    case GameDifficultyLevels.Easy:
                        Game.gameDifficultyLevel = GameDifficultyLevels.Easy;
                        break;
                    case GameDifficultyLevels.Medium:
                        Game.gameDifficultyLevel = GameDifficultyLevels.Medium;
                        break;
                    case GameDifficultyLevels.Hard:
                        Game.difficultyLevel = GameDifficultyLevels.Hard;
                        break;
                }
            })
        });
}
