import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import genreReducer from './genre/reducer';
import notifReducer from './notif/reducer';
import userReducer from './user/reducer';
import komikReducer from './komik/reducer';
import paymentReducer from './payment/reducer';
import listsReducer from './lists/reducer';
import chapterReducer from './chapter/reducer';
import transaksiReducer from './transaksi/reducer';

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  genre: genreReducer,
  notif: notifReducer,
  user: userReducer,
  komik: komikReducer,
  payment: paymentReducer,
  lists: listsReducer,
  chapter: chapterReducer,
  transaksi: transaksiReducer,
});
const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
