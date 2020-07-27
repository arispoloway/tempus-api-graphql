import BaseModel from './base_model.js';
import { activity } from '../tempus.js';
import Record from './record.js';

class Activity extends BaseModel {
    fetchRecord() {
        return activity.load();
    }

    accessRecords(type, extraAttrs) {
        return this.access(null,
                           (r) => (
                               r[type].map(
                                   rec => new Record({...rec, ...rec.record_info, ...extraAttrs})
                               )));
    }

    bonusWrs() {
        return this.accessRecords('bonus_wrs', {rank: 1});
    }
    courseWrs() {
        return this.accessRecords('course_wrs', {rank: 1});
    }
    mapWrs() {
        return this.accessRecords('map_wrs', {rank: 1});
    }
    mapTops() {
        return this.accessRecords('map_tops');
    }
}

export default Activity;
