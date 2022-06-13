/* Libs */
import * as React from 'react';
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
  Tooltip,
  Typography,
  Modal,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { visuallyHidden } from '@mui/utils';
/* Components */
import Schedule from './components/Schedule';
/* Styles */
import {
  FlexBox,
  StyledPaper,
  StyledButton,
  StyledInput,
} from '../../styles';
/* Types */
import doctors from '../../data/doctors.json';
import { DoctorData } from '../../types/data';

export interface DoctorType {
  id: number;
  fullName: string;
  email: string;
  gender: string;
  department: string;
  cirtificate: string;
  phoneNumber: string;
  age: string;
  birthDate: string;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof DoctorType;
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
    property: keyof DoctorType
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

const createData = () => {
  const result: DoctorType[] = [];
  for (const doctor of doctors) {
    result.push({
      id: doctor.id,
      fullName: doctor.full_name,
      email: doctor.email,
      gender: doctor.gender,
      phoneNumber: doctor.phone_number,
      department: doctor.department,
      cirtificate: doctor.cirtificate,
      age: doctor.age,
      birthDate: doctor.birth_date,
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
    label: 'Doctor Name',
  },
  {
    id: 'gender',
    numeric: true,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'birthDate',
    numeric: true,
    disablePadding: false,
    label: 'Date of Birth',
  },
  {
    id: 'phoneNumber',
    numeric: true,
    disablePadding: false,
    label: 'Phone number',
  },
  {
    id: 'department',
    numeric: true,
    disablePadding: false,
    label: 'Department',
  },
  {
    id: 'cirtificate',
    numeric: true,
    disablePadding: false,
    label: 'Cirtificate',
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
    (property: keyof DoctorType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ backgroundColor: '#F9FAFC', height: '70px' }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ color: '#8F95B2' }}
              >
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
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
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" component="div">
          Doctor name
        </Typography>
        <StyledInput
          sx={{ m: 1, width: '60%', marginLeft: '30px' }}
          placeholder="Enter the name"
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" component="div">
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
            // hiddenLabel
            label={null}
            inputProps={{ 'aria-label': 'Without label' }}
            placeholder="Select"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Toolbar>
  );
};

export const DoctorContext = React.createContext<{doctor?: DoctorData}>({ doctor: undefined });

const Doctors: React.FC = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof DoctorType>('fullName');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [visibleBookingForm, setVisibleBookingForm] = React.useState<boolean>(false);
  const [selectedDoctor, setSelectedDoctor] = React.useState<DoctorData>();

  const handleOnClick = (doctorId: number) => {
    setSelectedDoctor(() => doctors.find((doctor: DoctorData) => doctor.id === doctorId));
    setVisibleBookingForm(true);
  };

  const handleClose = () => {
    setVisibleBookingForm(false);
  }

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof DoctorType
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
    // const selectedIndex = selected.indexOf(name);
    // let newSelected: readonly string[] = [];
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    // setSelected(newSelected);
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
      <EnhancedTableToolbar
        numSelected={selected.length}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
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
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.fullName}
                    selected={isItemSelected}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      <FlexBox
                        column={true}
                        justify="center"
                        align="flex-start"
                      >
                        <Typography variant="h6" component="div">
                          {row.fullName}
                        </Typography>
                        <Typography variant="subtitle1" component="div">
                          {row.email}
                        </Typography>
                      </FlexBox>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="h6" component="div">
                        {row.gender}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body2" component="div">
                        {row.birthDate}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body2" component="div">
                        {row.phoneNumber}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body2" component="div">
                        {row.department}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body2" component="div">
                        {row.cirtificate}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        onClick={() => handleOnClick(row.id)}
                      >
                        Check schedule
                      </Button>
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
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <DoctorContext.Provider value={{ doctor: selectedDoctor }}>
       {visibleBookingForm && <Schedule open={visibleBookingForm} onClose={handleClose} />}
      </DoctorContext.Provider>
    </Box>
  );
};

export default Doctors;
