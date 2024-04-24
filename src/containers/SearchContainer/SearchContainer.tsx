import React from 'react';
import MainCards from '../../components/MainCards/MainCards';
import { useAppSelector } from '../../hooks/redux';
import './SearchContainer.scss';

const SearchContainer: React.FC = () => {
  const searchProductArray = useAppSelector(state => state.foodReducer.search);

  return (
    <section className="search-container">
      <h2 className="search-container__title">Результат поиска</h2>
      <p className="search-container__query">
        по запросу <span>еда</span>
      </p>
      <MainCards data={searchProductArray} />
    </section>
  );
};

export default SearchContainer;
