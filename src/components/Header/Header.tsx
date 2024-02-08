import React, { FunctionComponent, ReactNode } from 'react'
import headerLogo from '../../images/header-logo.svg'
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import likeImage from '../../images/menu-item-like.svg'
import orderImage from '../../images/menu-item-order.svg'
import cartImage from '../../images/menu-item-cart.svg'
import './Header.scss'

interface HeaderProps {
  children: {
    childrenOne?: ReactNode,
    childrenTwo?: ReactNode
  }
}

const Header:FunctionComponent<HeaderProps> = ({children}):JSX.Element => {

  const {childrenOne, childrenTwo} = children

  return (
    <header className="header">
      <div className="header__logo-container">
        <img className="header__logo" src={headerLogo} alt="" />
        <HeaderTitle />
      </div>
      <div className="catalog">
        <button className="catalog__button"></button>
        <span className="catalog__span">Каталог</span>
      </div>
      {childrenOne}
      <div className="menu">
        <ul className="menu__list">
          <li className="menu__item">
            <img className="menu__image" src={likeImage} alt="" />
            <p className="menu__text">Избранное</p>
          </li>
          <li className="menu__item">
            <img className="menu__image" src={orderImage} alt="" />
            <p className="menu__text">Заказы</p>
          </li>
          <li className="menu__item">
            <img className="menu__image" src={cartImage} alt="" />
            <p className="menu__text">Корзина</p>
          </li>
        </ul>
      </div>
      {childrenTwo}
    </header>
  );
}

export default Header