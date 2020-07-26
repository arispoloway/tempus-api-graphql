import { graphql } from 'graphql';
import schema from './lib/schema.js';

(async () => {
    let r = await graphql(schema, ' { record(id: 3878771){ duration demo { filename map { name authors { name } } }}}');
    console.log(JSON.stringify(r, null, "  "));
})();
