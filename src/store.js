import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from "./reducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'

const persisConfig = {
  key: 'root',
  storage,
}

const composedEnhacer = composeWithDevTools(applyMiddleware(thunkMiddleware))

// const persistedReducer = persistReducer(persisConfig, rootReducer)

// const store = createStore(persistedReducer, composedEnhacer)
const store = createStore(rootReducer, composedEnhacer)

const persistor = persistStore(store)

// export  {persistor,store}
export default store
