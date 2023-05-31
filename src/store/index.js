import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

// Create the Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;
