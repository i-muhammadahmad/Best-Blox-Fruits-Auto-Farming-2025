import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist' 
import storage from 'redux-persist/lib/storage'
import sessionReducer from './sessionReducer';

const presistConfig = {
  key: 'root',
  storage,
  whitelist: ['session']
} 

const appReducer = combineReducers({
  session: sessionReducer
})

const RootReducer = (state, action) => {
  if (action.type === 'TOKEN_EXPIRE' || action.type === 'SESSION_LOGOUT') {
    state = undefined
    localStorage.removeItem('token')
  }

  return appReducer(state, action)
}


export default persistReducer(presistConfig, RootReducer);

/*const rootReducer = combineReducers({
  session: sessionReducer
});

export default rootReducer;*/
