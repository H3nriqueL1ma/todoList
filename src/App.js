import './styles/App.css';
import './styles/mediaqueries.css';
import React from 'react';
import { Screen, ScreenLogin, ScreenRegister } from './components/Screens';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Screen />}/>
          <Route exact path="/login" element={<ScreenLogin />}/>
          <Route exact path="/register" element={<ScreenRegister />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
