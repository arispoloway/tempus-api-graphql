import fetch from "node-fetch";

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

export default fetchResponseByURL;
