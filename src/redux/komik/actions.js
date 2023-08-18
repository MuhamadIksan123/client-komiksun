import {
  START_FETCHING_KOMIK,
  SUCCESS_FETCHING_KOMIK,
  ERROR_FETCHING_KOMIK,
  SET_KEYWORD,
  SET_GENRE,
  SET_STATUS,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchKomik = debounce(getData, 1000);

export const startFetchingKomik = () => {
  return {
    type: START_FETCHING_KOMIK,
  };
};

export const successFetchingKomik = ({ komik }) => {
  return {
    type: SUCCESS_FETCHING_KOMIK,
    komik,
  };
};

export const errorFetchingKomik = () => {
  return {
    type: ERROR_FETCHING_KOMIK,
  };
};

export const fetchKomik = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingKomik());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().komik.keyword,
        genre: getState().komik?.genre?.value || '',
        statusKomik: getState().komik?.statusKomik?.value || '',
      };

      let res = await debouncedFetchKomik('/cms/komik', params);

      res.data.data.forEach((res) => {
        res.genreName = res?.genre?.nama ?? '';
        res.harga = res.price === 0 ? 'gratis' : res.price;
        res.date = res.rilis;
        res.avatar = res?.image?.nama ?? '-';
      });

      dispatch(
        successFetchingKomik({
          komik: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingKomik());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setGenre = (genre) => {
  return {
    type: SET_GENRE,
    genre,
  };
};

export const setStatus = (statusKomik) => {
  return {
    type: SET_STATUS,
    statusKomik,
  };
};
