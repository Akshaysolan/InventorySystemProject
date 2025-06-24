import React, { useState, useEffect } from 'react';
import useInventory from '../hooks/UseInventory';
import '../css/CategoryForm.css';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const { setAlert } = useInventory();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setAlert('Category name is required', 'danger');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="cat-form-wrapper">
      {/* Background arrows */}
      <div className="cat-arrow-layer">
        {[...Array(30)].map((_, i) => (
          <div className="cat-arrow" key={i}></div>
        ))}
      </div>

      {/* The actual form */}
      <div className="cat-form-container cat-form-fixed">
        <form onSubmit={handleSubmit} className="cat-form">
          <div className="cat-field">
            <label className="cat-label">Category Name</label>
            <input
              type="text"
              className="cat-input"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cat-field">
            <label className="cat-label">Description</label>
            <textarea
              className="cat-input"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="cat-actions">
            <button
              type="button"
              className="cat-btn cat-btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="submit" className="cat-btn cat-btn-primary">
              {category ? 'Update' : 'Add'} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
