import {
  START_FETCHING_GENRE,
  SUCCESS_FETCHING_GENRE,
  ERROR_FETCHING_GENRE,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';

let debouncedFetchGenre = debounce(getData, 1000);

// START
export const startFetchingGenre = () => {
  return {
    type: START_FETCHING_GENRE,
  };
};

// SUCCESS
export const successFetchingGenre = ({ genre }) => {
  return {
    type: SUCCESS_FETCHING_GENRE,
    genre,
  };
};

export const errorFetchingGenre = () => {
  return {
    type: ERROR_FETCHING_GENRE,
  };
};

export const fetchGenre = () => {
  return async (dispatch) => {
    dispatch(startFetchingGenre());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 3000);

      let res = await debouncedFetchGenre('/cms/genre');

      dispatch(
        successFetchingGenre({
          genre: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingGenre());
    }
  };
};
