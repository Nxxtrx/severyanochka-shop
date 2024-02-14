import React from 'react'
import { useAppSelector } from '../../hooks/redux'
import CartButton from '../CartButton/CartButton'
import './Cart.scss'

const Cart = () => {

  const cartData = useAppSelector(state => state.foodReducer.cart)

  return (
    <div className="cart__list-container">
      <ul className="cart__list">
        {cartData.map((item) => (
          <li key={item.id} className="cart__item">
            <img className="cart__item-image" src={item.url} alt="" />
            <div className="cart__text-container">
              <p className="cart__item-title">{item.name}</p>
              {item.sale > 0 
              ? <div className='cart__price-container'>
                  <p className='cart__price-card'>{item.sale > 0 ? item.price * item.sale / 100 : item.price} ₽<br /><span>С картой</span></p>
                  <p className='cart__price-not-card'>{item.price} ₽<br /><span>Обычная</span></p>
                  <span className='cart__price-count'>за шт</span>
                  <div className='cart__item-sale'>-10%</div>
                </div>
              :  <p className="cart__item-price">{item.price} ₽ <span>за шт.</span></p>
              }
            </div>
            <div className='cart__total-container'>
              <CartButton item={item} />
              <p className='cart__item-total'>{item.sale > 0 ? item.total * item.sale / 100 * item.count : item.price * item.count} ₽</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart