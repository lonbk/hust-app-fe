import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MyNavLink = React.forwardRef<any, any>((props, ref) => {
  const activeStyle = {
    backgroundColor: '#f2f3f2'
  }

  return (
    <NavLink
      ref={ref}
      to={props.to}
      className={({ isActive }) => `${props.className} ${isActive ? props.activeClassName : ''}`}
      style={({ isActive }) => isActive ? {...props.style, ...activeStyle} : undefined }
    >
      {props.children}
    </NavLink>
  );
})
const StyledNavLink = styled(MyNavLink)`
  text-decoration: none;
  color: #000000;
`
export default StyledNavLink;