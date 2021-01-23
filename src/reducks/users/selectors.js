import { createSelector } from "reselect";

const userSelector = (state) => state.users;

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);

export const getUsers = createSelector([userSelector], (state) => state);

export const getUserId = createSelector([userSelector], (state) => state.uid);

export const getUsername = createSelector(
  [userSelector],
  (state) => state.username
);

export const getUserIcon = createSelector(
  [userSelector],
  (state) => state.icon
);

export const getEnterGroupsId = createSelector(
  [userSelector],
  (state) => state.enterGroups
);
