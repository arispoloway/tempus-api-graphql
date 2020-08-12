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
  axios.get.mockImplementation((url) => Promise.resolve(requestStubs[url]));
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
