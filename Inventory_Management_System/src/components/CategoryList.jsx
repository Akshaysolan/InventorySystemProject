import React, { useState, useEffect } from 'react';
import { getCategories, deleteCategory } from '../services/api';
import useInventory from '../hooks/UseInventory';
import '../css/CategoryForm.css';

const CategoryList = ({ onEdit }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setAlert } = useInventory();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      console.log("Fetched categories:", data); 
      setCategories(data);
      setFilteredCategories(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id);
        const updated = categories.filter(category => category.id !== id);
        setCategories(updated);
        setFilteredCategories(updated);
        setAlert('Category deleted successfully', 'success');
      } catch (err) {
        setAlert(err.message, 'danger');
      }
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    const results = categories.filter(category =>
      category.name.toLowerCase().includes(keyword)
    );
    setFilteredCategories(results);
  };

  if (loading) return <div className="catList-message">Loading...</div>;
  if (error) return <div className="catList-message">Error: {error}</div>;

  return (
    <div className="catList-container">
      <input
        type="text"
        className="catList-search"
        placeholder="Search category..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="catList-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <div key={category.id} className="catList-card">
              <div className="catList-id">ID: {category.id}</div>
              <div className="catList-name">{category.name}</div>
              <div className="catList-description">{category.description}</div>
              <div className="catList-actions">
                <button
                  className="catList-btn catList-edit"
                  onClick={() => onEdit(category)}
                >
                  Edit
                </button>
                <button
                  className="catList-btn catList-delete"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="catList-message">No categories found.</div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
