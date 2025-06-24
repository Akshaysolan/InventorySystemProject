import { useState } from 'react';

const useInventory = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 5000);
  };

  return {
    alert,
    setAlert: showAlert
  };
};

export default useInventory;