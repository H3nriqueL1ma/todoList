import './styles/App.css';
import React from 'react';
import { Screen, ScreenLogin } from './components/Screens';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Screen />}/>
          <Route exact path="/login" element={<ScreenLogin />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
