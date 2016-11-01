import { createStore, applyMiddleware, compose } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { Iterable } from 'immutable';
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

const logger = createLogger({
  predicate: () => __DEV__,
  collapsed: true,
  duration: true,
  diff: true,
  stateTransformer: (state) => {
    let newState = {};

    for (var i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }

    return newState;
  }
});

export default function configureStore(onComplete) {

  const sagaMiddleware = createSagaMiddleware();

  let store = createStore(
    reducers,
    compose(
      applyMiddleware(
        sagaMiddleware,
        thunkMiddleware,
        logger,
      ),
    ),
  );

  sagaMiddleware.run(sagas);

  return store;
}
