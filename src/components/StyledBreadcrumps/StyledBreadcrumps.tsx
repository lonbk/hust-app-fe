/* Libs */
import React from 'react';
import { Breadcrumbs, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
/* Styles */
import { StyledLink } from './styles';

export interface LinkType {
  to: string;
  label: string;
  active: boolean;
}

interface Props {
  links: LinkType[];
}

const StyledBreadcrumps: React.FC<Props> = ({ links }) => {

  return (
    <Breadcrumbs aria-label='breadcrumb'  separator={<NavigateNextIcon fontSize="small" />} sx={{ margin: '10px 0' }}>
      {links.map((link) => {
        return (
          <Typography
            key={link.to}
            {...(link.active ? null : { to: link.to })}
            variant={link.active ? 'body2' : 'h5'}
            component={link.active ? 'div' : StyledLink}
          >
            {link.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default StyledBreadcrumps;
