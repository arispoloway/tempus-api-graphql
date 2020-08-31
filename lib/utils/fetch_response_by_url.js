import axios from "axios";

const BASE_URL = "https://tempus.xyz/api/";

function fetchResponseByURL(relativeURL) {
  /* eslint-disable no-console */
  console.log(`Fetching ${BASE_URL}${relativeURL}`);
  /* eslint-enable no-console */
  return axios.get(`${BASE_URL}${relativeURL}`).then((res) => {
    const j = res.data;
    return j.error ? null : j;
  });
}

export default fetchResponseByURL;
