import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWhithID from '../../utils/createBookWhithID';

const initialState = [];

export const fetchBook = createAsyncThunk('books/fetchBook', async () => {
  const res = await axios.get('http://localhost:5000/random-book');
  console.log(res.data);
  return res.data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      // return [...state, action.payload];
      state.push(action.payload);
    },
    toggleFavorite: (state, action) => {
      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
      // return state.map((book) =>
      //   book.id === action.payload
      //     ? { ...book, isFavorite: !book.isFavorite }
      //     : book
      // );
    },
    deleteBook: (state, action) => {
      // const index = state.findIndex((book) => book.id === action.payload);
      // if (index !== -1) state.splice(index, 1);
      return state.filter((book) => book.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        state.push(createBookWhithID(action.payload, 'API'));
      }
    });
    builder.addCase(fetchBook.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { addBook, toggleFavorite, deleteBook } = booksSlice.actions;

// export const thunkFunction = async (dispatch, getState) => {
//   console.log(getState());
//   try {
//     const res = await axios.get('http://localhost:4000/random-book');
//     // if (res.data && res.data.title && res.data.author) {
//     if (res?.data?.title && res?.data?.author) {
//       dispatch(addBook(createBookWhithID(res.data, 'API')));
//     }
//   } catch (error) {
//     console.log('Error fetching random book', error);
//   }
// };

export const selectBooksChanges = (state) => state.books;

export default booksSlice.reducer;
