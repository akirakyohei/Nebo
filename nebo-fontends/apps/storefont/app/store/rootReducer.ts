import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { storefontApi } from "app/data/api";
import { Workspace } from "app/types";

const initialWorkspace: Workspace = {
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    gmail: "",
    phone: "",
  },
};
const globalReducer = createReducer<Workspace>(initialWorkspace, (builder) => {
  builder.addMatcher(
    storefontApi.endpoints.getCurrentUser.matchFulfilled,
    (state, { payload }) => {
      state.user = payload;
    }
  );
});

export const rootReducer = combineReducers({
  [storefontApi.reducerPath]: storefontApi.reducer,
  workspace: globalReducer,
});
