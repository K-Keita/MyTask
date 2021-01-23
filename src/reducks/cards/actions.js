export const FETCH_CARDS = "FETCH_CARDS";
export const fetchCardsAction = (cards) => {
  return {
    type: "FETCH_CARDS",
    payload: cards,
  };
};

export const FETCH_MYCARD = "FETCH_MYCARD";
export const fetchMyCardAction = (card) => {
  return {
    type: "FETCH_MYCARD",
    payload: card,
  };
};

export const RESET_CARD = "RESET_CARD";
export const resetCardAction = () => {
  return {
    type: "RESET_CARD",
    payload: {
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
  };
};
