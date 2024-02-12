import React, { FC } from 'react'
import './PopupCategory.scss'

interface PopupType {
  isOpened: boolean
}

const PopupCategory:FC<PopupType> = ({isOpened}) => {

  return (
    <div className={`category-popup ${isOpened && 'popup-opened'}`}>
      <div className="category-popup__container">
        <ul className='category-popup__list'>
          <li className="category-popup__item"><a className='category-popup__link' href="">Молоко, сыр, яйцо</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Хлеб</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Фрукты и овощи</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Замороженные продукты</a></li>
        </ul>
        <ul className='category-popup__list'>
          <li className="category-popup__item"><a className='category-popup__link' href="">Напитки</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Кондитерские изделия</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Чай, кофе</a></li>
        </ul>
        <ul className='category-popup__list'>
          <li className="category-popup__item"><a className='category-popup__link' href="">Бакалея</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Здоровое питание</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Зоотовары</a></li>
        </ul>
        <ul className='category-popup__list'>
          <li className="category-popup__item"><a className='category-popup__link' href="">Непродовольственные товары</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Детское питание</a></li>
          <li className="category-popup__item"><a className='category-popup__link' href="">Мясо, птица, колбаса</a></li>
        </ul>
      </div>
    </div>
  )
}

export default PopupCategory