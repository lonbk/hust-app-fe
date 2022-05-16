/* Libs */
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
/* Styles */
import { StyledTableCell, StyledTableRow, StepIcon } from '../styles';
import { FlexBox } from '../../../styles';
/* Types */
import { statsLevel } from '../../../types/levels';

export const StyledTable: React.FC = () => {
  const [rows] = React.useState(statsLevel);

  return (
      <Table sx={{ minWidth: '100%' }} aria-label='customized table'>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.level}>
              <StyledTableCell component='th' scope='row'>
                  <FlexBox column={false} justify="flex-start" align="center">
                      <StepIcon level={row.level} />
                    <Typography variant='body2' component='div'>
                        {row.level}
                    </Typography>
                  </FlexBox>
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Typography variant='subtitle2' component='div'>
                  {row.range}
                </Typography>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
  );
};
