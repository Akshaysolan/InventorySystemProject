import React, { useState } from 'react';
import useInventory from '../hooks/UseInventory';
import CategoryList from '../components/CategoryList';
import CategoryForm from '../components/CategoryForm';
import { createCategory, updateCategory } from '../services/api';
import '../css/CategoryForm.css';

const CategoriesPage = () => {
  const [editingCategory, setEditingCategory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { setAlert } = useInventory();

  const handleSubmit = async (categoryData) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, categoryData);
        setAlert('Category updated successfully', 'success');
      } else {
        await createCategory(categoryData);
        setAlert('Category added successfully', 'success');
      }
      setEditingCategory(null);
      setShowForm(false);
    } catch (err) {
      setAlert(err.message, 'danger');
    }
  };

  return (
    <div className="catPage-wrapper">
      <div className="catPage-header">
        <h2 className="catPage-title">Categories</h2>
        <button
          className="catPage-addBtn"
          onClick={() => {
            setEditingCategory(null);
            setShowForm(true);
          }}
        >
          Add Category
        </button>
      </div>

      {showForm ? (
        <div className="catPage-formCard">
          <CategoryForm
            category={editingCategory}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditingCategory(null);
              setShowForm(false);
            }}
          />
        </div>
      ) : (
        <div className="catPage-listWrapper">
          <CategoryList
            onEdit={(category) => {
              setEditingCategory(category);
              setShowForm(true);
            }}
          />
        </div>
      )}
    </div>

  );
};

export default CategoriesPage;