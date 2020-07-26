import BaseModel from './base_model.js';
import Player from './player.js';

class Run extends BaseModel {
    player() {
        return new Player({id: this.attrs.id, steamid: this.attrs.steamid, name: this.attrs.name});
    }

    duration() {
        return this.attrs.duration;
    }
}

export default Run;
