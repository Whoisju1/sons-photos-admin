import express from 'express';
import graphqlHTTP from 'express-graphql';

require('dotenv').config(); // eslint-disable-line

const app = express();
const { PORT } = process.env;

app.use('/graphql', graphqlHTTP({
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); // eslint-disable-line no-console
