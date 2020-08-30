import BaseModel from "./base_model";
import Map from "./map";

class Zone extends BaseModel {
  id() {
    return this.attrs.id;
  }

  map() {
    return new Map({ id: this.attrs.map_id });
  }

  type() {
    return this.attrs.type;
  }

  zoneindex() {
    return this.attrs.zoneindex;
  }

  customName() {
    return this.attrs.custom_name;
  }
}

export default Zone;
