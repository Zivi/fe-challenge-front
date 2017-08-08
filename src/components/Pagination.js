import React from 'react';
import '../styles/pagination.css';

function Pagination({total, startPosition, onClick}) {
  if (total===0  || total === null) {
    return null;
  }

  const locationStart = Math.floor(startPosition / 10) + 1;
  const locationEnd = Math.ceil(total / 10);

  return (
    <div className="results-pageable">
      <button
        className={`results-nav results-previous ${startPosition - 10 < 0 ? 'results-nav-disabled': ''}`}
        onClick={onClick.bind(null, startPosition - 10)}
      >
        Previous
      </button>
      <span className="results-position">
        {`Page ${locationStart} of ${locationEnd}`}
      </span>
      <button
        className={`results-nav results-next ${startPosition + 10 > total ? 'results-nav-disabled': ''}`}
        onClick={onClick.bind(null, startPosition + 10)}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination;
