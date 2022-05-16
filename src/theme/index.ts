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
      fontSize: '1.875rem', //30px
      fontWeight: '700',
      lineHeight: '1.375rem'
    },
    h2: {
      fontSize: '1.5rem', //24px
      fontWeight: '700',
      lineHeight: '2rem'
    },
    h3: {
      fontSize: '1rem', //16px
      fontWeight: '700',
      lineHeight: '1.5rem'
    },
    h4: {
      fontSize: '0.75rem', //12px
      fontWeight: '700',
      lineHeight: '1.25rem'
    },
    h5: {
      fontWeight: '700',
      fontSize: '1.125rem', //18px
      lineHeight: '1.125rem'
    },
    h6: {
      fontWeight: '700',
      fontSize: '0.875rem', //14px
      lineHeight: '1.375rem'
    },
    subtitle1: {
      fontWeight: '300',
      fontSize: '0.75rem',
      lineHeight: '1.25rem',
      color: '#8F95B2'
    },
    subtitle2: {
      fontWeight: '300',
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
      color: '#8F95B2'
    },
    body2: {
      fontWeight: '500',
      fontSize: '0.875rem',
      lineHeight: '1.175rem'
    },
    button: {
      fontSize: '0.875rem',
      lineHeight: '1.375rem',
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