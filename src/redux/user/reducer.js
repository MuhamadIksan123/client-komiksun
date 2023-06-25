import {
  START_FETCHING_USER,
  SUCCESS_FETCHING_USER,
  ERROR_FETCHING_USER,
  SET_KEYWORD,
  SET_STATUS,
  SET_ROLE
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
  role: '',
  statusUser: '',
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_USER:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_USER:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_USER:
      return {
        ...state,
        status: statuslist.success,
        data: action.user,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_STATUS:
      return {
        ...state,
        statusUser: action.statusUser,
      };

    case SET_ROLE:
      return {
        ...state,
        role: action.role,
      };

    default:
      return state;
  }
}
