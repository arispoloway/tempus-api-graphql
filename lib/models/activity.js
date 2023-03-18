import BaseModel from "./base_model";
import Record from "./record";

class Activity extends BaseModel {
  fetchRecord() {
    return this.context.tempus.activity.load();
  }

  accessRecords(type, extraAttrs, args) {
    return this.access(null, (r) => {
      let records = r[type].map(
        (rec) =>
          new Record(this.context, {
            ...rec,
            ...rec.record_info,
            ...extraAttrs,
          })
      );

      if (args.start) records = records.slice(args.start - 1);
      if (args.limit) records = records.slice(0, args.limit);
      return records;
    });
  }

  bonusWrs(args) {
    return this.accessRecords("bonus_wrs", { rank: 1 }, args);
  }

  courseWrs(args) {
    return this.accessRecords("course_wrs", { rank: 1 }, args);
  }

  mapWrs(args) {
    return this.accessRecords("map_wrs", { rank: 1 }, args);
  }

  mapTops(args) {
    return this.accessRecords("map_tops", {}, args);
  }
}

export default Activity;
