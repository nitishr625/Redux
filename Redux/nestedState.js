const produce = require("immer").produce;
const redux = require("redux");
const initialState = {
  name: "Nitish",
  address: {
    street: "123 street",
    city: "reduxCity",
    state: "JSstate",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.state = action.payload;
      });
    //   return {
    //     ...state,
    //     address: {
    //       ...state.address,
    //       street: action.payload,
    //     },
    //   };
    default: {
      return state;
    }
  }
};

const store = redux.legacy_createStore(reducer);
console.log("initial State", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("updated State", store.getState());
});
store.dispatch(updateStreet("456 Street"));
unsubscribe();
