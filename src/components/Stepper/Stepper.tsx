/* Libs */
import React from 'react';
/* Styles */
import { FlexBox } from '../../styles';

interface Props {
    vertical?: boolean;
}

export const Stepper: React.FC<Props> = ({ vertical, children }) => {

    return (
        <FlexBox 
            column={vertical ? true : false} 
            justify={vertical ? 'center' : 'space-between'}
            align={vertical ? 'space-between' : 'center'}
        >
            {children}
        </FlexBox>
    )
}

Stepper.defaultProps = {
    vertical: true
}