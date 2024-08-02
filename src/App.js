import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WarehouseList from './components/WarehouseList';
import WarehouseDetails from './components/WarehouseDetails';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/warehouse/:id" element={<WarehouseDetails />} />
          <Route path="/" element={<WarehouseList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;