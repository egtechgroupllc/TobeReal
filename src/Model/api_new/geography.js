import instance from './apiClient';

export const getListCountry = async () => {
  const responsive = await instance.get('/geography/country');

  return responsive.data;
};
