import express from 'express';
import graphqlHTTP from 'express-graphql';
import logger from 'morgan';

require('dotenv').config(); // eslint-disable-line

const app = express();
const { PORT } = process.env;

// ues middleware
app.use(logger('dev'));

app.use('/graphql', graphqlHTTP({
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`)); // eslint-disable-line no-console
