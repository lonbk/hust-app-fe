/* Libs */
import React from 'react';
/* Types */
interface Props {
  isActive: boolean;
  src: string | undefined;
}

const MenuIcon: React.FC<Props> = ({ src, isActive }) => {

  return (
    <img
      src={src}
      alt='icon'
      style={{ filter: isActive ? 'invert(1) brightness(100)' : 'none' }}
    />
  );
};

export default MenuIcon;
