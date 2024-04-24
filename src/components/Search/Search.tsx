import React, { useState } from 'react';
import type { FC } from 'react';
import searchLogo from '../../images/header-search.svg';
import './Search.scss';
import { useDispatch } from 'react-redux';
import { handleSearch } from '../../store/redusers/FoodSlice';
import { useNavigate } from 'react-router-dom';

const Search: FC = () => {
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  const handleSubmit = (): void => {
    dispatch(handleSearch(value));
    navigate('/search');
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Найти товар"
      />
      <button className="search__button" onClick={handleSubmit}>
        <img className="search__img" src={searchLogo} alt="" />
      </button>
    </div>
  );
};

export default Search;
