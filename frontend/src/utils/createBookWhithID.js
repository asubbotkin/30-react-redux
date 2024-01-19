import { v4 as uuidv4 } from 'uuid';

const createBookWhithID = (book) => {
  return {
    ...book,
    isFavorite: false,
    id: uuidv4(),
  };
};
export default createBookWhithID;
