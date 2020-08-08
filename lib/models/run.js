import BaseModel from "./base_model";
import Player from "./player";

class Run extends BaseModel {
  player() {
    return new Player({
      id: this.attrs.id,
      steamid: this.attrs.steamid,
      name: this.attrs.name,
    });
  }

  duration() {
    return this.attrs.duration;
  }
}

export default Run;
