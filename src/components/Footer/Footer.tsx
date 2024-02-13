import React from 'react'
import './Footer.scss'
import footerLogo from '../../images/header-logo.svg'
import instLogo from '../../images/instagram.svg' 
import facebookLogo from '../../images/facebook.svg' 
import vkLogo from '../../images/vkontakte.svg' 
import okLogo from '../../images/ok.svg' 
import phoneImage from '../../images/footer-phone.svg'


const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer__container">
        <div className='footer__page-link'>
          <img src={footerLogo} alt="" className="footer__logo" />
          <ul className='footer__list'>
            <li className='footer__item'>
              <a className='footer__link' href="#">О компании</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link' href="#">Контакты</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link' href="#">Вакансии</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link' href="#">Статьи</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link' href="#">Политика обработки персональных данных</a>
            </li>
          </ul>
        </div>
        <div className='footer__socials'>
          <ul className='footer__socials-container'>
            <li className='footer__social-item'>
              <a className='footer__social-link' href="#"><img className='footer__social-image'src={vkLogo} alt="" /></a>
            </li>
            <li className='footer__social-item'>
              <a className='footer__social-link' href="#"><img className='footer__social-image' src={okLogo} alt="" /></a>
            </li>
          </ul>
          <div className='footer__phone-container'>
            <img className='footer__phone-image' src={phoneImage} alt="" />
            <p className='footer__phone-number'>8 800 000 00 00</p>
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer