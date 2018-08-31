import { combineReducers } from 'redux'
import carouselState from './carousel_state'
import { reducer as formReducer } from 'redux-form'
import { reducer as responsive, mediaQueryTracker } from 'redux-mediaquery'
import { persistCombineReducers, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const config = {
  key: 'root',
  storage
}

let reducers = combineReducers({
  carouselState,
  form: formReducer
})

const carouselApp = persistReducer(config, reducers);

export default carouselApp
