import axios from 'axios';
import {baseUrl} from './url';

const instance = axios.create({
  baseURL: baseUrl,
});


export const getCountry = async ({level='country',parent=1562822}) => {
    console.log(`/api/v1/user/info/listAddress?level=${level}&parent=${parent}`);
    const responsive = await instance.get(
      `/api/v1/user/info/listAddress?level=${level}&parent=${parent}`,
    );
  console.log('====================================');
  console.log(responsive.data);
  console.log('====================================');
    return responsive.data;
  };
  