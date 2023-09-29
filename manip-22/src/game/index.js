import { FreeFallGame } from './free-fall-game';
import { Game, GameDifficultyLevels, GameModes } from './game';
import { StandardGame } from './standard-game';
import './index.scss';

let gameEngine = new FreeFallGame();

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

export function game() {
    document.querySelector('button#exit-button')
        .addEventListener('click', () => {
            document.querySelector("#game").classList.remove('visible');
            document.querySelector("#menu").classList.remove('invisible');
        });

    document.querySelector('div#game-mode-switch')
        .addEventListener('switched', (event) => {
            switchGameMode(event.switched ? GameModes.Standard : GameModes.FreeFall);
        });

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
