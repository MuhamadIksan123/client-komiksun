import {
  START_FETCHING_CHAPTER,
  SUCCESS_FETCHING_CHAPTER,
  ERROR_FETCHING_CHAPTER,
  SET_KEYWORD,
  SET_KOMIK,
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
  komik: '',
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_CHAPTER:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_CHAPTER:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_CHAPTER:
      return {
        ...state,
        status: statuslist.success,
        data: action.chapter,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_KOMIK:
      return {
        ...state,
        komik: action.komik,
      };

    default:
      return state;
  }
}
