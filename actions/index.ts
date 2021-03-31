import { Dispatch } from "react";
import { Action } from "../Context/rootReducer";
import Account from "./account";
import Post from "./posts";
export * from "./types";

export default function initializeActions(
  state: any,
  dispatch: Dispatch<Action>
) {
  const actions = {
    ...Account(state, dispatch),
    ...Post(state, dispatch),
  };

  return actions;
}
