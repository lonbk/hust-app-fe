/* Libs */
import React from 'react';
import searchIcon from '../../assets/search.svg';
/* Styles */
import { Search, SearchIconWrapper, StyledInputBase } from './styles';

interface Props {
  width: number;
  height: number;
  textcolor: string;
  background: string;
}

const SearchBox: React.FC<Props> = ({ width, height, textcolor, background }) => {
  return (
    <Search width={width} height={height} background={background}>
      <SearchIconWrapper>
        <img src={searchIcon} alt="Search" />
      </SearchIconWrapper>
      <StyledInputBase
        textcolor={textcolor}
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchBox;
