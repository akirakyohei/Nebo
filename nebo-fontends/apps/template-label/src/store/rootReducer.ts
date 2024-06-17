import { combineReducers, createReducer } from "@reduxjs/toolkit";
import { Workspace } from "../types";
import { storefontApi } from "../data/api";

const initialWorkspace: Workspace = {
  isLoading: false,
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    avatar_url: "",
    permissions: [],
    provider: "local",
    provider_id: "",
  },
};
const globalReducer = createReducer<Workspace>(initialWorkspace, (builder) => {
  builder.addMatcher(
    storefontApi.endpoints.getCurrentUser.matchPending,
    (state) => {
      state.isLoading = true;
    }
  ),
    builder.addMatcher(
      storefontApi.endpoints.getCurrentUser.matchRejected,
      (state) => {
        state.isLoading = false;
        state.user = {
          id: 0,
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          avatar_url: "",
          permissions: [],
          provider: "local",
          provider_id: "",
        };
      }
    ),
    builder.addMatcher(
      storefontApi.endpoints.getCurrentUser.matchFulfilled,
      (state, { payload }) => {
        state.user = Object.assign({ ...payload });
        state.isLoading = false;
      }
    );
});

export const rootReducer = combineReducers({
  [storefontApi.reducerPath]: storefontApi.reducer,
  workspace: globalReducer,
});
