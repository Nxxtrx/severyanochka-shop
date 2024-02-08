import React from 'react'
import deliveryBanner from '../../images/main-banner-delivery.png'


const Banner = () => {
  return (
    <section className="main-banner">
      <img className="main-banner__image" src={deliveryBanner} alt="" />
      <h2 className="main-banner__text">Доставка бесплатно от 1000 ₽</h2>
    </section>
  );
}

export default Banner