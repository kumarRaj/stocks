import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StocksList } from './pages/StocksList/StocksList';
import {Home} from "./pages/StocksList/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<StocksList/>} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
