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
const mapsByName = new CachedByKeyResource(async (name) => {
  const r = await fetchResponseByURL(`maps/name/${name}/fullOverview2`);
  /* eslint-disable no-use-before-define */
  mapsById.set(r.map_info.id, r);
  /* eslint-enable no-use-before-define */
  return r;
});
const mapsById = new CachedByKeyResource(async (id) => {
  const r = await fetchResponseByURL(`maps/id/${id}/fullOverview2`);
  mapsByName.set(r.map_info.name, r);
  return r;
});
const playersById = new CachedByKeyResource((id) =>
  fetchResponseByURL(`players/id/${id}/stats`)
);
const playerSearch = new CachedByKeyResource(async (search) => {
  return (await fetchResponseByURL(`search/playersAndMaps/${search}`)).players;
});
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
const playerRecordByMapName = new CachedByKeyResource((info) => {
  const c = info.class === "soldier" ? 3 : 4;
  return fetchResponseByURL(
    `maps/name/${info.mapName}/zones/typeindex/${info.zoneType || "map"}/${
      info.zoneId || 1
    }/records/player/${info.playerId}/${c}`
  );
});
const playerRecordByMapId = new CachedByKeyResource((info) => {
  const c = info.class === "soldier" ? 3 : 4;
  return fetchResponseByURL(
    `maps/id/${info.mapId}/zones/typeindex/${info.zoneType || "map"}/${
      info.zoneId || 1
    }/records/player/${info.playerId}/${c}`
  );
});
const recordsById = new CachedByKeyResource(
  (id) => fetchResponseByURL(`records/id/${id}/overview`),
  { timeout: 120 }
);
const demosById = new CachedByKeyResource(
  (id) => fetchResponseByURL(`demos/id/${id}/overview`),
  { timeout: 120 }
);
const serverDemosById = new CachedByKeyResource(
  (id) => fetchResponseByURL(`servers/${id}/demos`),
  { timeout: 120 }
);
const rankingsByType = new CachedByKeyResource((info) => {
  if (info.type === "soldier") {
    return fetchResponseByURL(`ranks/class/3?start=${info.start || 1}`);
  }
  if (info.type === "demoman") {
    return fetchResponseByURL(`ranks/class/4?start=${info.start || 1}`);
  }
  return fetchResponseByURL(`ranks/overall?start=${info.start || 1}`);
});
const serversById = {
  load: async (id) => {
    const servers = await allServers.load();
    return servers.find((s) => s.id === id);
  },
};

export {
  mapsById,
  mapsByName,
  playersById,
  playerSearch,
  recordListByMapName,
  recordListByMapId,
  playerRecordByMapName,
  playerRecordByMapId,
  recordsById,
  demosById,
  serverDemosById,
  serversById,
  allServers,
  allMaps,
  activity,
  rankingsByType,
};
