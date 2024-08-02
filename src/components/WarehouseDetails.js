import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WarehouseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [warehouse, setWarehouse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customFields, setCustomFields] = useState({});

  useEffect(() => {
    axios.get('/warehouses.json')
      .then(response => {
        const foundWarehouse = response.data.find(w => w.id === parseInt(id));
        setWarehouse(foundWarehouse);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWarehouse({ ...warehouse, [name]: value });
  };

  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setCustomFields({ ...customFields, [name]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Updated warehouse:', warehouse, 'Custom fields:', customFields);
  };

  if (!warehouse) return <div>Loading...</div>;

  return (
    <div className="warehouse-details container">
      <button onClick={() => navigate('/')}>Back</button>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="name"
            value={warehouse.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            value={warehouse.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="cluster"
            value={warehouse.cluster}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="space_available"
            value={warehouse.space_available}
            onChange={handleInputChange}
          />
          <input
            type="checkbox"
            name="is_live"
            checked={warehouse.is_live}
            onChange={() => setWarehouse({ ...warehouse, is_live: !warehouse.is_live })}
          />
          <div>
            <h3>Custom Fields</h3>
            {Object.keys(customFields).map(key => (
              <div key={key}>
                <input
                  type="text"
                  name={key}
                  value={customFields[key]}
                  onChange={handleCustomFieldChange}
                />
              </div>
            ))}
            <button onClick={() => setCustomFields({ ...customFields, [`custom_${Date.now()}`]: '' })}>
              Add Custom Field
            </button>
          </div>
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h1>{warehouse.name}</h1>
          <p>City: {warehouse.city}</p>
          <p>Cluster: {warehouse.cluster}</p>
          <p>Space Available: {warehouse.space_available}</p>
          <p>Live: {warehouse.is_live ? 'Yes' : 'No'}</p>
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default WarehouseDetails;
