import { createStore } from 'redux'
import testReducer from '../../features/sandbox/testReducer'
import rootReducer from './rootReducer'
import {devToolsEnhancer} from 'redux-devtools-extension'
export function configureStore(){
	return createStore(rootReducer,devToolsEnhancer())
}