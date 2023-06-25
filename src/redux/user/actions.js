import {
  START_FETCHING_USER,
  SUCCESS_FETCHING_USER,
  ERROR_FETCHING_USER,
  SET_KEYWORD,
  SET_STATUS,
  SET_ROLE,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchUser = debounce(getData, 1000);

// START
export const startFetchingUser = () => {
  return {
    type: START_FETCHING_USER,
  };
};

// SUCCESS
export const successFetchingUser = ({ user }) => {
  return {
    type: SUCCESS_FETCHING_USER,
    user,
  };
};

export const errorFetchingUser = () => {
  return {
    type: ERROR_FETCHING_USER,
  };
};

export const fetchUser = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingUser());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().user.keyword,
        statusUser: getState().user?.statusUser?.value || '',
        role: getState().user?.role?.value || '',
      };

      let res = await debouncedFetchUser('/cms/user', params);

      res.data.data.forEach((res) => {
        res.date = res.rilis;
        res.avatar = res?.image?.nama;
      });

      dispatch(
        successFetchingUser({
          user: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingUser());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setStatus = (statusUser) => {
  return {
    type: SET_STATUS,
    statusUser,
  };
};

export const setRole = (role) => {
  return {
    type: SET_ROLE,
    role,
  };
};
