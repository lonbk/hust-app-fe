import { styled as muiStyled } from '@mui/material';
import { TextField, IconButton } from '@mui/material';
import { StyledText } from '../../../../styles';

export const StyledTextField = muiStyled(TextField)(({ theme }) => ({
    width: '100%',
    borderWidth: 0,
    borderColor: 'transparent'
}))

export const SendButton = muiStyled(IconButton)(({ theme }) => ({
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgb(75, 65, 147)'
    }
}))

export const Inbox = muiStyled('div')<{margin: number | undefined}>(({ theme, margin }) => ({
    width: '100%',
    height: `calc(100% - ${margin}px)`,
    borderTop: `1px solid ${theme.palette.primary.main}`,
    overflowY: 'scroll',
    marginBottom: '8px'
}))

export const ChatWrapper = muiStyled('div')(({ theme }) => ({
  width: '100%',
  height: 'calc(100% - 100px)',
  // margin: '8px 0',
  borderRadius: '16px',
  backgroundColor: '#ffffff'
}))

export const TextInput = muiStyled(StyledText)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '8px',
  position: 'relative',
  padding: '8px 6px',
  width: '100%',
  overflow: 'hidden',
  resize: 'none',
  minHeight: '40px',
  lineHeight: '20px',
  overflowWrap: 'break-word',
  userSelect: 'text',
  outline: 'none',
  whiteSpace: 'pre-wrap',
  direction: 'ltr',
  cursor: 'text',
  display: 'inline-block',
  '&:empty::before': {
    content: '"Soạn tin nhắn..."',
    color: theme.palette.secondary.main
  }
}))
