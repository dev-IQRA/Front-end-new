import React from 'react';
import { Outlet } from 'react-router-dom';

const Academic = () => {
  return (
    <div>
      <h1>Academic Page</h1>
      <Outlet />
    </div>
  );
};

export default Academic;