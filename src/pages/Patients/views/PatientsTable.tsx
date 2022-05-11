/* Libs */
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Paper, Grid, Typography, InputBaseProps } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
/* Styles */
import { StyledText, StyledInput } from '../styles';
/* Utils */
import data from '../../../data.json';

interface Patient {
  id: number;
  patientName: string;
  gender: string;
  dateOfBirth: string;
  disease: string;
  status: string;
  phoneNumber: string;
  email: string;
}

enum StatusMessage {
  STAGE_1 = 'Stage 1(1-5)',
  STAGE_2 = 'Stage 2(6-10)',
  STAGE_3 = 'Stage 3(11-15)',
  STAGE_4 = 'Stage 4(16-20)',
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'patientName', headerName: 'Patient Name', width: 200 },
  { field: 'gender', headerName: 'Gender', width: 100 },
  { field: 'dateOfBirth', headerName: 'DoB', width: 150 },
  { field: 'disease', headerName: 'Disease', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'phoneNumber', headerName: 'Phone number', width: 150 },
  { field: 'email', headerName: 'Email', width: 300 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const formattedPatients = data.map((patient) => {
  const patientStatus = () => {
    if (patient.status >= 1 && patient.status <= 5)
      return StatusMessage.STAGE_1;
    else if (patient.status >= 6 && patient.status <= 10)
      return StatusMessage.STAGE_2;
    else if (patient.status >= 11 && patient.status <= 15)
      return StatusMessage.STAGE_3;
    else if (patient.status >= 16 && patient.status <= 20)
      return StatusMessage.STAGE_4;
    else return 'Invalid status';
  };

  return {
    id: patient.id,
    patientName: `${patient.first_name} ${patient.last_name}`,
    gender: patient.gender,
    dateOfBirth: patient.date_of_birth,
    disease: patient.disease,
    status: patientStatus(),
    phoneNumber: patient.phone_number,
    email: patient.email,
  };
});

export const PatientsTable: React.FC = () => {
  const inputAttrs: InputBaseProps = {
    fullWidth: true,
  }

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <Grid container spacing={2} sx={{ margin: '21px 10px 30px 10px' }}>
        <Grid item xs={false} md={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}>
          <StyledText>Patient Name</StyledText>
        </Grid>
        <Grid item xs={false} md={3}>
          <StyledInput {...inputAttrs} placeholder="Enter the name"/>
        </Grid>
        <Grid item xs={false} md={1}>
          <StyledText>Gender</StyledText>
        </Grid>
        <Grid item xs={false} md={3}>
          <StyledText>Gender</StyledText>
        </Grid>
        <Grid item xs={false} md={4}>

        </Grid>
      </Grid>
      <DataGrid
        rows={formattedPatients}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </Paper>
  );
};
