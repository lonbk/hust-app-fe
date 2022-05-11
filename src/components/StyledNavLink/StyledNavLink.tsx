import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { theme } from '../../theme';

const MyNavLink = React.forwardRef<any, any>((props, ref) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState<boolean>(false); 

  useEffect(() => {
    if(location.pathname.includes(props.to)) setIsActive(true);
    else setIsActive(false);
  }, [location.pathname, props.to])

  return (
    <NavLink
      ref={ref}
      to={props.to}
      className={props.className}
      style={ props.defaultActiveStyle ? { color: theme.palette[isActive ? 'primary' : 'secondary'].main } : undefined }
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