import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import CartButton from '../CartButton/CartButton'
import './Cart.scss'

const Cart = () => {

  const cartData = useAppSelector(state => state.foodReducer.cart)
  console.log(cartData)

  return (
    <div className="cart__list-container">
      <ul className="cart__list">
        {cartData.map((item) => (
          <li key={item.id} className="cart__item">
            <img className="cart__item-image" src={item.url} alt="" />
            <div className="cart__text-container">
              <p className="cart__item-title">{item.name}</p>
              <p className="cart__item-price">{item.price} ₽ <span>за шт.</span></p>
            </div>
            <div className='cart__total-container'>
              <CartButton item={item} />
              <p className='cart__item-total'>{item.total} ₽</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart