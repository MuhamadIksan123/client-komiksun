import {
  START_FETCHING_KOMIK,
  SUCCESS_FETCHING_KOMIK,
  ERROR_FETCHING_KOMIK,
  SET_KEYWORD,
  SET_GENRE,
  SET_STATUS,
} from './constants';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  keyword: '',
  genre: '',
  statusKomik: '',
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_KOMIK:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_KOMIK:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_KOMIK:
      return {
        ...state,
        status: statuslist.success,
        data: action.komik,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_GENRE:
      return {
        ...state,
        genre: action.genre,
      };

      case SET_STATUS:
      return {
        ...state,
        statusKomik: action.statusKomik,
      };

    default:
      return state;
  }
}
