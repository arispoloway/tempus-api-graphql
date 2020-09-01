const fs = require("fs");
const { printSchema } = require("graphql");
const { schema } = require("../dist/schema");

const FILE_NAME = "schema.graphql";

fs.writeFile(FILE_NAME, printSchema(schema), () => {
  /* eslint-disable no-console */
  console.log(`SDL saved to ${FILE_NAME}`);
  /* eslint-enable no-console */
});
