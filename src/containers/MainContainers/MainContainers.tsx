import React, {useEffect} from 'react'
import Banner from '../../components/Banner/Banner'
import MainCards from '../../components/MainCards/MainCards'
import { postAPI } from '../../services/PostServices'
import SpecialEvent from '../../components/SpecialEvent/SpecialEvent'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchFood } from '../../store/redusers/ActionCreaters'
import { addToCart } from '../../store/redusers/FoodSlice'
import { IFood } from '../../models/IFood'



const MainContainers = () => {
  //получения данных с типом "new"
  const { data: newFood, isLoading: isNewFoodLoading } = postAPI.useFetchAllPostsQuery({ start: 0, end: 4, type: 'new' });

  //получения данных с типом "sale"
  const { data: saleFood, isLoading: isSaleFoodLoading } = postAPI.useFetchAllPostsQuery({ start: 0, end: 4, type: 'sale' });

  const dispatch = useAppDispatch()
  const food = useAppSelector(state => state.foodReducer)
  // console.log(food)
  
  useEffect(() => {
    dispatch(fetchFood())
  },[])

  const handleAddToCart = (foodItem:IFood[]) => {
    dispatch(addToCart(foodItem))
  }


  return (
    <main className="main">
      <Banner />
      {saleFood && (
        <MainCards title='Акции' linkTitle='Все акции' data={saleFood} />
      )}
      {newFood && (
        <MainCards title='Новинки' linkTitle='Все новинки' data={newFood} />
      )}
      <SpecialEvent />
    </main>
  )
}

export default MainContainers