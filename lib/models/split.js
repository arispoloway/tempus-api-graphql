import BaseModel from "./base_model";

class Split extends BaseModel {
  type() {
    return this.attrs.type;
  }

  zoneindex() {
    return this.attrs.zoneindex;
  }

  customName() {
    return this.attrs.custom_name;
  }

  duration() {
    return this.attrs.duration;
  }

  comparedDuration() {
    return this.attrs.compared_duration;
  }
}

export default Split;
