import axios from 'axios';
import {baseUrl} from './url';

const instance = axios.create({
  baseURL: baseUrl,
});

export const postLogin = async data => {
  const responsive = await instance.post('/api/v1/user/login', data)

  return responsive.data;
};
export const postVerifyEmail = async data => {
  const responsive = await instance.post('/api/v1/user/verify/verifyEmail', data)

  return responsive.data;
};

export const postSignUp = async data => {
    const responsive = await instance.post('/api/v1/user/signup',data)

    return responsive.data;
  };
// export const getPost = () => {
//     const responsive = instance.get('/posts', { data })
//     return responsive.data
// }
// export const getPost = async () => {
//   const responsive = await axios.get(
//     'https://jsonplaceholder.typicode.com/posts',
//     {},
//   );

//   return responsive;
// };
