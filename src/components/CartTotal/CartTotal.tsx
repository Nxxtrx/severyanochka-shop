import React, { useEffect, useState } from 'react'
import './CartTotal.scss'

import { FormControlLabel } from '@mui/material';
import IOSSwitch from '../../utils/Switch/Switch';
import smileImage from '../../images/cart-bonus-smile.svg'
import { useAppSelector } from '../../hooks/redux';

const CartTotal = () => {

  const cartData = useAppSelector(state => state.foodReducer.cart)
  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)
  const [sale, setSale] = useState(0)
  const [check, setCheck] = useState(false)
  const [bonus, setBonus] = useState(200)

  useEffect(() => {
    if(cartData) {
      setTotal(cartData.reduce((acc, item) => {
        return item.total + acc
      }, 0))
      setCount(cartData.reduce((acc, item) => {
        return item.count + acc
      }, 0))
      setSale(cartData.reduce((acc, item) => {
        return (item.sale * item.price / 100) * item.count + acc
      }, 0))
    }
  }, [cartData])

  const handleToggle = () => {
    setCheck(prev => !prev)
  }

  const calculateFinalAmount = () => {
    const finalAmount = total-sale

    if (check && finalAmount <= bonus) {
      return 0; // использовать все бонусы
    } else if (check && finalAmount > bonus) {
      return finalAmount - bonus; // вычитать только часть бонусов
    } else {
      return finalAmount; // не использовать бонусы
    }
  }

  const calculateBonusAmount = () => {
    const finalAmount = total-sale
    if(check && finalAmount <= bonus){
      return bonus - (bonus-finalAmount)
    } else {
      return bonus
    }
  }

  return (
    <div className='total'>
      <div className='total__bonus'>
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }}  checked={check} onChange={handleToggle}/>}
          label=""
        />
        <p className='total__bonus-span'>Списать {bonus} ₽ </p>
        <p>На карте накоплено {bonus} ₽ </p>
      </div>
      <div className='total__sum-container'>
        <p>{count} товара<span>{total} ₽</span></p>
        {sale > 0 && <p>Скидка<span className='total__sale'>-{sale}  ₽</span></p>}
        {check && <p>Бонусы<span className='total__sale'>-{calculateBonusAmount()}  ₽</span></p>}
      </div>
      <p className='total__sum-total'>Итог <span>{calculateFinalAmount()} ₽</span></p>
      <p className='total__take-bonus'><img src={smileImage} alt="" />Вы получаете <span>&nbsp;100 бонусов</span></p>
      {calculateFinalAmount() <= 1000 && <div className='total__min-sum'>Минимальная сумма заказа 1000р</div>}
      <button className='total__btn'>Оформить заказ</button>
    </div>
  )
}

export default CartTotal