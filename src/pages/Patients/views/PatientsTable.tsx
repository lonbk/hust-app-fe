/* Libs */
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
/* Components */
import editIcon from '../../../assets/edit.svg';
/* Styles */
import { FlexBox, StyledPaper, StyledButton } from '../../../styles';
import { StyledInput } from '../../../styles';
/* Types */
import patients from '../../../data/patients.json';
import { Stage } from '../../../types/data';
interface PatientType {
  id: number;
  fullName: string;
  email: string;
  gender: string;
  disease: string;
  status: string;
  phoneNumber: string;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof PatientType;
  label: string;
  numeric: boolean;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof PatientType
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const checkDiseaseStatus = (status: number) => {
  if (status >= 1 && status <= 5) {
    return {
      stage: Stage.STAGE_1,
      display: 'State 1 (1-5)',
      color: '#6C5DD3',
    };
  } else if (status >= 6 && status <= 10) {
    return {
      stage: Stage.STAGE_2,
      display: 'State 2 (6-10)',
      color: '#FFCE73',
    };
  } else if (status >= 11 && status <= 15) {
    return {
      stage: Stage.STAGE_3,
      display: 'State 3 (11-15)',
      color: '#FF754C',
    };
  } else if (status >= 16 && status <= 20) {
    return {
      stage: Stage.STAGE_4,
      display: 'State 4 (16-20)',
      color: '#C70039',
    };
  } else return { display: 'Invalid status' };
};

const createData = () => {
  let result: PatientType[] = [];
  for (const patient of patients) {
    result.push({
      id: patient.id,
      fullName: `${patient.first_name + patient.last_name}`,
      email: patient.email,
      gender: patient.gender,
      disease:
        patient.disease.charAt(0).toUpperCase() + patient.disease.slice(1),
      status: JSON.stringify(checkDiseaseStatus(patient.status)),
      phoneNumber: patient.phone_number,
    });
  }
  return result;
};

const rows = createData();

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells: readonly HeadCell[] = [
  {
    id: 'fullName',
    numeric: false,
    disablePadding: false,
    label: 'Patient Name',
  },
  {
    id: 'gender',
    numeric: true,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'disease',
    numeric: true,
    disablePadding: false,
    label: 'Disease',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'phoneNumber',
    numeric: true,
    disablePadding: false,
    label: 'Phone number',
  },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof PatientType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ backgroundColor: '#F9FAFC', height: '70px' }}>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all patients',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                variant='h6'
                component='div'
                sx={{ color: '#8F95B2' }}
              >
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;
  const [gender, setGender] = React.useState<string>('Male');

  const handleChangeGender = (gender: string) => {
    setGender(gender);
  };

  return (
    <Toolbar sx={{ padding: '21px 20px' }}>
      <Box
        sx={{
          flexGrow: 1.7,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Typography variant='body2' component='div'>
          Patient Name
        </Typography>
        <StyledInput placeholder='Enter the name' />
      </Box>
      <Box
        sx={{
          flexGrow: 1.5,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Typography variant='body2' component='div'>
          Gender
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 120, marginLeft: '30px' }}>
          <Select
            sx={{
              borderRadius: '8px',
              height: '38px',
              color: 'text.secondary',
            }}
            value={gender}
            onChange={(e) => handleChangeGender(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            placeholder='Select'
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <StyledButton
          borderRadius='8px'
          width='93px'
          height='39px'
          variant='contained'
          sx={{ marginLeft: '37px' }}
        >
          Query
        </StyledButton>
        <StyledButton
          borderRadius='8px'
          width='93px'
          height='39px'
          variant='outlined'
          sx={{ marginLeft: '37px' }}
        >
          Reset
        </StyledButton>
        <StyledButton
          borderRadius='8px'
          width='93px'
          height='39px'
          variant='text'
          sx={{ marginLeft: '37px' }}
        >
          Add new
        </StyledButton>
      </Box>
    </Toolbar>
  );
};

export const PatientsTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof PatientType>('fullName');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PatientType
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.fullName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <StyledPaper borderRadius='16px' sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.fullName);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.fullName)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.fullName}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='normal'
                      >
                        <FlexBox
                          column={true}
                          justify='center'
                          align='flex-start'
                        >
                          <Typography variant='h6' component='div'>
                            {row.fullName}
                          </Typography>
                          <Typography variant='subtitle1' component='div'>
                            {row.email}
                          </Typography>
                        </FlexBox>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h6' component='div'>
                          {row.gender}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='body2' component='div'>
                          {row.disease}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <FlexBox
                          column={false}
                          justify='flex-start'
                          align='center'
                        >
                          <div
                            style={{
                              width: '8px',
                              height: '8px',
                              backgroundColor: `${
                                JSON.parse(row.status).color
                              }`,
                              borderRadius: '50%',
                              marginRight: '5px'
                            }}
                          />
                          <Typography variant='body2' component='div'>
                            {JSON.parse(row.status).display}
                          </Typography>
                        </FlexBox>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='body2' component='div'>
                          {row.phoneNumber}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <StyledButton
                          width="93px"
                          height="38px"
                          borderRadius="8px"
                          to={`patient/${row.id}`}
                          component={Link}
                          variant='outlined'
                          startIcon={<img src={editIcon} alt='Edit' />}
                        >
                          Edit
                        </StyledButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
    </Box>
  );
};
