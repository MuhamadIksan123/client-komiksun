import {
  START_FETCHING_CHAPTER,
  SUCCESS_FETCHING_CHAPTER,
  ERROR_FETCHING_CHAPTER,
  SET_KEYWORD,
  SET_KOMIK,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchChapter = debounce(getData, 1000);

export const startFetchingChapter = () => {
  return {
    type: START_FETCHING_CHAPTER,
  };
};

export const successFetchingChapter = ({ chapter }) => {
  return {
    type: SUCCESS_FETCHING_CHAPTER,
    chapter,
  };
};

export const errorFetchingChapter = () => {
  return {
    type: ERROR_FETCHING_CHAPTER,
  };
};

export const fetchChapter = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingChapter());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().chapter.keyword,
        komik: getState().chapter?.komik?.value || '',
      };

      let res = await debouncedFetchChapter('/cms/chapter', params);

      res.data.data.forEach((res) => {
        res.status = res.statusChapter;
        res.komikName = res?.komik?.judul ?? '';
        res.document = res?.file?.nama ?? '-';
        res.date = res.rilis;
      });

      dispatch(
        successFetchingChapter({
          chapter: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingChapter());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setKomik = (komik) => {
  return {
    type: SET_KOMIK,
    komik,
  };
};
