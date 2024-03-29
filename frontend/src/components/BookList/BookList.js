import { useSelector, useDispatch } from 'react-redux';
import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs';
import {
  deleteBook,
  toggleFavorite,
  selectBooksChanges,
} from '../../redux/slices/booksSlice';
import {
  selectTileFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
} from '../../redux/slices/filterSlice';
import './BookList.css';

function BookList() {
  const books = useSelector(selectBooksChanges);
  // const books = useSelector((state) => state.books);
  const titleFilter = useSelector(selectTileFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite);
  const dispatch = useDispatch();

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const filteredBooks = books.filter((book) => {
    // const matchesByFilters =
    //   book.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
    //   book.author.toLowerCase().includes(authorFilter.toLowerCase());
    // return matchesByFilters;
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  const highlightMatches = (text, filter) => {
    if (!filter) return text;

    const regex = RegExp(`(${filter})`, 'gi');
    return text.split(regex).map((substring, i) => {
      if (substring.toLowerCase() === filter.toLowerCase())
        return (
          <span key={i} className="highlight">
            {substring}
          </span>
        );
      return substring;
    });
  };

  return (
    <div className="app-block book-list">
      <h2>Book List</h2>
      {books.length === 0 ? (
        <p>No books avalible</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {highlightMatches(book.title, titleFilter)} by{' '}
                <strong>{highlightMatches(book.author, authorFilter)}</strong>(
                {book.source})
              </div>
              <div className="book-actions">
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>

                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
