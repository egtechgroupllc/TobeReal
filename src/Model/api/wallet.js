import axios from 'axios';
import {baseUrl} from '../url';

const instance = axios.create({
  baseURL: baseUrl + '/api/v1/user',
});

export const getBalanceWallet = async () => {
  const responsive = await instance.get('/wallet/balance');

  return responsive.data;
};

export const postCreateWallet = async () => {
  const responsive = await instance.post('/wallet/create');

  return responsive.data;
};

export const postImportWallet = async data => {
  const responsive = await instance.post('/wallet/import', data);

  return responsive.data;
};

export const deleteWallet = async () => {
  const responsive = await instance.delete('/wallet/delete');

  return responsive.data;
};
