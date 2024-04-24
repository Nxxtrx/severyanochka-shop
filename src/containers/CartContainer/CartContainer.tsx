import React from 'react';
import Cart from '../../components/Cart/Cart';
import CartTotal from '../../components/CartTotal/CartTotal';

const CartContainer: React.FC = () => {
  return (
    <main className="cart">
      <div className="cart__container">
        <h2 className="cart__title">Корзина</h2>
        <div className="cart__item-container">
          <Cart />
          <CartTotal />
        </div>
      </div>
    </main>
  );
};

export default CartContainer;
