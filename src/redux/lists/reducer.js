import {
  START_FETCHING_LISTS_GENRES,
  SUCCESS_FETCHING_LISTS_GENRES,
  ERROR_FETCHING_LISTS_GENRES,
  START_FETCHING_LISTS_KOMIKS,
  SUCCESS_FETCHING_LISTS_KOMIKS,
  ERROR_FETCHING_LISTS_KOMIKS,
} from './constants';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  genres: [],
  statusGenres: statuslist.idle,
  komiks: [],
  statusKomiks: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_LISTS_GENRES:
      return { ...state, statusGenres: statuslist.process };

    case ERROR_FETCHING_LISTS_GENRES:
      return { ...state, statusGenres: statuslist.error };

    case SUCCESS_FETCHING_LISTS_GENRES:
      return {
        ...state,
        statusGenres: statuslist.success,
        genres: action.genres,
      };

    case START_FETCHING_LISTS_KOMIKS:
      return { ...state, statusKomiks: statuslist.process };

    case ERROR_FETCHING_LISTS_KOMIKS:
      return { ...state, statusKomiks: statuslist.error };

    case SUCCESS_FETCHING_LISTS_KOMIKS:
      return {
        ...state,
        statusKomiks: statuslist.success,
        komiks: action.komiks,
      };

    default:
      return state;
  }
}
