import fetch from 'node-fetch';
import DataLoader from 'dataloader';

const BASE_URL = 'https://tempus.xyz/api/';

function fetchResponseByURL(relativeURL) {
    return fetch(`${BASE_URL}${relativeURL}`).then(res => { 
        let j = res.json();
        return j.error ? null : j
    });
}

const mapsByName = new DataLoader(
    mapNames => Promise.all(mapNames.map(name => fetchResponseByURL(`maps/name/${name}/fullOverview`)))
);

const playersById = new DataLoader(
    playerIds => Promise.all(playerIds.map(id => fetchResponseByURL(`players/id/${id}/stats`)))
);

export {
    mapsByName,
    playersById
};
