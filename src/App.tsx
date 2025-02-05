import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ParticularValidation from './pages/ParticularValidation';
import ProfileValidation from './pages/ProfileValidation';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/particular-validation/*" element={<ParticularValidation />} />
        <Route path="/profile-validation" element={<ProfileValidation />} />
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}