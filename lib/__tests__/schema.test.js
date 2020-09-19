import "regenerator-runtime/runtime";
import { graphql } from "graphql";
import axios from "axios";
import { schema } from "../schema";
import { activity, mapsByName, wrsByMapName } from "../tempus";

jest.mock("axios");

async function request(query) {
  return graphql(schema, query);
}

let requestStubs = {};
const BASE_URL = "https://tempus.xyz/api/";

beforeEach(() => {
  jest.clearAllMocks();
  axios.get.mockImplementation((url) => {
    const returnValue = requestStubs[url];
    if (!returnValue) throw new Error(`Unstubbed URL: '${url}'`);

    return Promise.resolve(returnValue);
  });
  activity.clearCache();
  mapsByName.clearCache();
  wrsByMapName.clearCache();
  requestStubs = {};
});

function stubRequest(url, result, error) {
  if (error) {
    requestStubs[`${BASE_URL}${url}`] = { error: result };
  } else {
    requestStubs[`${BASE_URL}${url}`] = { data: result };
  }
}

describe("server list", () => {
  test("it requests the correct endpoint and works with 0 servers", async () => {
    stubRequest("servers/statusList", []);

    const r = await request("{ servers { name }} ");

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}servers/statusList`);
    expect(r).toEqual({ data: { servers: [] } });
  });
});

describe("activity", () => {
  test("requests the correct endpoint and saves the base fields", async () => {
    stubRequest("activity", {
      map_wrs: [
        {
          map_info: { name: "jump_rush" },
          player_info: { name: "Player" },
          record_info: { duration: 45.67 },
        },
      ],
    });

    const r = await request(
      "{ activity { mapWrs { duration player { name } map { name } } }} "
    );

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}activity`);
    expect(r).toEqual({
      data: {
        activity: {
          mapWrs: [
            {
              player: { name: "Player" },
              map: { name: "jump_rush" },
              duration: 45.67,
            },
          ],
        },
      },
    });
  });

  test("requests related fields", async () => {
    stubRequest("activity", {
      map_wrs: [
        {
          map_info: { name: "jump_rush" },
          player_info: { name: "Player", id: 2 },
          record_info: { duration: 45.67 },
        },
      ],
    });
    stubRequest("players/id/2/stats", {
      player_info: { country: "Australia" },
    });
    stubRequest("maps/name/jump_rush/fullOverview2", {
      map_info: { id: 8, name: "jump_rush" },
      authors: [{ name: "QuBa" }],
    });

    const r = await request(
      "{ activity { mapWrs { duration player { name country } map { name authors { name }} } }} "
    );

    expect(r).toEqual({
      data: {
        activity: {
          mapWrs: [
            {
              player: { name: "Player", country: "Australia" },
              map: { name: "jump_rush", authors: [{ name: "QuBa" }] },
              duration: 45.67,
            },
          ],
        },
      },
    });

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}activity`);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}players/id/2/stats`);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}maps/name/jump_rush/fullOverview2`
    );
  });
});

describe("map", () => {
  test("requests the correct endpoint and saves the base fields", async () => {
    stubRequest("maps/name/jump_rush/fullOverview2", {
      map_info: {
        name: "jump_rush",
        id: 111,
        date_added: 100,
      },
      tier_info: {
        soldier: 1,
        demoman: 1,
      },
      videos: {
        soldier: "url",
        demoman: null,
      },
      authors: [
        {
          name: "Bob",
          id: 2,
          map_count: 7,
          player_info: {
            id: 201,
            name: "bob",
            steamid: "steeeeamid",
          },
        },
      ],
    });

    const r = await request(
      '{ map(name: "jump_rush") { id name tiers { soldier demoman } videos { soldier demoman } authors { name id mapCount player { name id steamId }}}}'
    );

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}maps/name/jump_rush/fullOverview2`
    );
    expect(r).toEqual({
      data: {
        map: {
          id: "111",
          name: "jump_rush",
          tiers: {
            soldier: 1,
            demoman: 1,
          },
          videos: {
            soldier: "https://youtube.com/watch?v=url",
            demoman: null,
          },
          authors: [
            {
              name: "Bob",
              id: 2,
              mapCount: 7,
              player: {
                name: "bob",
                id: 201,
                steamId: "steeeeamid",
              },
            },
          ],
        },
      },
    });
  });

  test.skip("requests map runs", async () => {});
  test.skip("requests records", async () => {});

  test("request map wrs", async () => {
    stubRequest("maps/name/jump_rush/wrs", {
      soldier: {
        wr: {
          zone_id: 1,
          splits: [
            {
              type: "checkpoint",
              zoneindex: 1,
              duration: 1.0,
              compared_duration: 2.0,
            },
          ],
        },
      },
    });
    stubRequest("maps/name/jump_rush/fullOverview2", {
      map_info: {
        name: "jump_rush",
        id: 111,
      },
    });

    const r = await request(
      '{ map(name: "jump_rush") { wr(class: SOLDIER) { zone { id type map { name id } } splits { type zoneindex duration comparedDuration } } }}'
    );

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}maps/name/jump_rush/wrs`
    );
    console.log(JSON.stringify(r, null, 2));
    expect(r).toEqual({
      data: {
        map: {
          wr: {
            zone: {
              id: 1,
              type: "map",
              map: {
                name: "jump_rush",
                id: "111",
              },
            },
            splits: [
              {
                type: "checkpoint",
                zoneindex: 1,
                duration: 1.0,
                comparedDuration: 2.0,
              },
            ],
          },
        },
      },
    });
  });
});
