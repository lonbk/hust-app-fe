/* Libs */
import axios from 'axios';
import type { AxiosInstance } from 'axios';
/* Redux */
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectUser } from '../features/user/userSelector';

export interface BaseArgument {
  axiosInstance: {
      instance: AxiosInstance;
      config: {
          headers: {
              Authorization: string
          }
      }
  }
}

export const useAxiosInstance = () => {
    const { auth } = useAppSelector(selectUser);
    
    const instance = axios.create({
      baseURL: `https://questionare01.herokuapp.com`,
      timeout: 15000,
    })

    const config = {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      }
    }

    if(!auth.accessToken) return undefined
    
    return { config, instance }
}

