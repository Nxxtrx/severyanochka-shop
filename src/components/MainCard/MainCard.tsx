import React, { FC, useEffect, useState } from 'react'
import BasicRating from '../Rating/Rating'
import './MainCard.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addToCart, removeToCart } from '../../store/redusers/FoodSlice'
import { IFood } from '../../models/IFood'
import minusBtnImage from '../../images/cart-minus.svg'
import plusBtnImage from '../../images/cart-plus.svg'

export interface ProductType{
  cardImage: string,
  title: string,
  price: number,
  name: string,
  rating: number,
  item: IFood
}

const MainCard: FC<ProductType> = ({cardImage, title, price, name, rating, item}) => {

  const [countCart, setCountCart] = useState(0)

  const dispatch = useAppDispatch()
  const cartArray = useAppSelector(state => state.foodReducer.cart)

  const handleAddToCart = (foodItem: IFood) => {
    dispatch(addToCart(foodItem))
  }

  const handleRemoveToCart = (foodItem: IFood) => {
    dispatch(removeToCart(foodItem))
  }

  const findItemToId = (id: string) => {
    const item = cartArray.find((item) => item.id === id);
    return item ? item.count : 0;
  }

  useEffect(() => {
    setCountCart(findItemToId(item.id))
  }, [handleAddToCart, handleRemoveToCart])


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
      {countCart === 0 
      ? <button className='main-cards__btn' onClick={() => handleAddToCart(item)}>В корзину</button>
      : <div className='main-cards__btn-container'>
          <button onClick={() => handleRemoveToCart(item)} className='main-cards__btn-change'><img src={minusBtnImage} alt="" /></button>
          <p className='main-cards__btn-count'>{findItemToId(item.id)}</p>
          <button onClick={() => handleAddToCart(item)} className='main-cards__btn-change'><img src={plusBtnImage} alt="" /></button>
        </div>
      }
      

    </li> 
  )
}

export default MainCard