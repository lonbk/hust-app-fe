import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const MyNavLink = React.forwardRef<any, any>((props, ref) => {
  const location = useLocation();

  const isActive = location.pathname === props.to ? true : false;

  const activeStyle = {
    backgroundColor: '#f2f3f2'
  }

  // const isActive =

  return (
    <NavLink
      ref={ref}
      to={props.to}
      className={props.className}
      style={isActive ? {...props.style, ...activeStyle} : undefined }
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