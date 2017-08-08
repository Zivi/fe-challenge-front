import React from 'react';
import '../styles/result.css';

function Result({ company, onClick }) {
  return (
    <li onClick={onClick.bind(null, company)}>
      {company.name}
      <div className={`company-info ${company.hide ? 'hide' : ''}`} >
        <div className="image-container">
          <img src={company.avatarUrl} className="company-image" />
        </div>
        <div className="info-container">
          Labor Type(s):
          <ul className="labor-types">
            {company.laborType.map(type =>
              <li className="labor-type" key={type}>
                {type}
              </li>
            )}
          </ul>
          <a href={company.website}>
            {company.website}
          </a>
          <a href={company.telephone} className="company-tel">{company.telephone}</a>
        </div>
      </div>
    </li>
  )
}
export default Result;
