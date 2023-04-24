import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';

const persisConfig = {
  key: 'root',
  storage,
};

const composedEnhacer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhacer);

export const persistor = persistStore(store);
