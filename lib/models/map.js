import BaseModel from './base_model.js';
import { mapsByName, recordListByMapName, recordListByMapId } from '../tempus.js';
import Record from './record.js';

class Map extends BaseModel {
    fetchRecord() {
        return mapsByName.load(this.attrs.name);
    }

    id() {
        return this.access('id', (r) => r.map_info.id);
    }

    name() {
        return this.access('name', (r) => r.map_info.name);
    }

    authors() {
        return this.access('authors', (r) => r.authors);
    }

    videos() {
        return this.access('videos', (r) => r.videos);
    }

    tiers() {
        return this.access('tiers', (r) => r.tier_info);
    }

    runs() {
        return this.access('runs', (r) => (
            { soldier: r.soldier_runs.map((run) => new Run(run)),
              demoman: r.demoman_runs.map((run) => new Run(run))}));
    }

    async records(args) {
        let rs = null;
        if (this.attrs.name) {
            rs = await recordListByMapName.load({mapName: this.attrs.name, ...args});
        } else {
            rs = await recordListByMapId.load({mapId: this.attrs.id, ...args});
        }
        return { soldier: rs.results.soldier.map((record) => new Record(record)),
                 demoman: rs.results.demoman.map((record) => new Record(record))};
    }
}

export default Map;
