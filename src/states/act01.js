// act01.js - level 1 implementation

import Renderer from './renderer';
import { 
  GamePlay, 
  GamePlayConsts,
  TileMapConsts
} from './gameplay';
import { Hero } from '../entities';

const Consts = {

};

class Act1 extends GamePlay {

  create() {
    super.create();

    this.createLevel('act1');

    this.player = new Hero(this.game);
    this.player.spawn(50, 144);

    this.addSpriteToLayer(this.player.sprite, true);

    this.arrangeLayers();
  }

  update() {
    this.player.update();
    this.updatePlayerCollisions(this.player.sprite);

    // TODO
    // go to level 2
    if (this.player.sprite.x > 24 * 48 + 24) {
      this.state.start('act2');
    }
    
    // do collisions checks, etc. after player & NPC movements
    super.update();
  }

}

export { Act1 };