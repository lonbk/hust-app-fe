/* Libs */
import React from 'react';
import searchIcon from '../../assets/search.svg';
/* Styles */
import { Search, SearchIconWrapper, StyledInputBase } from './styles';

const SearchBox: React.FC = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <img src={searchIcon} alt="Search" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchBox;
