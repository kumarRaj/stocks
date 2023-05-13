import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StocksList } from './pages/StocksList/StocksList';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<StocksList/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
