const initialState = {
  cards: {
    list: [],
  },
  card: {
    checkedTask: [],
    date: "",
    enthusiasmText: "",
    hours: "",
    icon: "",
    id: "",
    lookingBackText: "",
    minutes: "",
    nextTaskList: [],
    prevTaskList: [],
    runTask: [],
    username: "",
  },
  groups: {
    groupId: "",
    groupName: "",
    users: [],
  },
  users: {
    enterGroups: [],
    icon: "",
    isSignedIn: false,
    role: "",
    uid: "",
    username: "",
  },
};

export default initialState;
