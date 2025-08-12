import React from 'react';
import Background from '../components/Background/Background.jsx';
import Header from "../components/Header/Header.jsx";
import ParallaxHome from "../components/ParallaxHome/ParallaxHome.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Home = () => {

  return (
    <>
      <Header />
      <Background />
      <ParallaxHome
        backgroundSrc="/images/fondo.png"
        intensity={0.35}
      />
      <Footer />
    </>
  );
};

export default Home;