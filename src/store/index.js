import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducer from '../reducer';

export const configureStore = () => {
	const store = createStore(reducer, compose(
		applyMiddleware(thunk),
		autoRehydrate()
	));
	persistStore(store, { storage: AsyncStorage });
	return store;
};
