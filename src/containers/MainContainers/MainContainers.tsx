import React from 'react'
import Banner from '../../components/Banner/Banner'
import MainCards from '../../components/MainCards/MainCards'
import { postAPI } from '../../services/PostServices'
import SpecialEvent from '../../components/SpecialEvent/SpecialEvent'


const MainContainers = () => {
  //получения данных с типом "new"
  const { data: newFood, isLoading: isNewFoodLoading } = postAPI.useFetchAllPostsQuery({ start: 0, end: 4, type: 'new' });

  //получения данных с типом "sale"
  const { data: saleFood, isLoading: isSaleFoodLoading } = postAPI.useFetchAllPostsQuery({ start: 0, end: 4, type: 'sale' });


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