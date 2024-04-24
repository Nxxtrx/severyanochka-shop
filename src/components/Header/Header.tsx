import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import HeaderTitle from '../HeaderTitle/HeaderTitle';
import PopupCategory from '../PopupCategory/PopupCategory';
import headerLogo from '../../images/header-logo.svg';
import { ReactComponent as LikeImage } from '../../images/header-favorites.svg';
import { ReactComponent as OrderImage } from '../../images/menu-item-order.svg';
import { ReactComponent as CartImage } from '../../images/Menu.svg';
import type { FC, ReactNode } from 'react';
import anime from 'animejs';
import './Header.scss';

interface HeaderProps {
  children: {
    childrenOne?: ReactNode;
    childrenTwo?: ReactNode;
  };
}

const Header: FC<HeaderProps> = ({ children }) => {
  const { childrenOne, childrenTwo } = children;
  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const location = useLocation();

  const cartArray = useAppSelector(state => state.foodReducer.cart);
  const favoriteProductArray = useAppSelector(state => state.foodReducer.favorites);

  const totalItemsInCart = cartArray.reduce((total, currentItem) => total + currentItem.count, 0);

  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (logoRef.current != null) {
      const lastPath = logoRef.current.querySelector('.ss');
      console.log(lastPath); // Здесь будет последний элемент path
    }
  }, [logoRef]);

  const orderLogoAnimate = (): void => {
    anime({
      targets: '.box',
      easing: 'easeInOutQuad',
      duration: 500,
      rotate: '+=20',
      scale: [1, 1.2, 1],
      direction: 'alternate',
    });
  };

  const cartLogoAnimate = (): void => {
    anime({
      targets: '.cart-logo',
      easing: 'easeInOutQuad',
      keyframes: [
        { translateX: '-5px' },
        { translateX: '10px', rotate: '-30deg', scale: 1 },
        { translateX: '0', rotate: '0', scale: 1 },
      ],
      direction: 'normal',
    });
  };

  const favoriteLogoAnimate = (): void => {
    anime({
      targets: '.like',
      scale: [1, 1.2, 1],
      easing: 'easeInOutQuad',
      duration: 500,
    });
  };

  return (
    <div className="header__container">
      <Link to="/" className="header__logo-container">
        <img className="header__logo" ref={logoRef} src={headerLogo} alt="" />
        <HeaderTitle />
      </Link>
      <div className="catalog">
        <button
          className="catalog__button"
          onClick={() => {
            setIsOpened(!isOpened);
          }}>
          <span className="catalog__span">Каталог</span>
        </button>
      </div>
      {childrenOne}
      <div className="menu">
        <ul className="menu__list">
          <li className="menu__item">
            <Link
              onClick={favoriteLogoAnimate}
              to="/favorites"
              className={`menu__text ${location.pathname === '/favorites' ? 'menu__text_type_active' : ''}`}>
              <Badge badgeContent={favoriteProductArray.length} color="success">
                <LikeImage
                  fill={`${location.pathname === '/favorites' ? '#f63' : '#000'}`}
                  width="24"
                  height="24"
                  className="like"
                />
              </Badge>
              Избранное
            </Link>
          </li>
          <li className="menu__item">
            <Link
              to="/order"
              onClick={orderLogoAnimate}
              className={`menu__text ${location.pathname === '/order' ? 'menu__text_type_active' : ''}`}>
              <OrderImage
                fill={`${location.pathname === '/order' ? '#f63' : '#000'}`}
                width="24"
                height="24"
                className="box"
              />
              Заказы
            </Link>
          </li>
          <li className="menu__item">
            <Link
              onClick={cartLogoAnimate}
              to="/cart"
              className={`menu__text ${location.pathname === '/cart' ? 'menu__text_type_active' : ''}`}>
              <Badge badgeContent={totalItemsInCart} className="menu__badge-count" color="success">
                <CartImage
                  fill={`${location.pathname === '/cart' ? '#f63' : '#000'}`}
                  width="24"
                  height="24"
                  className="cart-logo"
                />
              </Badge>
              Корзина
            </Link>
          </li>
        </ul>
      </div>
      {childrenTwo}
      <PopupCategory isOpened={isOpened} />
    </div>
  );
};

export default Header;
