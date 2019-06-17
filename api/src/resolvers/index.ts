import queries from './queries';
import mutations from './mutations';
import * as nested from './nested';

export default {
  Query: { ...queries },
  Mutation: { ...mutations },
  ...nested,
};
