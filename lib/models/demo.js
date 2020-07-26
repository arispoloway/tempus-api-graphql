import BaseModel from './base_model.js';
import { demosById } from '../tempus.js';
import Record from './record.js';
import Map from './map.js';
import Server from './server.js';

class Demo extends BaseModel {
    fetchRecord() {
        return demosById.load(this.attrs.id);
    }

    map() {
        return this.access('map', (r) => new Map({name: r.demo_info.mapname}));
    }

    filename() {
        return this.access('filename', (r) => r.demo_info.filename);
    }

    date() {
        return this.access('date', (r) => r.demo_info.date);
    }

    url() {
        return this.access('url', (r) => r.demo_info.url);
    }

    recording() {
        return this.access('recording', (r) => r.demo_info.recording);
    }

    requested() {
        return this.access('requested', (r) => r.demo_info.requested);
    }

    expired() {
        return this.access('expired', (r) => r.demo_info.expired);
    }

    deleted() {
        return this.access('deleted', (r) => r.demo_info.deleted);
    }

    uploader() {
        return this.access('uploader', (r) => r.demo_info.uploader_id && new Player({id: r.demo_info.uploader_id}));
    }

    server() {
        return this.access('server', (r) => new Server(r.server_info));
    }
}

export default Demo;
