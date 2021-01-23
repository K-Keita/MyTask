export const FETCH_GROUPS = "FETCH_GROUPS";
export const fetchGroupsAction = (groups) => {
  return {
    type: "FETCH_GROUPS",
    payload: groups,
  };
};

export const FETCH_GROUPCARDSLIST = "FETCH_GROUPCARDSLIST";
export const fetchGroupCardsListAction = (groups) => {
  return {
    type: "FETCH_GROUPCARDSLIST",
    payload: groups,
  };
};
