const Fixtures = require('node-mongodb-fixtures');

// The MongoDB Connection URL
const uri = 'mongodb://localhost:27017/xdash-db';

// The MongoDB options object
const mongoOpts = {};
// const mongoOpts = {
//   ssl: true,
//   sslValidate: true,
//   sslCA: myCert,
// };

const fixtures = new Fixtures({
    dir: 'fakedata',
    filter: '.*' // optional
});
fixtures
    .connect(uri, mongoOpts)
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .catch(console.error)
    .finally(() => fixtures.disconnect());