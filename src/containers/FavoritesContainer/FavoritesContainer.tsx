import React, {FC, useEffect, useState} from 'react'
import { useAppSelector } from '../../hooks/redux'
import MainCards from '../../components/MainCards/MainCards'
import Filter from '../../components/Filter/Filter'
import { IFood } from '../../models/IFood'
import BtnCrossImage from '../../images/btn-cross-img.svg'
import './FavoritesContainer.scss'

const FavoritesContainer:FC = () => {
  const favoritesArray = useAppSelector(state => state.foodReducer.favorites)

  const [filteredCount, setFilteredCount] = useState<number[]>([]);
  const [productArray, setProductArray] = useState<IFood[]>([])

  useEffect(() => { 
    if(filteredCount.length >0){
      setProductArray(favoritesArray.filter((product: IFood) => product.price >= filteredCount[0] && product.price <= filteredCount[1]))
    } else{
      setProductArray(favoritesArray)
    }
  }, [filteredCount, favoritesArray])

  const handleResetFilter = () => {
    setFilteredCount([])
  }

  return (
    <section className='favorites'>
      <h2 className='favorites__title'>Избранное</h2>
      <div className='favorites__container'>
        <Filter setFilteredCount={setFilteredCount}/>
        <div className='favorites__product-container'>
          {filteredCount.length > 0 && 
          <div className='favorites__filter-card'>
            <p>{`Цена от ${filteredCount[0]} до ${filteredCount[1]}`}</p>
            <button onClick={handleResetFilter}><img src={BtnCrossImage} alt="" /></button>
          </div>}
          <MainCards data={productArray}/>
        </div>
      </div>
      
    </section>
  )
}

export default FavoritesContainer