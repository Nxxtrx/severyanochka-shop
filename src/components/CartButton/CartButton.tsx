import React, {useState, useEffect, FC} from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { removeToCart, addToCart } from '../../store/redusers/FoodSlice'
import { IFood } from '../../models/IFood'
import minusBtnImage from '../../images/cart-minus.svg'
import plusBtnImage from '../../images/cart-plus.svg'
import { ICart } from '../../models/ICart'

interface CartButtonProps {
  item: ICart
}

const CartButton:FC<CartButtonProps> = ({item}) => {
  const [countCart, setCountCart] = useState(0)

  const dispatch = useAppDispatch()
  const cartArray = useAppSelector(state => state.foodReducer.cart)

  const handleAddToCart = (foodItem: IFood) => {
    dispatch(addToCart(foodItem))
  }

  const handleRemoveToCart = (foodItem: IFood) => {
    dispatch(removeToCart(foodItem))
  }

  const findItemToId = (id: string) => {
    const item = cartArray.find((item) => item.id === id);
    return item ? item.count : 0;
  }

  useEffect(() => {
    setCountCart(findItemToId(item.id))
  }, [handleAddToCart, handleRemoveToCart])

  return (
    <div className='main-cards__btn-container'>
      <button onClick={() => handleRemoveToCart(item)} className='main-cards__btn-change'><img src={minusBtnImage} alt="" /></button>
      <p className='main-cards__btn-count'>{findItemToId(item.id)}</p>
      <button onClick={() => handleAddToCart(item)} className='main-cards__btn-change'><img src={plusBtnImage} alt="" /></button>
    </div>
  )
}

export default CartButton