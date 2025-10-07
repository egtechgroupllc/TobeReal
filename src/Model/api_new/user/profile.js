import instance from '../apiClient';

export const postEditProfile = async data => {
  const responsive = await instance.patch('/user/profile', data);

  return responsive.data;
};
export const getProfile = async () => {
  const responsive = await instance.get('/user/profile');

  return responsive.data;
};
export const getGender = async () => {
  const responsive = await instance.get('/user/profile/gender');

  return responsive.data;
};
