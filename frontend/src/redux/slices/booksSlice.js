import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import createBookWhithID from '../../utils/createBookWhithID';
import { setError } from './errorSlice';

// const initialState = [];
const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      // Option 1!
      thunkAPI.dispatch(setError(error.message));
      return thunkAPI.rejectWithValue(error);
      // Option 2
      // throw error;
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {
    addBook: (state, action) => {
      // return [...state, action.payload];
      // state.push(action.payload);
      state.books.push(action.payload);
    },
    toggleFavorite: (state, action) => {
      // state.forEach((book) => {
      state.books.forEach((book) => {
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
      // return state.filter((book) => book.id !== action.payload);
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
  },
  // OPTION 1
  extraReducers: {
    [fetchBook.pending]: (state) => {
      state.isLoadingViaAPI = true;
    },
    [fetchBook.fulfilled]: (state, action) => {
      state.isLoadingViaAPI = false;
      if (action.payload.title && action.payload.author) {
        state.books.push(createBookWhithID(action.payload, 'API'));
      }
    },
    [fetchBook.rejected]: (state) => {
      state.isLoadingViaAPI = false;
    },
  },
});

// OPTION 2
//   extraReducers: (builder) => {
//     builder.addCase(fetchBook.pending, (state) => {
//       state.isLoadingViaAPI = true;
//     });
//     builder.addCase(fetchBook.fulfilled, (state, action) => {
//       state.isLoadingViaAPI = false;
//       if (action.payload.title && action.payload.author) {
//         // state.push(createBookWhithID(action.payload, 'API'));
//         state.books.push(createBookWhithID(action.payload, 'API'));
//       }
//     });
//     builder.addCase(fetchBook.rejected, (state) => {
//       state.isLoadingViaAPI = false;
//     });
//   },
// });

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

// export const selectBooksChanges = (state) => state.books;
export const selectBooksChanges = (state) => state.books.books;
export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default booksSlice.reducer;
