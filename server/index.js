const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();
const { PORT } = process.env;

app.use('/graphql', graphqlHTTP({
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
