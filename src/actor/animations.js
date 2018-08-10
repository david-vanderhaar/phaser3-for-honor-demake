export function createAnimations(game) {
    let animations = [
        {
            key: 'flourish',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 0, end: 10, first: 0 }),
            frameRate: 20
        },
        {
            key: 'hit',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 88, end: 91, first: 88 }),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'idle',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 24, end: 27, first: 24 }),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'run',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 28, end: 31, first: 28 }),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'jump',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 84, end: 87, first: 84 }),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'heavy',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 20, end: 23, first: 20 }),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'light',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 32, end: 35, first: 32 }),
            // repeat: 1,
            frameRate: 12
        },
        {
            key: 'light_2',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 64, end: 67, first: 67 }),
            repeat: -1,
            frameRate: 12
        },
        {
            key: 'death',
            frames: game.anims.generateFrameNumbers('sword_guy', { start: 72, end: 83, first: 72 }),
            repeat: 0,
            frameRate: 12
        },

    ];
    return animations;
}

export function initAnimations(game, animations) {
    //initialize animations to game object
    animations.forEach((a) => {
        game.anims.create(a);
    });
}
