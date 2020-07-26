class BaseModel {
    constructor(attrs){
        this.attrs = attrs;
    }

    async ensureRecordLoaded() {
        if (!this._record) {
            this._record = await this.fetchRecord();
        }
    }

    async access(key, record_fetch) {
        if (key) {
            let r = this.attrs[key];
            if (r) return r;
        }

        await this.ensureRecordLoaded();

        if(this._record) {
            return record_fetch(this._record);
        }
        return null;
    }
}

export default BaseModel;
