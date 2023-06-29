import {
  START_FETCHING_TRANSAKSI,
  SUCCESS_FETCHING_TRANSAKSI,
  ERROR_FETCHING_TRANSAKSI,
  SET_DATE,
  SET_PAGE,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';
import moment from 'moment';

let debouncedFetchTransaksi = debounce(getData, 1000);

export const startFetchingTransaksi = () => {
  return {
    type: START_FETCHING_TRANSAKSI,
  };
};

export const successFetchingTransaksi = ({ transaksi, pages }) => {
  return {
    type: SUCCESS_FETCHING_TRANSAKSI,
    transaksi,
    pages,
  };
};

export const errorFetchingTransaksi = () => {
  return {
    type: ERROR_FETCHING_TRANSAKSI,
  };
};

export const fetchTransaksi = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingTransaksi());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        page: getState().transaksi?.page || 1,
        limit: getState().transaksi?.limit || 10,
        startDate: moment(getState().transaksi?.date?.startDate).format(
          'YYYY-MM-DD'
        ),
        endDate: moment(getState().transaksi?.date?.endDate).format('YYYY-MM-DD'),
      };

      let res = await debouncedFetchTransaksi('/cms/transaksi', params);

      console.log(res);

      const _temp = [];
      res.data.data.transaksi.forEach((res) => {
        _temp.push({
          nama: `${res.personalDetail.firstName} ${res.personalDetail.lastName}`,
          judul: res.historyKomik.judul,
          price: res.historyKomik.price,
          penerbit: res.komik.vendor.nama,
          date: res.date,
          statusTransaksi: res.statusTransaksi,
          _id: res._id
        });
      });

      dispatch(
        successFetchingTransaksi({
          transaksi: _temp,
          pages: res.data.data.pages,
        })
      );
    } catch (error) {
      dispatch(errorFetchingTransaksi());
    }
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

export const setDate = (ranges) => {
  return {
    type: SET_DATE,
    ranges,
  };
};
