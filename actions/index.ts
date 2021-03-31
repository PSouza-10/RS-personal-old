import { Dispatch } from "react";
import { Action } from "../Context/rootReducer";
import Account from "./account";
import Message from "./message";
export * from "./types";

export default function initializeActions(
  state: any,
  dispatch: Dispatch<Action>
) {
  const actions = {
    ...Account(state, dispatch),
    ...Message(state, dispatch),
  };

  return actions;
}
