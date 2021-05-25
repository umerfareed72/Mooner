import {postData} from './authServices';

export default async (url, params, token) => {
  return await postData.post(url, {...params}, {headers: {...token}});
};
