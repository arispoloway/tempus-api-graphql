import fetch from "node-fetch";
import LRU from "lru-cache";

const BASE_URL = "https://tempus.xyz/api/";

function fetchResponseByURL(relativeURL) {
  /* eslint-disable no-console */
  console.log(`Fetching ${BASE_URL}${relativeURL}`);
  /* eslint-enable no-console */
  return fetch(`${BASE_URL}${relativeURL}`).then((res) => {
    const j = res.json();
    return j.error ? null : j;
  });
}

class CachedByKeyResource {
  constructor(loader, options = {}) {
    const timeout = options.timeout || 60;
    const max = options.max || 10;

    this.loader = loader;
    this.keyFunc = options.keyFunc || ((x) => JSON.stringify(x));

    // insired by https://spin.atomicobject.com/2018/09/10/javascript-concurrency/
    // My knowledge of JS's runtime is not good enough to fully vet this, but seems reasonable ish
    // Also I don't really need concurrency guarantees for this project anyway
    this.inFlight = {};
    this.cache = new LRU({ max, maxAge: timeout * 1000 });
  }

  async load(item) {
    if (item === null) return null;
    const key = this.keyFunc(item);

    const { inFlight } = this;

    if (!inFlight[key]) {
      inFlight[key] = (async () => {
        try {
          const cached = this.cache.get(key);

          if (cached) {
            // Something with the inFlight delete doesn't work without awaiting in here
            // I know it's dumb, I'll figure out the reason later
            await (async () => {});
            return cached;
          }

          const r = await this.loader(item);
          this.cache.set(key, r);
          return r;
        } finally {
          delete inFlight[key];
        }
      })();
    }

    return inFlight[key];
  }
}

class CachedResource extends CachedByKeyResource {
  constructor(loader, options = {}) {
    super(loader, { ...options, max: 1 });
  }

  load() {
    return super.load("0"); // Just use 0 as the cache key for everything
  }
}

const allMaps = new CachedResource(
  () => fetchResponseByURL("maps/detailedList"),
  { timeout: 600 }
);
const activity = new CachedResource(() => fetchResponseByURL("activity"));
const allServers = new CachedResource(async () => {
  const r = await fetchResponseByURL("servers/statusList");
  return r.map((server) => ({ ...server.server_info, ...server.game_info }));
});

const mapsByName = new CachedByKeyResource((name) =>
  fetchResponseByURL(`maps/name/${name}/fullOverview`)
);
const playersById = new CachedByKeyResource((id) =>
  fetchResponseByURL(`players/id/${id}/stats`)
);
const recordListByMapName = new CachedByKeyResource((info) =>
  fetchResponseByURL(
    `maps/name/${info.mapName}/zones/typeindex/${info.zoneType || "map"}/${
      info.zoneId || 1
    }/records/list?start=${info.start || 1}&limit=${info.limit || 25}`
  )
);
const recordListByMapId = new CachedByKeyResource((info) =>
  fetchResponseByURL(
    `maps/id/${info.mapId}/zones/typeindex/${info.zoneType || "map"}/${
      info.zoneId || 1
    }/records/list?start=${info.start || 1}&limit=${info.limit || 25}`
  )
);
const recordsById = new CachedByKeyResource(
  (id) => fetchResponseByURL(`records/id/${id}/overview`),
  { timeout: 120 }
);
const demosById = new CachedByKeyResource(
  (id) => fetchResponseByURL(`demos/id/${id}/overview`),
  { timeout: 120 }
);

const serversById = {
  load: async (id) => {
    const servers = await allServers.load();
    return servers.find((s) => s.id === id);
  },
};

export {
  mapsByName,
  playersById,
  recordListByMapName,
  recordListByMapId,
  recordsById,
  demosById,
  serversById,
  allServers,
  allMaps,
  activity,
};
