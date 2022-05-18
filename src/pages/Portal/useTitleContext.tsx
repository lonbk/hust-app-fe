/* Libs */
import { useContext } from 'react';
import { TitleContext } from './Portal';

export const useTitleContext = () => {
    const [handleChangeTitle] = useContext(TitleContext);
    
    return handleChangeTitle
}
