/* Libs */
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
/* Components */
import StyledBreadcrumps from '../../components/StyledBreadcrumps';
import { useTitleContext } from '../Portal';
/* Styles */
import { PageContainer } from './styles';
/* Types */
import type { LinkType } from '../../components/StyledBreadcrumps';

const Patients: React.FC = () => {
  const handleChangeTitle = useTitleContext();

  const [links, setLinks] = useState<LinkType[]>([
    {
      to: '/patients',
      label: 'Patients',
      active: true,
    },
  ]);

  const handleRemoveCrump = () => {
    setLinks(prev => {
      if(prev[prev.length - 1].active === false) prev.pop();
      return prev
    })
  }

  const handleAddNewCrump = (to: string, label: string) => {
    setLinks((prev) => {
      const updatedCrumps = prev.map((crump) =>
        crump.active === true ? { ...crump, active: false } : crump
      );
      return [
        ...updatedCrumps,
        {
          to: to,
          label: label,
          active: true,
        },
      ];
    });
  };

  useEffect(() => {
    handleRemoveCrump()
  }, [links])

  useEffect(() => {
    handleChangeTitle('Patients')
  }, [])

  return (
    <PageContainer>
      <StyledBreadcrumps links={links} />
      <Outlet context={[links, handleAddNewCrump, handleRemoveCrump]} />
    </PageContainer>
  );
};

export default Patients;
