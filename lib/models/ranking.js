import BaseModel from "./base_model";
import Player from "./player";

class Ranking extends BaseModel {
  player() {
    return new Player(this._context, this.attrs);
  }

  rank() {
    return this.attrs.rank;
  }

  points() {
    return this.attrs.points;
  }
}

export default Ranking;
