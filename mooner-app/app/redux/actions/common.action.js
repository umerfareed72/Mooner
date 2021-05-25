import * as TYPES from './action.types';
const setUserRole = (payload) => {
  return {
    type: TYPES.SET_ROLE,
    payload,
  };
};

export {setUserRole};
