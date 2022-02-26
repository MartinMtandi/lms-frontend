/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
	key:
		process.env.REACT_APP_ENVIRONMENT === "development" ? "LMS:dev" : "LMS:prod",
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const middleware = [thunk];

export default () => {
	const store = createStore(
		persistedReducer,
		initialState,
		process.env.REACT_APP_ENVIRONMENT === "development"
			? composeWithDevTools(applyMiddleware(...middleware))
			: applyMiddleware(...middleware)
	);

	// const store = val;
	let persistor = persistStore(store);

	return {
		store,
		persistor,
	};
};
