import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearErrror: () => {
      return initialState;
    },
  },
});

export const { setError, clearErrror } = errorSlice.actions;

export const selectErrorMessage = (state) => state.error;

export default errorSlice.reducer;
