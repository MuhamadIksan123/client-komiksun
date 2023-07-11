import store from './store';

let currentAuth;

function listener() {
  let previousAuth = currentAuth;

  currentAuth = store.getState().auth;

  console.log('previousAuth');
  console.log(previousAuth);

  console.log('currentAuth');
  console.log(currentAuth);

  if (currentAuth !== previousAuth) {
    localStorage.setItem('auth', JSON.stringify(currentAuth));
  }
}

function listen() {
  store.subscribe(listener);
}

export { listen };
