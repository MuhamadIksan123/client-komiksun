import {
  START_FETCHING_GENRE,
  SUCCESS_FETCHING_GENRE,
  ERROR_FETCHING_GENRE,
} from './constants';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_GENRE:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_GENRE:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_GENRE:
      return {
        ...state,
        status: statuslist.success,
        data: action.genre,
      };

    default:
      return state;
  }
}
