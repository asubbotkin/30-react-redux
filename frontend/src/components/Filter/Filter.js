import { useDispatch, useSelector } from 'react-redux';
import {
  setTitleFilter,
  setAuthorFilter,
  setOnlyFavorite,
  resetFilters,
  selectTileFilter,
  selectAuthorFilter,
  selectOnlyFavorite,
} from '../../redux/slices/filterSlice';
import './Filter.css';

function Filter() {
  const titleFilter = useSelector(selectTileFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavorite);
  const dispatch = useDispatch();

  const handleTitleFilterChange = (e) =>
    dispatch(setTitleFilter(e.target.value));

  const handleAuthorFilterChange = (e) =>
    dispatch(setAuthorFilter(e.target.value));

  const handleOnlyFavoriteFilter = () => {
    dispatch(setOnlyFavorite());
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            type="text"
            value={titleFilter}
            placeholder="Filter by title..."
            onChange={handleTitleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            value={authorFilter}
            placeholder="Filter by author"
            onChange={handleAuthorFilterChange}
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteFilter}
            />
            Only favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Resest filters
        </button>
      </div>
    </div>
  );
}

export default Filter;
