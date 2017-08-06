import React from 'react';
import '../styles/search.css';

  function Search(props) {
    return (
      <input
        className="search-box"
        type="search"
        placeholder="Search companies by name"
        onChange={props.onChange}
        value={props.value}
      />
    );
}

export default Search;
