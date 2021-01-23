import * as Actions from "./actions";
import initialState from "../store/initialState";

export const CardsReducer = (state = initialState.cards, action) => {
  switch (action.type) {
    case Actions.FETCH_CARDS:
      return {
        ...state,
        list: [...action.payload],
      };
    default:
      return state;
  }
};

export const MyCardReducer = (state = initialState.card, action) => {
  switch (action.type) {
    case Actions.FETCH_MYCARD:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.RESET_CARD:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
