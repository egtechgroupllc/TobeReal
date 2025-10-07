import instance from './apiClient';

export const postUploadFile = async data => {
  const responsive = await instance.post('/file/upload', data);

  return responsive.data;
};
