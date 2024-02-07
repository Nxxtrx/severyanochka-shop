import React from 'react'
import asd from '../../images/qwe.svg'
import './App.scss'
import BasicSelect from'../Catalog-select/CatalogSelect'

export default function App() {
  return (
    <header className='header'>
      <img className='header__logo' src={asd} alt="" />
      <h1 className='header__title'>Северяночка</h1>
      <BasicSelect />
    </header>
  )
}
