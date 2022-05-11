/* Libs */
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
/* Styles */
import { PageContainer } from './styles';

const Patients: React.FC = () => {

  return (
    <PageContainer>
      <Link to="patient">Detail</Link>
      <Outlet />
    </PageContainer>
  );
};

export default Patients;
