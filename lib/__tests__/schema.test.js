import "regenerator-runtime/runtime";
import { graphql } from "graphql";
import axios from "axios";
import schema from "../schema";

jest.mock("axios");

async function request(query) {
  return graphql(schema, query);
}

let requestStubs = {};
const BASE_URL = "https://tempus.xyz/api/";

beforeAll(() => {
  axios.get.mockImplementation((url) => {
    const returnValue = requestStubs[url];
    if (!returnValue) throw new Error(`Unstubbed URL: '${url}'`);

    return Promise.resolve(returnValue);
  });
});

beforeEach(() => {
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
      player_info: [{ country: "Australia" }],
    });
    stubRequest("maps/name/jump_rush/fullOverview", {
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
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}players/2/stats`);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_URL}maps/name/jump_rush/stats`
    );
  });
});
