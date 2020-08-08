/* eslint-disable no-underscore-dangle */

class BaseModel {
  constructor(attrs) {
    this.attrs = attrs;
  }

  async ensureRecordLoaded() {
    if (!this._record) {
      this._record = await this.fetchRecord();
    }
  }

  async access(key, loader) {
    if (key) {
      const r = this.attrs[key];
      if (r) return r;
    }

    await this.ensureRecordLoaded();

    if (this._record) {
      return loader(this._record);
    }
    return null;
  }
}
/* eslint-enable no-underscore-dangle */

export default BaseModel;
