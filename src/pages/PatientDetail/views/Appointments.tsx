/* Libs */
import * as React from 'react';
import {
  Box,
  IconButton,
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
import SearchBox from '../../../components/SearchBox';
import { RangeSelection } from '../../../components/DateTimePicker';
import editIcon from '../../../assets/appointment/edit.svg';
import deleteIcon from '../../../assets/appointment/delete.svg';
import actionDotsIcon from '../../../assets/actionDots.svg';
/* Styles */
import {
  FlexBox,
  StyledPaper,
  StyledButton,
} from '../../../styles';
import { AppointmentStatusTag } from '../styles';
/* Types */
import appointments from '../../../data/appointments.json';
import { AppointmentStatus } from '../../../types/data';
interface AppointmentType {
  id: number;
  doctorName: string;
  title: string;
  time: string;
  prescription: string;
  date: string;
  createdAt: string;
  status: AppointmentStatus;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof AppointmentType;
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
    property: keyof AppointmentType
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const createData = () => {
  let result: AppointmentType[] = [];
  for (const appointment of appointments) {
    result.push({
      id: appointment.id,
      doctorName: appointment.doctor_name,
      title: `Meeting Dr.${appointment.doctor_name}`,
      prescription: 'View here',
      time: appointment.time,
      date: appointment.date,
      createdAt: appointment.created_at,
      status: appointment.status as unknown as AppointmentStatus,
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
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Title',
  },
  {
    id: 'time',
    numeric: true,
    disablePadding: false,
    label: 'Time',
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'prescription',
    numeric: false,
    disablePadding: false,
    label: 'Prescription',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
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
    (property: keyof AppointmentType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ height: '70px' }}>
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
        <RangeSelection
          selections={[
            {
              range: 'Prev',
              active: false,
            },
            {
              range: 'All',
              active: true,
            },
            {
              range: 'Next',
              active: false,
            },
          ]}
        />
      </Box>
      
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <SearchBox width={325} height={48} textcolor="#D8DAE5" background="#ffffff" />
      </Box>
    </Toolbar>
  );
};

export const Appointments = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] =
    React.useState<keyof AppointmentType>('doctorName');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof AppointmentType
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.doctorName);
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
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <StyledPaper borderRadius='16px' sx={{ width: '100%', mb: 2, px: 2 }}>
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
                  const isItemSelected = isSelected(row.doctorName);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.doctorName)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.doctorName}
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
                            {row.title}
                          </Typography>
                          <Typography variant='subtitle1' component='div'>
                            {row.createdAt}
                          </Typography>
                        </FlexBox>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h6' component='div'>
                          {row.time}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography variant='h6' component='div'>
                          {row.date}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography
                          variant='h6'
                          component='div'
                          sx={{ color: '#4A5CD0' }}
                        >
                          {row.prescription}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <AppointmentStatusTag status={row.status}>
                          <Typography variant='h6' component='div'>
                            {row.status}
                          </Typography>
                        </AppointmentStatusTag>
                      </TableCell>
                      <TableCell align='left'>
                        <FlexBox
                          column={false}
                          justify='flex-start'
                          align='center'
                        >
                          <IconButton>
                            <img src={editIcon} alt='edit' />
                          </IconButton>
                          <IconButton>
                            <img src={deleteIcon} alt='delete' />
                          </IconButton>
                          <IconButton sx={{ transform: 'rotate(90deg)' }}>
                            <img
                              src={actionDotsIcon}
                              alt='action'
                              style={{ width: '16px', height: '16px' }}
                            />
                          </IconButton>
                        </FlexBox>
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
