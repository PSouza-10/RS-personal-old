import { Dispatch } from "react";
import { Action } from "../Context/rootReducer";
import Account from "./account";
import Post from "./posts";
export * from "./types";
import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_URL
    : "http://localhost:5000";
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
