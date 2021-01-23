import * as Actions from "./actions";
import initialState from "../store/initialState";

export const GroupsReducer = (state = initialState.groups, action) => {
  switch (action.type) {
    case Actions.FETCH_GROUPS:
      return {
        ...state,
        list: [...action.payload],
      };
    case Actions.FETCH_GROUPCARDSLIST:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
