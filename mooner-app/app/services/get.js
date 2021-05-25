import {getData} from './authServices';
export default async (url, token, params) => {
  return getData.get(url, {headers: {...token}}, {params: {...params}});
};
