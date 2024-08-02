import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [clusterFilter, setClusterFilter] = useState('');
  const [spaceLimit, setSpaceLimit] = useState('');
  
  useEffect(() => {
    axios.get('/warehouses.json')
      .then(response => setWarehouses(response.data)).catch(error => console.error('Error fetching data:', error));}, []);

  const filteredWarehouses = warehouses.filter(warehouse => 
    warehouse.name.toLowerCase().includes(search.toLowerCase()) &&
    (cityFilter ? warehouse.city === cityFilter : true) &&
    (clusterFilter ? warehouse.cluster === clusterFilter : true) &&
    (spaceLimit ? warehouse.space_available <= parseInt(spaceLimit) : true)
  );
  return (
    <div className="warehouse-list container">
      <h1>Warehouses</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by city"
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by cluster"
        value={clusterFilter}
        onChange={(e) => setClusterFilter(e.target.value)}
      />
      <input
        type="number"
        placeholder="Space available limit"
        value={spaceLimit}
        onChange={(e) => setSpaceLimit(e.target.value)}
      />
      <ul>
        {filteredWarehouses.map(warehouse => (
          <li className='card' key={warehouse.id}>
            <Link to={`/warehouse/${warehouse.id}`}>
            <p >Warehouse Name : <span > {warehouse.name}</span>   </p>
            <p >City : <span > {warehouse.city}</span>   </p>
            <p >Cluster Name : <span > {warehouse.cluster}</span>   </p>
            <p > Space : <span > {warehouse.space_available}</span>   </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WarehouseList;
