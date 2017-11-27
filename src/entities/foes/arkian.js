// arkain.js - Type BOSS foe
import Globals from '../../globals';
import { Npc, AIStates } from './npc';
import { Animations } from './animations';

class Arkian extends Npc {

  constructor(game, sprite, level = 1) {
    super(game, sprite, {
      // entity health
      maxHealth: 500,
      // entity AI behavior & control
      ai: {
        LEVEL: level,
        SPEED: 30,
        ENGAGE_RANGE: 72 * 72, // 72 pixels
        ATTACK_RANGE: 12 * 12, // 8 pixels,
        ATTACK_SPEED: 2000, // ms
        ENGAGE_TRESHOLD: 99, // engage even less than X enemies are already engaging

        // x and y offset to stop before approaching the player
        // plus random positioning offsets
        EPSILON_X: 4 + game.rnd.integerInRange(0, 6),
        EPSILON_Y: 1
      },
      // AABB walking collision boxes
      collisions: {
        walkbody: [16, 8, 15, 40] 
      },
      // entity specific animations
      anims: Animations.k1(sprite),
      // make entity bigger in size
      scale: 1.4,
    });
  }

  kill() {
    this.ai.state = AIStates.DEAD;

    // play sfx
    this.game.audio.play(this.sfx.death, true);

    // make the player sprite kind of lying on the ground
    this._sprite.angle = -90;
    this._sprite.y += this._sprite.height * 0.35;

    // set dying flag
    // hit collisions check for 'dying' actors should be disabled!
    this._dying = true;
    
    if (this._dyingFrameName) {
      this._sprite.animations.stop();
      this._sprite.frameName = this._dyingFrameName;
    }

    const tween = this.game.add.tween(this._sprite).to({ alpha: 0 }, 
      80, Phaser.Easing.Linear.None , true, 0, 7, true);

    //tween.onComplete.add(() => this._sprite.kill());
  }

}

export { Arkian };