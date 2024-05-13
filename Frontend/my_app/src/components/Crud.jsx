
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Crud.css'; // Assuming this is your CSS file for styling

const API_URL = 'https://behance-z9se.onrender.com/data';

const CrudComponent = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(5);
  const [formData, setFormData] = useState({
    img_src: '',
    title: '',
    price_item: '',
    main_desc: '',
    refill: '',
    usage: '',
    incredients: '',
    shipping_payment: ''
  });
  const [editingPropertyId, setEditingPropertyId] = useState(null); // Track which property is being edited

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(API_URL);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchProperties();
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProperties(properties.filter((property) => property.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleUpdate = (id) => {
    setEditingPropertyId(id); // Set the id of the property being edited
    const propertyToEdit = properties.find((property) => property.id === id);
    setFormData({ ...propertyToEdit });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      const newProperty = response.data;
      setProperties([newProperty, ...properties]);
      setFormData({
        img_src: '',
        title: '',
        price_item: '',
        main_desc: '',
        refill: '',
        usage: '',
        incredients: '',
        shipping_payment: ''
      });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };
  
  const handleEdit = async () => {
    try {
      await axios.put(`${API_URL}/${editingPropertyId}`, formData);
      const updatedProperties = properties.map(property => {
        if (property.id === editingPropertyId) {
          return { ...formData, id: editingPropertyId };
        }
        return property;
      });
      setProperties(updatedProperties);
      setEditingPropertyId(null);
      setFormData({
        img_src: '',
        title: '',
        price_item: '',
        main_desc: '',
        refill: '',
        usage: '',
        incredients: '',
        shipping_payment: ''
      });
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="property-container">
      <h1 className="property-heading">Property List</h1>
      <form className="update-form" onSubmit={editingPropertyId ? handleEdit : handleAdd}>
        <input
          type="text"
          name="img_src"
          value={formData.img_src}
          placeholder="Image URL"
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="price_item"
          value={formData.price_item}
          placeholder="Price"
          onChange={handleChange}
        />
        <textarea
          name="main_desc"
          value={formData.main_desc}
          placeholder="Main Description"
          onChange={handleChange}
        />
        <textarea
          name="refill"
          value={formData.refill}
          placeholder="Refill Instructions"
          onChange={handleChange}
        />
        <textarea
          name="usage"
          value={formData.usage}
          placeholder="Usage Instructions"
          onChange={handleChange}
        />
        <textarea
          name="incredients"
          value={formData.incredients}
          placeholder="Ingredients"
          onChange={handleChange}
        />
        <textarea
          name="shipping_payment"
          value={formData.shipping_payment}
          placeholder="Shipping & Payment Info"
          onChange={handleChange}
        />
        <button type="submit" className="add-update-button">
          {editingPropertyId ? 'Update Property' : 'Add Property'}
        </button>
      </form>
      <ul className="property-list">
        {currentProperties.map((property) => (
          <li key={property.id} className="property-item">
            <div className="property-details">
              <img className="property-image" src={property.img_src} alt={property.title} />
              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-price">Price: {property.price_item}</p>
                <p className="property-desc">{property.main_desc}</p>
                <button className="delete-button" onClick={() => handleDelete(property.id)}>Delete</button>
                <button className="update-button" onClick={() => handleUpdate(property.id)}>Update</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        propertiesPerPage={propertiesPerPage}
        totalProperties={properties.length}
        paginate={paginate}
      />
    </div>
  );
};

const Pagination = ({ propertiesPerPage, totalProperties, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button className="page-link" onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CrudComponent;
