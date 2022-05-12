import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6C5DD3',
    },
    secondary: {
      main: '#8F95B2',
    },
    info: {
      main: '#3F8CFF',
    },
    error: {
      main: '#FF754C'
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    text: {
      primary: '#081735',
      secondary: '#8F95B2'
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
      fontSize: '1.875rem',
      fontWeight: '700',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: '700',
    },
    h3: {
      fontSize: '1rem',
      fontWeight: '700',
    },
    h5: {
      fontWeight: '700',
      fontSize: '1.125rem'
    },
    h6: {
      fontWeight: '700',
      fontSize: '0.875rem'
    },
    subtitle1: {
      fontWeight: '300',
      fontSize: '0.75rem',
      color: '#8F95B2'
    },
    subtitle2: {
      fontWeight: '300',
      fontSize: '0.875rem',
      color: '#8F95B2'
    },
    body2: {
      fontWeight: '500',
      fontSize: '0.875rem',
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: '600',
      textTransform: 'none'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRight: 'none !important'
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#8F95B2',
          '&::placeholder': {
            color: '#8F95B2'
          },
        }
      }
    }
  }
});