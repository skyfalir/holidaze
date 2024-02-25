import React, { useState } from 'react';
import './venuefilter.css';

const VenueFilter = ({ onFilterChange }) => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State for the search input

  const handleSetSortField = (field) => {
    setSortField(field);
  };

  const handleSetSortOrder = (order) => {
    setSortOrder(order);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value); // Update the searchQuery state with the input value
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const filters = { sortField, sortOrder, searchQuery };
    onFilterChange(filters);
  };

  return (
    <form className="filter-venues" onSubmit={handleFilterSubmit}>
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search..."
        />
      </div>
      <p>Or sort by..</p>
      <div className="sort-container">
        <div className="sort-buttons">
          <button onClick={() => handleSetSortField('updated')}>Sort by Added</button>
          <button onClick={() => handleSetSortField('rating')}>Sort by Rating</button>
          <button onClick={() => handleSetSortField('name')}>Sort by Name</button>
        </div>
        <div className="sort-order">
          <button onClick={() => handleSetSortOrder('asc')}>Ascending</button>
          <button onClick={() => handleSetSortOrder('desc')}>Descending</button>
        </div>
      </div>
    </form>
  );
};

export default VenueFilter;