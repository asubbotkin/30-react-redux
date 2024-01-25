import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import axios from 'axios';
import { addBook, fetchBook } from '../../redux/slices/booksSlice';
import { setError } from '../../redux/slices/errorSlice';
import createBookWhithID from '../../utils/createBookWhithID';
import booksData from '../../data/books.json';
import './BookForm.css';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

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

  const handleAddRandomBookViaAPI = async () => {
    dispatch(fetchBook());
    // try {
    //   const res = await axios.get('http://localhost:4000/random-book');
    //   // if (res.data && res.data.title && res.data.author) {
    //   if (res?.data?.title && res?.data?.author) {
    //     dispatch(addBook(createBookWhithID(res.data, 'API')));
    //   }
    // } catch (error) {
    //   console.log('Error fetching random book', error);
    // }
  };

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
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add random via API
        </button>
      </form>
    </div>
  );
}

export default BookForm;
