import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import useInventory from '../hooks/UseInventory';
import Alert from './Alerts';
import '../css/products.css'; 

const ProductList = ({ onEdit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setAlert } = useInventory();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((product) => product.id !== id));
        setAlert('Product deleted successfully', 'success');
      } catch (err) {
        setAlert(err.message, 'danger');
      }
    }
  };

  if (loading) return <div className="ProductPage-loading">Loading...</div>;
  if (error) return <div className="ProductPage-error">Error: {error}</div>;

  return (
    <div className="ProductCard-wrapper">
      {products.map((product) => (
        <div key={product.id} className="ProductCard-card">
          <h3 className="ProductCard-title">{product.name}</h3>
          <p className="ProductCard-info"><strong>Category:</strong> {product.category?.name || 'N/A'}</p>
          <p className="ProductCard-info"><strong>Price:</strong> ₹{product.price.toFixed(2)}</p>
          <p className="ProductCard-info"><strong>Quantity:</strong> {product.quantity}</p>
          <div className="ProductCard-actions">
            <button className="ProductCard-btn edit" onClick={() => onEdit(product)}>Edit</button>
            <button className="ProductCard-btn delete" onClick={() => handleDelete(product.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
