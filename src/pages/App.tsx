import React from 'react'
import anime from 'animejs/lib/anime.es.js';
import HeaderContainer from '../containers/HeaderContainer/HeaderContainer';
import '../utils/fonts/fonts.css'
import '../utils/normalize.css'
import './App.scss'
import MainContainers from '../containers/MainContainers/MainContainers';


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
      targets: 'svg path',
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
      <MainContainers />
    </div>
  );
}
