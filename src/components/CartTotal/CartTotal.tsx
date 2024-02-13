import React from 'react'
import './CartTotal.scss'

import { FormControlLabel } from '@mui/material';
import IOSSwitch from '../../utils/Switch/Switch';
import smileImage from '../../images/cart-bonus-smile.svg'

const CartTotal = () => {
  return (
    <div className='total'>
      <div className='total__bonus'>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
          label=""
        />
        <p className='total__bonus-span'>Списать 200 ₽ </p>
        <p>На карте накоплено 200 ₽ </p>
      </div>
      <div className='total__sum-container'>
        <p>3 товара<span>259 ₽</span></p>
        <p>Скидка<span className='total__sale'>-8,01  ₽</span></p>
      </div>
      <p className='total__sum-total'>Итог <span>250,09 ₽</span></p>
      <p className='total__take-bonus'><img src={smileImage} alt="" />Вы получяете <span>&nbsp;100 бонусов</span></p>
      <div className='total__min-sum'>Минимальная сумма заказа 1000р</div>
      <button className='total__btn'>Оформить заказ</button>
    </div>
  )
}

export default CartTotal