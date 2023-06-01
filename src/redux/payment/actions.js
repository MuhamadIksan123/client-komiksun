import {
  START_FETCHING_PAYMENT,
  SUCCESS_FETCHING_PAYMENT,
  ERROR_FETCHING_PAYMENT,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchPayment = debounce(getData, 1000);

export const startFetchingPayment = () => {
  return {
    type: START_FETCHING_PAYMENT,
  };
};

export const successFetchingPayment = ({ payment }) => {
  return {
    type: SUCCESS_FETCHING_PAYMENT,
    payment,
  };
};

export const errorFetchingPayment = () => {
  return {
    type: ERROR_FETCHING_PAYMENT,
  };
};

export const fetchPayment = () => {
  return async (dispatch) => {
    dispatch(startFetchingPayment());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let res = await debouncedFetchPayment('/cms/payment');

      res.data.data.forEach((res) => {
        res.avatar = res.image.nama;
      });

      dispatch(
        successFetchingPayment({
          payment: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingPayment());
    }
  };
};
