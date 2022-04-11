import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MyNavLink = React.forwardRef<any, any>((props, ref) => (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
    >
      {props.children}
    </NavLink>
  ));
const StyledNavLink = styled(MyNavLink)`
  text-decoration: none;
  color: #000000;
`
export default StyledNavLink;