import React, { FC } from 'react'
import BasicRating from '../Rating/Rating'
import './MainCard.scss'

export interface ProductType{
  cardImage: string,
  title: string,
  price: number,
  name: string,
  rating: number
}

const MainCard: FC<ProductType> = ({cardImage, title, price, name, rating}) => {

  return (
    <li className='main-cards__card'>
      <button className='main-cards__like'></button>
      <img className='main-cards__image' src={cardImage} alt="" />
      {title === "Акции" && <div className='main-cards__sale'><span>-50%</span></div>}
      <div className='main-cards__price-container'>
        <p className='main-cards__price'>{price} ₽ {title === "Акции" &&<span className='main-cards__price-description'>С картой</span>}</p>
        {title === "Акции" && <p className='main-cards__price main-cards__price_type_usually'>{price * 0.5} ₽ <span className='main-cards__price-description'>Обычная</span></p>}
      </div>
      <p className='main-cards__name'>{name}</p>
      <div className='main-cards__rating'>
        <BasicRating defaultValue={rating}/>
      </div>
      <button className='main-cards__btn'>В корзину</button>
    </li> 
  )
}

export default MainCard