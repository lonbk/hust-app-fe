import { styled as muiStyled } from '@mui/material';
import { Avatar, Button } from '@mui/material';

export const BackgroundImage = muiStyled('img')<{src: string}>(({ theme }) => ({
    borderRadius: '16px',
    width: '990px',
    height: '97px', 
}))

export const PatientAvatar = muiStyled(Avatar)(({ theme }) => ({
    position: 'absolute',
    bottom: '-20%',
    left: '50%',
    transform: 'translate(-50%, 20%)',
    width: '92px',
    height: '92px',
    border: '2px solid #FFFFFF'
}))

