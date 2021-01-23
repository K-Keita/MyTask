export const FETCH_USERS = "FETCH_USERS";
export const fetchUsersAction = (users) => {
  return {
    type: "FETCH_USERS",
    payload: users,
  };
};

export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
  return {
    type: "SIGN_IN",
    payload: {
      icon: userState.icon,
      isSignedIn: true,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
      enterGroups: userState.enterGroups,
    },
  };
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
  return {
    type: "SIGN_OUT",
    payload: {
      icon: "",
      isSignedIn: false,
      role: "",
      uid: "",
      username: "",
      enterGroups: [],
    },
  };
};
