import React from 'react';

const Alert = ({ alert, onClose }) => {
  if (!alert) return null;

  return (
    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
      {alert.message}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
    </div>
  );
};

export default Alert;