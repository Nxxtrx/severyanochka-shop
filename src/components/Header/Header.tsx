import React, { FunctionComponent, ReactNode } from 'react'
import headerLogo from '../../images/header-logo.svg'
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import likeImage from '../../images/menu-item-like.svg'
import orderImage from '../../images/menu-item-order.svg'
import cartImage from '../../images/menu-item-cart.svg'
import './Header.scss'
import PopupCategory from '../PopupCategory/PopupCategory';
import { Badge } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';

interface HeaderProps {
  children: {
    childrenOne?: ReactNode,
    childrenTwo?: ReactNode
  }
}

const Header:FunctionComponent<HeaderProps> = ({children}):JSX.Element => {

  const {childrenOne, childrenTwo} = children

  const [isOpened, setIsOpened] = React.useState<boolean>(false)

  const cartArray = useAppSelector(state => state.foodReducer.cart)

  const totalItemsInCart = cartArray.reduce((total, currentItem) => total + currentItem.count, 0);

  return (
    <div className="header__container">
      <Link to='/' className="header__logo-container">
        <img className="header__logo" src={headerLogo} alt="" />
        <HeaderTitle />
      </Link>
      <div className="catalog">
        <button className="catalog__button" onClick={() => setIsOpened(!isOpened)}><span className="catalog__span">Каталог</span></button>
      </div>
      {childrenOne}
      <div className="menu">
        <ul className="menu__list">
          <li className="menu__item">
            <img className="menu__image" src={likeImage} alt="" />
            <Link to='/favorites' className="menu__text">Избранное</Link>
          </li>
          <li className="menu__item">
            <img className="menu__image" src={orderImage} alt="" />
            <p className="menu__text">Заказы</p>
          </li>
          <li className="menu__item">
            <Badge badgeContent={totalItemsInCart} color="success">
              <img className="menu__image" src={cartImage} alt="" />
            </Badge>
            <Link to='/cart' className="menu__text">Корзина</Link>
          </li>
        </ul>
      </div>
      {childrenTwo}
      <PopupCategory isOpened={isOpened}/>
    </div>
  );
}

export default Header