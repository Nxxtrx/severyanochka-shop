import type { FC } from 'react';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import HeaderContainer from '../containers/HeaderContainer/HeaderContainer';
import MainContainers from '../containers/MainContainers/MainContainers';
import CartContainer from '../containers/CartContainer/CartContainer';
import FavoritesContainer from '../containers/FavoritesContainer/FavoritesContainer';
import SearchContainer from '../containers/SearchContainer/SearchContainer';
import Footer from '../components/Footer/Footer';
import '../utils/fonts/fonts.css';
import '../utils/normalize.css';
import './App.scss';

const App: FC = () => {
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
      loop: true,
    });
  }, []);

  return (
    <div className="page">
      <HeaderContainer />
      <main className="main">
        <Routes>
          <Route path="/" element={<MainContainers />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/favorites" element={<FavoritesContainer />} />
          <Route path="/search" element={<SearchContainer />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
