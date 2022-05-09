/* Libs */
import React from 'react';
/* Components */
import { DrawerHeader } from '../Header/DrawerHeader';
import toggleLeftIcon from '../../assets/toggle-left.svg';
import toggleRightIcon from '../../assets/toggle-right.svg';
/* Styles */
import { MainBox, ContentContainer, ToggleMenuButton } from './styles';
/* Types */
type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const Content: React.FC<Props> = ({ isOpen, onOpen, onClose, children }) => {
  return (
    <MainBox component='main' sx={{ flexGrow: 1, p: 0 }}>
      <DrawerHeader />
      <ContentContainer>
        {children}
        <ToggleMenuButton
          isOpen={isOpen}
          color='inherit'
          aria-label='open drawer'
          onClick={isOpen ? onClose : onOpen}
          edge='start'
        >
            <img src={isOpen ? toggleLeftIcon : toggleRightIcon} alt="toggle" />
        </ToggleMenuButton>
      </ContentContainer>
    </MainBox>
  );
};

export default Content;
