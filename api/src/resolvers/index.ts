import queries from './queries';
import mutations from './mutations';
import Gallery from './nested/Gallery';

export default {
  Query: { ...queries },
  Mutation: { ...mutations },
  Gallery,
};
