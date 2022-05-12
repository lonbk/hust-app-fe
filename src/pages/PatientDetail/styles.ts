import { styled as muiStyled } from '@mui/material';
import {
    Avatar, Paper,
    Typography,
    Grid,
    IconButton,
    List,
    ListSubheader,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

export const BackgroundImage = muiStyled('img')<{ src: string }>(({ theme }) => ({
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

export const InfoList = muiStyled(List)(({ theme }) => ({
    width: '100%',
    background: theme.palette.background.paper,
    '& ul': {
        padding: 0
    },
    '& li': {
        padding: 0
    },
    padding: '14px 24px 50px 24px',
}))

export const InfoListHeader = muiStyled(ListSubheader)(({ theme }) => ({
    margin: 0
}))