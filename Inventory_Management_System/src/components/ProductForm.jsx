import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import useInventory from '../hooks/UseInventory';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryId: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setAlert } = useInventory();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();

        if (!Array.isArray(response.data)) {
          throw new Error('Expected categories array');
        }

        setCategories(response.data);
      } catch (err) {
        setAlert(err.message || 'Failed to load categories', 'danger');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        categoryId: product.category?.id || ''
      });
    }
  }, [product, setAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (loading) return <div>Loading categories...</div>;

  return (
    <form onSubmit={handleSubmit} className="pro-form">
      <div className="pro-field">
        <label className="pro-label">📦 Product Name</label>
        <input
          type="text"
          className="pro-input"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="pro-field">
        <label className="pro-label">📝 Description</label>
        <textarea
          className="pro-input"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="pro-field">
        <label className="pro-label">💰 Price</label>
        <input
          type="number"
          step="0.01"
          className="pro-input"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div className="pro-field">
        <label className="pro-label">🔢 Quantity</label>
        <input
          type="number"
          className="pro-input"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      <div className="pro-field">
        <label className="pro-label">📂 Category</label>
        <select
          className="pro-input"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="pro-actions">
        <button type="button" className="pro-btn pro-cancel" onClick={onCancel}>
          ❌ Cancel
        </button>
        <button type="submit" className="pro-btn pro-submit">
          {product ? '✅ Update' : '➕ Add'} Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
