import BaseModel from "./base_model";
import { demosById } from "../tempus";
import Player from "./player";
import Map from "./map";
import Server from "./server";

class Demo extends BaseModel {
  fetchRecord() {
    return demosById.load(this.attrs.id);
  }

  id() {
    return this.attrs.id;
  }

  map() {
    if (this.attrs.mapname) return new Map({ name: this.attrs.mapname });

    return this.access("map", (r) => new Map({ name: r.demo_info.mapname }));
  }

  filename() {
    return this.access("filename", (r) => r.demo_info.filename);
  }

  date() {
    return this.access("date", (r) => r.demo_info.date);
  }

  url() {
    return this.access("url", (r) => r.demo_info.url);
  }

  recording() {
    return this.access("recording", (r) => r.demo_info.recording);
  }

  requested() {
    return this.access("requested", (r) => r.demo_info.requested);
  }

  expired() {
    return this.access("expired", (r) => r.demo_info.expired);
  }

  deleted() {
    return this.access("deleted", (r) => r.demo_info.deleted);
  }

  uploader() {
    if ("uploader_id" in this.attrs) {
      if (this.attrs.uploader_id)
        return new Player({ name: this.attrs.uploader_id });

      return null;
    }

    return this.access(
      "uploader",
      (r) =>
        r.demo_info.uploader_id && new Player({ id: r.demo_info.uploader_id })
    );
  }

  server() {
    return this.access("server", (r) => new Server(r.server_info));
  }
}

export default Demo;
