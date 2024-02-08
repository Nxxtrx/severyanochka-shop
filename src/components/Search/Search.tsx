import React from 'react'
import searchLogo from '../../images/header-search.svg'

const Search = () => {
  return (
    <div className="search">
      <input className="search__input" type="text" placeholder="Найти товар" />
      <img className="search__img" src={searchLogo} alt="" />
    </div>
  );
}

export default Search