/* Libs */
import * as React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Box,
  Checkbox,
  FormControl,
  IconButton,
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
import deleteIcon from '../../../assets/delete.svg';
/* Styles */
import { FlexBox, StyledPaper, StyledButton } from '../../../styles';
import { StyledInput } from '../../../styles';
/* Types */
import students from '../../../data/students.json';
import { Stage } from '../../../types/data';
export interface StudentType {
  id: number;
  fullName: string; 
  email: string;
  gender: string;
  class: string;
  status: string;
  mssv: string;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof StudentType;
  label: string;
  numeric: boolean;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  handleNameSearch: (studentName: string) => void;
  handleGenderSearch: (studentGender: string) => void;
}

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof StudentType
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const checkDiseaseStatus = (status: number) => {
  if (status >= 0 && status <= 7) {
    return {
      stage: Stage.STAGE_1,
      display: 'M0',
      color: '#6C5DD3',
    };
  } else if (status >= 8 && status <= 15) {
    return {
      stage: Stage.STAGE_2,
      display: 'M1',
      color: '#FFCE73',
    };
  } else if (status >= 16 && status <= 26) {
    return {
      stage: Stage.STAGE_3,
      display: 'M2',
      color: '#FF754C',
    };
  } else if (status >= 27) {
    return {
      stage: Stage.STAGE_4,
      display: 'M3',
      color: '#C70039',
    };
  } else return { display: 'Invalid status' };
};

const createData = () => {
  let result: StudentType[] = [];
  for (const student of students) {
    result.push({
      id: student.id,
      fullName: `${student.full_name}`,
      email: student.email,
      gender: student.gender,
      class: student.class.charAt(0).toUpperCase() + student.class.slice(1),
      status: JSON.stringify(checkDiseaseStatus(student.status)),
      mssv: student.mssv,
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
    label: 'Tên sinh viên',
  },
  {
    id: 'gender',
    numeric: true,
    disablePadding: false,
    label: 'Giới tính',
  },
  {
    id: 'class',
    numeric: true,
    disablePadding: false,
    label: 'Lớp',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Mức cảnh cáo',
  },
  {
    id: 'mssv',
    numeric: true,
    disablePadding: false,
    label: 'MSSV',
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
    (property: keyof StudentType) => (event: React.MouseEvent<unknown>) => {
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
              'aria-label': 'select all students',
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
  const [gender, setGender] = React.useState<string>('Khác');

  const handleChangeGender = (gender: string) => {
    setGender(gender);
    props.handleGenderSearch(gender);
    console.log('gender', gender)
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
          Tên sinh viên
        </Typography>
        <StyledInput onChange={(event) => props.handleNameSearch(event.target.value)} placeholder='Nhập tên sinh viên...' />
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
          Giới tính
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
            <MenuItem value='Khác'>
              <em>Khác</em>
            </MenuItem>
            <MenuItem value='Nam'>Nam</MenuItem>
            <MenuItem value='Nữ'>Nữ</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Toolbar>
  );
};

export const StudentsTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof StudentType>('fullName');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [students, setStudents] = React.useState(rows);

  const [selectedStudent, handleSetSelected] = useOutletContext<any>();

  const handleDelete = (id: number) => {
    setStudents((prevStudents) => prevStudents.filter(student => student.id !== id))
  }

  const handleStudentSearch = (studentName: string) => {
    setStudents(() => rows.filter(student => student.fullName.includes(studentName)))
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof StudentType
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = students.map((row) => row.fullName);
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

  const handleStudentGenderSearch = (gender: string) => {
    setStudents(rows.filter(student => student.gender === gender))
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <StyledPaper borderRadius='16px' sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar handleGenderSearch={handleStudentGenderSearch} handleNameSearch={handleStudentSearch} numSelected={selected.length} />
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
              rowCount={students.length}
            />
            <TableBody>
              {stableSort(students, getComparator(order, orderBy))
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
                      key={row.id}
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
                          {row.class}
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
                          {row.mssv}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <StyledButton
                          width="93px"
                          height="38px"
                          borderRadius="8px"
                          to={`student/${row.id}`}
                          component={Link}
                          variant='outlined'
                          onClick={() => handleSetSelected(row.id)}
                          // startIcon={<img src={editIcon} alt='Edit' />}
                        > 
                          Chi tiết
                        </StyledButton>
                        <IconButton onClick={() => handleDelete(row.id)}>
                            <img src={deleteIcon} alt='delete' />
                        </IconButton>
                                               
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
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledPaper>
    </Box>
  );
};
