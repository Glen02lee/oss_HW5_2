import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PlayerSection from './components/PlayerSection';
import Footer from './components/Footer';
import UpdatePage from './pages/UpdatePage';
import DetailPage from './pages/DetailPage';
import './index.css'; // Global styles

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PlayerSection />} />
        <Route path="/list" element={<PlayerSection />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/update" element={<UpdatePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;