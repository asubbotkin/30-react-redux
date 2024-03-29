import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

// import axios from 'axios';
import {
  addBook,
  fetchBook,
  selectIsLoadingViaAPI,
} from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import createBookWhithID from '../../utils/createBookWhithID';
import booksData from '../../data/books.json';
import './BookForm.css';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingViaAPI);

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    dispatch(addBook(createBookWhithID(randomBook, 'random')));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      const book = createBookWhithID({ title, author }, 'manual');
      dispatch(addBook(book));
      setTitle('');
      setAuthor('');
    } else {
      dispatch(setError('You must fill title and author!'));
    }
  };

  // const thunkFunction = async (dispatch, getState) => {
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

  // Option 3
  const handleAddRandomBookViaAPI = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
  };

  // Option2
  // const handleAddRandomBookViaAPI = async () => {
  //   try {
  //     setIsLoading(true);
  //     await dispatch(fetchBook('http://localhost:4000/random-book-delayed'));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  // const handleAddRandomBookViaAPI = async () => {
  // Option 1
  // try {
  //   const res = await axios.get('http://localhost:4000/random-book');
  //   // if (res.data && res.data.title && res.data.author) {
  //   if (res?.data?.title && res?.data?.author) {
  //     dispatch(addBook(createBookWhithID(res.data, 'API')));
  //   }
  // } catch (error) {
  //   console.log('Error fetching random book', error);
  // }
  // };

  return (
    <div className="app-block book-form">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add random
        </button>
        <button
          type="button"
          onClick={handleAddRandomBookViaAPI}
          disabled={isLoading}>
          {isLoading ? (
            <>
              <span>Loading Book...</span>
              <FaSpinner className="spinner" />
            </>
          ) : (
            'Add random via API'
          )}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
