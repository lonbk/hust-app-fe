import { styled as muiStyled } from '@mui/material';
import {
  Avatar,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  TableCell,
  TableRow
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
/* Types */
import { Levels } from '../../types/levels';

interface StepIconProps {
  connect?: boolean;
  level: Levels;
}

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
}))

export const InfoListItem = muiStyled(ListItem)(({ theme }) => ({
  margin: '3px 0'
}))

export const InfoListHeader = muiStyled(ListSubheader)(({ theme }) => ({
  margin: 0,
  marginBottom: '5px',
}))

export const InfoListItemIcon = muiStyled(ListItemIcon)(({ theme }) => ({
  marginRight: '11px',
  padding: 0,
  minWidth: '24px'
}))

export const InfoListItemText = muiStyled(ListItemText)(({ theme }) => ({
  color: theme.palette.info.main
}))
const detectColor = (level: Levels) => {
  switch (level) {
    case Levels.LEVEL_1:
      return '#970A0A'
    case Levels.LEVEL_2:
      return '#EE4B2B'
    case Levels.LEVEL_3:
      return '#50C878'
    case Levels.LEVEL_4:
      return '#6495ED'
    case Levels.LEVEL_5:
      return '#00008B'
    default:
      return '#FFFFFF'
  }
}

export const StepIcon = muiStyled('div')<StepIconProps>(
  ({ theme, level, connect }) => {
    const styleObj: any = {
      margin: '5px 15px 0 0',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: detectColor(level),
      position: 'relative',
      zIndex: 7000,
    }
    if(connect) styleObj['&:not(:last-child)'] = {
      ':after': {
        content: '" "',
        display: 'block',
        height: '55px',
        borderLeft: `1px solid ${detectColor(level)}`,
        position: 'absolute',
        bottom: '-50px',
        left: '50%',
        transform: 'translate(-50%)',
        zIndex: 7000
      }
    }
    return styleObj
  }
)

export const StyledTableCell = muiStyled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
