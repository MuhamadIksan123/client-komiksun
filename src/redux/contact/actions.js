import {
  START_FETCHING_CONTACT,
  SUCCESS_FETCHING_CONTACT,
  ERROR_FETCHING_CONTACT,
  SET_DATE,
  SET_PAGE,
} from './constants';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/actions';
import moment from 'moment';

let debouncedFetchContact = debounce(getData, 1000);

export const startFetchingContact = () => {
  return {
    type: START_FETCHING_CONTACT,
  };
};

export const successFetchingContact = ({ contact, pages }) => {
  return {
    type: SUCCESS_FETCHING_CONTACT,
    contact,
    pages,
  };
};

export const errorFetchingContact = () => {
  return {
    type: ERROR_FETCHING_CONTACT,
  };
};

export const fetchContact = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingContact());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        page: getState().contact?.page || 1,
        limit: getState().contact?.limit || 10,
        startDate: moment(getState().contact?.date?.startDate).format(
          'YYYY-MM-DD'
        ),
        endDate: moment(getState().contact?.date?.endDate).format('YYYY-MM-DD'),
      };

      let res = await debouncedFetchContact('/cms/contact', params);

      const _temp = [];
      res.data.data.contact.forEach((res) => {
        _temp.push({
          _id: res._id,
          nama: res.nama,
          email: res.email,
          isiPesan: res.isiPesan,
          date: res.date,
        });
      });

      dispatch(
        successFetchingContact({
          contact: _temp,
          pages: res.data.data.pages,
        })
      );
    } catch (error) {
      dispatch(errorFetchingContact());
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
