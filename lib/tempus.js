import CachedByKeyResource from "./utils/cached_by_key_resource";
import CachedResource from "./utils/cached_resource";

function newCachedTempusFetcher(fetchResponseByURL) {
  const fetcher = {};
  fetcher.allMaps = new CachedResource(
    () => fetchResponseByURL("maps/detailedList"),
    { timeout: 600 }
  );
  fetcher.allMapsById = new CachedResource(async () => {
    const r = await fetcher.allMaps.load();
    return Object.fromEntries(r.map((m) => [m.id, m.name]));
  });

  fetcher.activity = new CachedResource(() => fetchResponseByURL("activity"));
  fetcher.allServers = new CachedResource(async () => {
    const r = await fetchResponseByURL("servers/statusList");
    return r.map((server) => ({ ...server.server_info, ...server.game_info }));
  });
  fetcher.mapsByName = new CachedByKeyResource(async (name) => {
    const r = await fetchResponseByURL(`maps/name/${name}/fullOverview2`);
    /* eslint-disable no-use-before-define */
    fetcher.mapsById.set(r.map_info.id, r);
    /* eslint-enable no-use-before-define */
    return r;
  });
  fetcher.mapsById = new CachedByKeyResource(async (id) => {
    return fetcher.mapsByName.load((await fetcher.allMapsById.load())[id]);
    // TODO: Bring these back once API supports maps/id properly
    // const r = await fetchResponseByURL(`maps/id/${id}/fullOverview2`);
    // fetcher.mapsByName.set(r.map_info.name, r);
    // return r;
  });
  fetcher.playersById = new CachedByKeyResource((id) =>
    fetchResponseByURL(`players/id/${id}/stats`)
  );
  fetcher.playerSearch = new CachedByKeyResource(async (search) => {
    return (await fetchResponseByURL(`search/playersAndMaps/${search}`))
      .players;
  });
  fetcher.recordListByMapName = new CachedByKeyResource((info) =>
    fetchResponseByURL(
      `maps/name/${info.mapName}/zones/typeindex/${info.zoneType || "map"}/${
        info.zoneId || 1
      }/records/list?start=${info.start || 1}&limit=${info.limit || 25}`
    )
  );
  fetcher.recordListByMapId = new CachedByKeyResource(async (info) => {
    const newInfo = { ...info };
    newInfo.mapName = (await fetcher.allMapsById.load())[info.mapId];
    return fetcher.recordListByMapName.load(newInfo);

    // TODO: Bring these back once API supports maps/id properly
    // fetchResponseByURL(
    //  `maps/id/${info.mapId}/zones/typeindex/${info.zoneType || "map"}/${
    //    info.zoneId || 1
    //  }/records/list?start=${info.start || 1}&limit=${info.limit || 25}`
    // )
  });
  fetcher.playerRecordByMapName = new CachedByKeyResource((info) => {
    const c = info.class === "soldier" ? 3 : 4;
    return fetchResponseByURL(
      `maps/name/${info.mapName}/zones/typeindex/${info.zoneType || "map"}/${
        info.zoneId || 1
      }/records/player/${info.playerId}/${c}`
    );
  });
  fetcher.playerRecordByMapId = new CachedByKeyResource(async (info) => {
    const newInfo = { ...info };
    newInfo.mapName = (await fetcher.allMapsById.load())[info.mapId];
    return fetcher.playerRecordByMapName.load(newInfo);

    // TODO: Bring these back once API supports maps/id properly
    // const c = info.class === "soldier" ? 3 : 4;
    // return fetchResponseByURL(
    //  `maps/id/${info.mapId}/zones/typeindex/${info.zoneType || "map"}/${
    //    info.zoneId || 1
    //  }/records/player/${info.playerId}/${c}`
    // );
  });
  fetcher.recordsById = new CachedByKeyResource(
    (id) => fetchResponseByURL(`records/id/${id}/overview`),
    { timeout: 120 }
  );
  fetcher.demosById = new CachedByKeyResource(
    (id) => fetchResponseByURL(`demos/id/${id}/overview`),
    { timeout: 120 }
  );
  fetcher.serverDemosById = new CachedByKeyResource(
    (id) => fetchResponseByURL(`servers/${id}/demos`),
    { timeout: 120 }
  );
  fetcher.rankingsByType = new CachedByKeyResource((info) => {
    if (info.type === "soldier") {
      return fetchResponseByURL(`ranks/class/3?start=${info.start || 1}`);
    }
    if (info.type === "demoman") {
      return fetchResponseByURL(`ranks/class/4?start=${info.start || 1}`);
    }
    return fetchResponseByURL(`ranks/overall?start=${info.start || 1}`);
  });
  fetcher.serversById = {
    load: async (id) => {
      const servers = await fetcher.allServers.load();
      return servers.find((s) => s.id === id);
    },
  };
  fetcher.wrsByMapName = new CachedByKeyResource(
    (name) => fetchResponseByURL(`maps/name/${name}/wrs`),
    { timeout: 120 }
  );
  fetcher.wrsByMapId = new CachedByKeyResource(
    (id) => fetchResponseByURL(`maps/id/${id}/wrs`),
    { timeout: 120 }
  );

  fetcher.clearCache = function clearCache() {
    fetcher.allMaps.clearCache();
    fetcher.allMapsById.clearCache();
    fetcher.activity.clearCache();
    fetcher.allServers.clearCache();
    fetcher.mapsByName.clearCache();
    fetcher.mapsById.clearCache();
    fetcher.playersById.clearCache();
    fetcher.playerSearch.clearCache();
    fetcher.recordListByMapName.clearCache();
    fetcher.recordListByMapId.clearCache();
    fetcher.playerRecordByMapName.clearCache();
    fetcher.playerRecordByMapId.clearCache();
    fetcher.recordsById.clearCache();
    fetcher.demosById.clearCache();
    fetcher.serverDemosById.clearCache();
    fetcher.rankingsByType.clearCache();
    fetcher.wrsByMapName.clearCache();
    fetcher.wrsByMapId.clearCache();
  };
  return fetcher;
}

export { newCachedTempusFetcher };
