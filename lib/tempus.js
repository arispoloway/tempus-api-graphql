import fetchResponseByURL from "./utils/fetch_response_by_url";
import CachedByKeyResource from "./utils/cached_by_key_resource";
import CachedResource from "./utils/cached_resource";

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
