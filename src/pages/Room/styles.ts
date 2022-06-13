import { styled as muiStyled } from '@mui/material';
import { InputBase, ListItem } from '@mui/material';

interface VideoWrapperProps {
    local?: boolean;
}

export const UserNameWrapper = muiStyled('div')(({ theme }) => ({
    backgroundColor: "#000000",
    padding: '5px',
    opacity: '0.5',
    borderRadius: '8px',
    position: 'absolute',
    top: '5px',
    left: '5px'
}))

export const InputMessage = muiStyled(InputBase)(({ theme }) => ({

}))

export const ChatInbox = muiStyled('div')(({ theme }) => ({
    height: '60%',
    overflow: 'hidden',
}))

export const Message = muiStyled('div')(({ theme }) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    padding: '10px',
    width: '100%',
    height: '80%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginBottom: '5px',
}))


export const VideoWrapper = muiStyled('div')<VideoWrapperProps>(({ theme, local }) => ({
    width: local ? '200px' : '100%',
    aspectRatio: '16 / 9',
    ...(local ? {
        position: 'absolute',
        bottom: '15px',
        right: '15px'
    } : { position: 'relative' })

}))

export const VideoBackground = muiStyled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: '8px',
    backgroundColor: 'black',
    border: `2px solid ${theme.palette.secondary.main}`
}))
