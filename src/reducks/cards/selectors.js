import { createSelector } from "reselect";

const CardSelector = (state) => state.cards;
const MyCardSelector = (state) => state.card;

export const getCards = createSelector([CardSelector], (state) => state.list);

export const getMyCard = createSelector([MyCardSelector], (state) => state);
