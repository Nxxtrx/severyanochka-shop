import React from 'react';
import linkLogo from '../../images/chevron-right.svg';
import './MainCards.scss';
import MainCard from '../MainCard/MainCard';
import { IFood } from '../../models/IFood';

interface CardListType {
  title?: string;
  linkTitle?: string;
  data: IFood[];
}

const MainCards: React.FC<CardListType> = ({ title, linkTitle, data }) => {
  return (
    <div className="main-cards">
      <div className="main-cards__title-container">
        <h2 className="main-cards__title">{title}</h2>
        {linkTitle != null && (
          <a className="main-cards__link" href="">
            {linkTitle} <img src={linkLogo} alt="" />
          </a>
        )}
      </div>
      <ul className="main-cards__container">
        {data.map(item => (
          <MainCard
            key={item.id}
            cardImage={item.url}
            title={item.type}
            price={item.price}
            name={item.name}
            rating={item.rating}
            item={item}
            isLike={item.isLike}
          />
        ))}
      </ul>
    </div>
  );
};

export default MainCards;
