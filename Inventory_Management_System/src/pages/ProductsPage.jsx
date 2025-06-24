import React, { useState, useEffect } from 'react';
import useInventory from '../hooks/UseInventory';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import { createProduct, updateProduct, getProducts } from '../services/api';
import "../css/products.css";

const ProductsPage = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const { setAlert } = useInventory();

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setAlert('Failed to load products', 'danger');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        setAlert('Product updated successfully', 'success');
      } else {
        await createProduct(productData);
        setAlert('Product added successfully', 'success');
      }

      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setAlert(err.message, 'danger');
    }
  };

  return (
    <div className="ProductPage-wrapper">
      <div className="ProductPage-header">
        <h2 className="ProductPage-title">Products</h2>
        <button
          className="ProductPage-add-btn"
          onClick={() => {
            setEditingProduct(null);
            setShowForm(true);
          }}
        >
          Add Product
        </button>
      </div>

      {showForm ? (
        <div className="card mb-4">
          <div className="card-body">
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setEditingProduct(null);
                setShowForm(false);
              }}
            />
          </div>
        </div>
      ) : (
        <ProductList 
          onEdit={(product) => {
            setEditingProduct(product);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;
