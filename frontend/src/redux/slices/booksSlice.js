import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const booksSlice = createSlice({
  name: 'books',
  initialState: initialState,
  reducers: {},
});

export default booksSlice.reducer;
