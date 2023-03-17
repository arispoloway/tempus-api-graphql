/* eslint-disable no-underscore-dangle */

class BaseModel {
  constructor(context, attrs) {
    this.context = context;
    this.attrs = attrs;
  }

  async ensureRecordLoaded() {
    if (!this._record) {
      this._record = await this.fetchRecord();
    }
  }

  async access(key, loader) {
    if (key && key in this.attrs) return this.attrs[key];

    await this.ensureRecordLoaded();

    if (this._record) {
      return loader(this._record);
    }
    return null;
  }
}
/* eslint-enable no-underscore-dangle */

export default BaseModel;
