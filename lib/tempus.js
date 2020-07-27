import fetch from 'node-fetch';
import DataLoader from 'dataloader';

const BASE_URL = 'https://tempus.xyz/api/';

function fetchResponseByURL(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`).then(res => {
        console.log(`Fetching "${relativeURL}"`);
        let j = res.json();
        return j.error ? null : j;
    });
}

const mapsByName = new DataLoader(
    mapNames => Promise.all(mapNames.map(name => fetchResponseByURL(`maps/name/${name}/fullOverview`)))
);

class CachedResource {
    constructor(resource, timeout) {
        this.resource = resource;
        this.timeout = timeout;
        this.cached = null;
        this.lastFetch = 0;
    }

    async load() {
        const curTime = (new Date()).getTime();
        if(this.lastFetch < (curTime/1000 - this.timeout)) {
            this.lastFetch = curTime/1000;
            let r = await fetchResponseByURL(this.resource);
            this.cached = r;
            return r;
        }
        return this.cached;
    }
}
const allMaps = new CachedResource(`maps/detailedList`, 600);
const activity = new CachedResource(`activity`, 60);

const playersById = new DataLoader(
    playerIds => Promise.all(playerIds.map(id => fetchResponseByURL(`players/id/${id}/stats`)))
);

const recordListByMapName = new DataLoader(
    infos => Promise.all(
        infos.map(info =>
                  fetchResponseByURL(
                      `maps/name/${info.mapName}/zones/typeindex/${info.zoneType || 'map'}/${info.zoneId || 1}/records/list?start=${info.start || 1}&limit=${info.limit || 25}`
                  ))));

const recordListByMapId = new DataLoader(
    infos => Promise.all(
        infos.map(info =>
                  fetchResponseByURL(
                      `maps/id/${info.mapId}/zones/typeindex/${info.zoneType || 'map'}/${info.zoneId || 1}/records/list?start=${info.start || 1}&limit=${info.limit || 25}`
                  ))));

const recordsById = new DataLoader(
    recordIds => Promise.all(recordIds.map(id => fetchResponseByURL(`records/id/${id}/overview`)))
);

const demosById = new DataLoader(
    demoIds => Promise.all(demoIds.map(id => fetchResponseByURL(`demos/id/${id}/overview`)))
);

const serversById = new DataLoader(
    async function(serverIds) {
        let servers = await fetchResponseByURL(`servers/statusList`);
        let byServerId = {};
        servers.forEach(server => byServerId[server.server_info.id] = server);
        return serverIds.map(id => ({ ...byServerId[id].server_info, ...byServerId[id].game_info}));
    }
);

export {
    mapsByName,
    playersById,
    recordListByMapName,
    recordListByMapId,
    recordsById,
    demosById,
    serversById,
    allMaps,
    activity
};
