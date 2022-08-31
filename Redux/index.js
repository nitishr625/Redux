const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combinereducers = redux.combineReducers;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const applyMiddleware = redux.applyMiddleware;

//------------------------------------ACTION----- -----------------------------------------
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const ICECREAM_ORDER = "ICECREAM_ORDER";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

function orderIcecream() {
  return {
    type: ICECREAM_ORDER,
    quantity: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    quantity: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCK,
    quantity: qty,
  };
}

//------------------------------------REDUCER----------------------------------------------

const initialCakeState = {
  noOfcake: 10,
};

const initialIcrecreamState = {
  noOfIcecream: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        noOfcake: state.noOfcake - 1,
      };

    case CAKE_RESTOCKED:
      return {
        ...state,
        noOfcake: state.noOfcake + action.quantity,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIcrecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDER:
      return {
        ...state,
        noOfIcecream: state.noOfIcecream - 1,
      };

    case ICECREAM_RESTOCK:
      return {
        ...state,
        noOfIcecream: state.noOfIcecream + action.quantity,
      };
    default:
      return state;
  }
};

//------------------------------------STORE----------------------------------------------
const rootReducer = combinereducers({
  cake: cakeReducer,
  icecream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));

console.log("initialState", store.getState());

const unsubscribe = store.subscribe(() => {});
 
const action = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);
action.orderCake();
action.orderCake();
action.orderIcecream();
action.orderIcecream();
action.restockCake(3);
action.restockIcecream(2);

unsubscribe();
