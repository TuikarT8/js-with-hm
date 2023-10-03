export const GameModes = {
    Standard: 'standard',
    FreeFall: 'free-fall',
};

export const GameDifficultyLevels = {
    Easy: 'facile',
    Medium: 'moyen',
    Hard: 'difficile',
};

export class Game {
    static difficultyLevel = GameDifficultyLevels.Easy;

    setup() {
        throw new Error('Vous ne pouvez pas instancier cette classe. Servez-vous de ses filles');
    }

    start() {

    }
}
