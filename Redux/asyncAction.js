const redux = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

//-------------------------STATE------------------
const initialState = {
  loading: false,
  data: [],
  error: "",
};

//-------------------------ACTION-----------------
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILD = "FETCH_USER_FAILD";

const fetchUsersResuest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailur = (error) => {
  return {
    type: FETCH_USER_FAILD,
    payload: error,
  };
};

//--------------------------REDUCER-------------------------

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILD:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

//-------------------------REDUX STORE ------------------

const fetchUser = () => {
  return function (dispatch) {
    dispatch(fetchUsersResuest);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((users) => users.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchUsersFailur(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUser());
