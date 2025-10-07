import instance from '../apiClient';

export const postKycAccount = async data => {
  const responsive = await instance.patch('/user/kyc/submit-request', data);

  return responsive.data;
};
