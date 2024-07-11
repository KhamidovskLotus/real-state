import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import propertyReducer, { PropertyFilterState } from './propertyFilterSlice';
import userReducer, { UserState } from './userSlice';
import otherReducer, { OtherState } from './otherSlice';
import themeReducer, { ThemeState } from './themeSlice';
import saveListReducer, { SaveListState } from './saveListSlice';

export type StoreState = {
  user: UserState;
  property: PropertyFilterState;
  theme: ThemeState;
  other: OtherState;
  saveList: SaveListState;
};

const rootReducer = combineReducers({
  user: userReducer,
  property: propertyReducer,
  theme: themeReducer,
  other: otherReducer,
  saveList: saveListReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
