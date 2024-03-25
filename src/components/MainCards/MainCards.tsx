import React, { FunctionComponent, useEffect } from 'react'
import linkLogo from '../../images/chevron-right.svg'
import { Rating } from '@mui/material'
import BasicRating from '../Rating/Rating'
import cardImage from '../../images/card-image.png'
import './MainCards.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchFood } from '../../store/redusers/ActionCreaters'
import MainCard, { ProductType } from '../MainCard/MainCard'
import { IFood } from '../../models/IFood'



interface CardListType {
  title?: string,
  linkTitle?: string,
  data: IFood[],
}


const MainCards:FunctionComponent<CardListType> = ({title, linkTitle, data}) => {
  return (
    <div className='main-cards'>
      <div className='main-cards__title-container'>
        <h2 className='main-cards__title'>{title}</h2>
          {linkTitle && <a className='main-cards__link' href="">{linkTitle} <img src={linkLogo} alt="" /></a>}
      </div>
      <ul className='main-cards__container'>
        {data.map((item) => 
          <MainCard key={item.id} cardImage={item.url} title={item.type} price={item.price} name={item.name} rating={item.rating} item={item} isLike={item.isLike}/>
        )}
      </ul>
    </div>
  )
}

export default MainCards