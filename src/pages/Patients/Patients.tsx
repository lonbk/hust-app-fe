/* Libs */
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
/* Components */
import { useTitleContext } from '../Portal';
/* Styles */
import { PageContainer } from './styles';
/* Types */

const Patients: React.FC = () => {
  const handleChangeTitle = useTitleContext();

  useEffect(() => {
    handleChangeTitle('Patients')
  }, [])

  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
};

export default Patients;
