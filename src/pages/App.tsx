import React from 'react'
import anime from 'animejs/lib/anime.es.js';
import HeaderContainer from '../containers/HeaderContainer/HeaderContainer';
import '../utils/fonts/fonts.css'
import '../utils/normalize.css'
import './App.scss'
import MainContainers from '../containers/MainContainers/MainContainers';
import Footer from '../components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import CartContainer from '../containers/CartContainer/CartContainer';


export default function App() {

  React.useEffect(() => {
    anime({
      targets: '.main-banner',
      backgroundPositionY: '100%',
      duration: 5000,
      easing: 'linear',
      direction: 'alternate',
      loop: true,
    });

    anime({
      targets: '.header__title',
      duration: 3000,
      easing: 'linear',
      fillOpacity: {
        value: [0, 1],
        duration: 2000,
        delay: 1000, 
      },
      direction: 'alternate',
      loop: true
    });
    
  }, []);

  return (
    <div className="page">
      <HeaderContainer />
      <Routes >
        <Route path='/' element={<MainContainers />}/>
        <Route path='/cart' element={<CartContainer />}/>
      </Routes>
      <Footer />
    </div>
  );
}
