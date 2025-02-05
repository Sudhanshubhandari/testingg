import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ParticularValidation from './pages/ParticularValidation';
import ProfileValidation from './pages/ProfileValidation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/particular-validation" element={<ParticularValidation />} />
        <Route path="/profile-validation" element={<ProfileValidation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;