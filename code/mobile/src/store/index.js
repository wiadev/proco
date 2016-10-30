import { createStore, applyMiddleware, compose } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";

const logger = createLogger({
  predicate: () => __DEV__,
  collapsed: true,
  duration: true,
  diff: true,
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
