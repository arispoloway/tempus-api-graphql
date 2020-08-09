import "regenerator-runtime/runtime";
import { graphql } from "graphql";
import schema from "../schema";

async function request(query) {
  return graphql(schema, query);
}

const requestMock = jest.mock("../utils/fetch_response_by_url", () => {
  return {
    default: jest.fn(),
  };
});

function mockRequest(responses) {
  requestMock.default = jest.fn();
  requestMock.default.mockImplementation(async (url) => {
    return new Promise((resolve) => resolve(responses[url]));
  });
}

describe("Filter function", () => {
  test("it should filter by a search term (link)", async () => {
    mockRequest({ "servers/statusList": { data: [] } });

    const r = await request("{ servers { name }} ");

    expect(r).toEqual(1);
  });
});
