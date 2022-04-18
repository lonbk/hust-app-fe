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


// const instance = axios.create({
//     baseURL: `http://137.184.207.13:5000/v1`,
//     timeout: 10000,
//   });
  
//   instance.interceptors.response.use(
//     (response) => {
//       // Any status code that lie within the range of 2xx cause this function to trigger
//       // Do something with response data
//       console.log('res', response)
  
//       return response;
//     },
//     (error) => {
//       console.dir(error)
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       // Do something with response error
//       if(error.response.status === 401) {
//         console.log('tokens', refreshToken)
//         console.log('ids', deviceIdFromStorage)
  
//         const payload = {
//             refreshtoken: refreshToken,
//             deviceId: deviceIdFromStorage
//         }
  
//         console.log('payload', payload)
//         instance.post(
//           "/auth/refresh-tokens",
//           payload
//         )
//         .then((res) => {
//           console.log(res)
//         })
//         .catch((err) => {
//           localStorage.clear();
//           document.location.href = "/signin";
//         })
  
//         // localStorage.setItem("userTokens", JSON.stringify(userTokens));
//         // localStorage.setItem("userInfo", JSON.stringify(userInfo));
//         // localStorage.setItem("deviceId", JSON.stringify(deviceId));
  
  
//       }
  
//       return Promise.reject(error);
//     }
//   );