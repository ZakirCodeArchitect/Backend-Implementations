import React from 'react';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import NewsList from './components/News/NewsList';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div>
      {/* 5 components */}
      <Header />
      <HeroSection />
      {/* <div style={{ display: 'flex', gap: '50px' }}> */}
        <NewsList />
        <Sidebar />
      {/* </div> */}
      <Footer />
    </div>
  );
}

export default App;
