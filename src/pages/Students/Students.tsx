/* Libs */
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
/* Components */
import { useTitleContext } from '../Portal';
/* Styles */
import { PageContainer } from './styles';
/* Types */
import students from '../../data/students.json';
import type {StudentData} from '../../types/data';

const Teachers: React.FC = () => {
  const handleChangeTitle = useTitleContext();

  const [selectedStudent, setSelectedStudent] = React.useState<StudentData>();

  const handleSetSelected = (id: number) => {
    setSelectedStudent(() => {
      const selected = students.find(student => student.id === id)

      return selected
    })
  }

  useEffect(() => {
    handleChangeTitle('Sinh viên')
  }, []) 

  return (
    <PageContainer>
      <Outlet context={[selectedStudent, handleSetSelected]}/>
    </PageContainer>
  );
};

export default Teachers;
