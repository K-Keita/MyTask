import { createSelector } from "reselect";

const GroupSelector = (state) => state.groups;

export const getGroups = createSelector([GroupSelector], (state) => state);
export const getGroupUsersId = createSelector(
  [GroupSelector],
  (state) => state.users
);
export const getGroupName = createSelector(
  [GroupSelector],
  (state) => state.groupName
);

export const getGroupId = createSelector(
  [GroupSelector],
  (state) => state.groupId
);
