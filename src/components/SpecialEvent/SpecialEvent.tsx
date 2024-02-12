import React from 'react'
import cardImage from '../../images/event-card.png'
import cartImage from '../../images/event-cart.png'
import detailsImage from '../../images/Group.svg'
import './SpecialEvent.scss'

const SpecialEvent = () => {
  return (
    <section className='event'>
      <h2 className='event__title'>Специальные предложения</h2>
      <div className='event__container'>
        <div className='event__card event__card_type_card'>
          <div className='event__text'>
            <h3 className='event__text-title'>Оформите карту «Северяночка»</h3>
            <p className='event__description'>И получайте бонусы при покупке в магазинах и на сайте</p>
          </div>
          <img className='event__image' src={cardImage} alt="" />
        </div>
        <div className='event__card event__card_type_cart'>
          <div className='event__text'>
            <h3 className='event__text-title'>Покупайте акционные товары</h3>
            <p className='event__description'>И получайте вдвое больше бонусов</p>
          </div>
          <img className='event__image ' src={cartImage} alt="" />
        </div>
      </div>
    </section>
  )
}

export default SpecialEvent