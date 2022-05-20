import { styled, InputBase } from '@mui/material';

export const Search = styled('div')<{background: string, width: number, height: number}>(({ theme, background, width, height }) => ({
    border: '1px solid #E6E8F0',
    position: 'relative',
    display: 'flex',
    borderRadius: '12px',
    backgroundColor: background,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: `${width}px`,
    height: `${height}px`,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  export const StyledInputBase = styled(InputBase)<{textcolor: string}>(({ theme, color }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      color: color,
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));