import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6C5DD3',
    },
    secondary: {
      main: green[500],
    }, 
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    text: {
      primary: '#081735'
    }
  },
  typography: { 
    fontFamily: [
      'Nunito',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),  
    h1: {
      fontSize: '1.5rem',
      fontWeight: '700',
    },
    h5: {
      fontWeight: '700',
      fontSize: '1.125rem'
    },
    subtitle1: {
      fontWeight: '300',
      fontSize: '0.75rem',
      color: '#8F95B2'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRight: 'none !important'
        }
      }
    }
  }
});