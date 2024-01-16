import { v4 as uuidv4 } from 'uuid';

const createBookWhithID = (book) => {
  return {
    ...book,
    isFavrite: false,
    id: uuidv4(),
  };
};
export default createBookWhithID;
