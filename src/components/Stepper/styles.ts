import { styled as muiStyled } from '@mui/material';

export const StepWrapper = muiStyled('div')(({ theme }) => ({
    '&:not(:last-child)': {

    }
}))

export const StepConnector = muiStyled('div')<{vertical: boolean}>(({ theme, vertical }) => ({
    ...(vertical ? {
        borderTop: '1px solid #000000',
    } : {
        borderLeft: '1px solid #000000',
    })
}))