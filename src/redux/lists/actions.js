import {
  START_FETCHING_LISTS_GENRES,
  SUCCESS_FETCHING_LISTS_GENRES,
  ERROR_FETCHING_LISTS_GENRES,
  START_FETCHING_LISTS_KOMIKS,
  ERROR_FETCHING_LISTS_KOMIKS,
  SUCCESS_FETCHING_LISTS_KOMIKS,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';

let debouncedFetchListsGenres = debounce(getData, 1000);
let debouncedFetchListsKomiks = debounce(getData, 1000);

export const startFetchingListsGenres = () => {
  return {
    type: START_FETCHING_LISTS_GENRES,
  };
};

export const successFetchingListGenres = ({ genres }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_GENRES,
    genres,
  };
};

export const errorFetchingListGenres = () => {
  return {
    type: ERROR_FETCHING_LISTS_GENRES,
  };
};

export const fetchListGenres = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsGenres());

    try {
      let res = await debouncedFetchListsGenres('/cms/genre');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.nama,
          target: { value: res._id, name: 'genre' },
        });
      });

      dispatch(
        successFetchingListGenres({
          genres: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListGenres());
    }
  };
};


// komiks
export const startFetchingListsKomiks = () => {
  return {
    type: START_FETCHING_LISTS_KOMIKS,
  };
};

export const successFetchingListKomiks = ({ komiks }) => {
  return {
    type: SUCCESS_FETCHING_LISTS_KOMIKS,
    komiks,
  };
};

export const errorFetchingListKomiks = () => {
  return {
    type: ERROR_FETCHING_LISTS_KOMIKS,
  };
};

export const fetchListKomiks = () => {
  return async (dispatch) => {
    dispatch(startFetchingListsKomiks());

    try {
      let res = await debouncedFetchListsKomiks('/cms/komik');

      let _temp = [];

      res.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.judul,
          target: { value: res._id, name: 'komik' },
        });
      });

      dispatch(
        successFetchingListKomiks({
          komiks: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListKomiks());
    }
  };
};

