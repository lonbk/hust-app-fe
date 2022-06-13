import { styled as muiStyled } from '@mui/material';

export const MessageWrapper = muiStyled('div')<{ isOwnMessage: boolean }>(({ theme, isOwnMessage }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: isOwnMessage ? "flex-end" : "flex-start",
    padding: '5px 10px'
}))

export const MessageAuthor = muiStyled('div')(({ theme }) => ({
    fontSize: '10px',
    color: theme.palette.text.secondary
}))

export const MessageContainer = muiStyled('div')<{ isOwnMessage: boolean }>(({ theme, isOwnMessage }) => ({
    maxWidth: "75%",
    minHeight: "40px",
    borderRadius: "8px",
    padding: 16,
    color: isOwnMessage ? "#FFFFFF" : theme.palette.text.secondary,
    fontSize: 12,
    backgroundColor: isOwnMessage ? theme.palette.primary.main : "#F9FAFC",
}))

export const MessageTimeStamp = muiStyled('div')<{isOwnMessage: boolean}>(({ theme, isOwnMessage }) => ({
    fontSize: '8px',
    color: isOwnMessage ? '#FFFFFF' : theme.palette.text.secondary,
    textAlign: "right",
    paddingTop: 4
}))

export const MessageBody = muiStyled('div')(({ theme }) => ({
  maxWidth: '100%',
  textAlign: 'justify',
  wordWrap: 'break-word'
}))

