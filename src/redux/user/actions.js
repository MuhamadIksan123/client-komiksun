import {
  START_FETCHING_USER,
  SUCCESS_FETCHING_USER,
  ERROR_FETCHING_USER,
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
  return async (dispatch) => {
    dispatch(startFetchingUser());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchUser('/cms/user');

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
