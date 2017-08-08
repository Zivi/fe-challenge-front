import React from 'react';
import '../styles/filter.css';

function Filter({ onChange, laborTypes }) {
  return (
    <fieldset className="labor-filter" >
      <legend>Filter Search Results by Labor Type</legend>
      {laborTypes.map(laborType =>
        <div>
          <label>
            <input type="checkbox" name="labor-type" value={laborType} onChange={onChange.bind(this)}/>
            {laborType}
          </label>
        </div>
      )}
    </fieldset>
  )
}
export default Filter;
