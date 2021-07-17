import { forms } from "./form";
import {
  Question,
  IAdjacent,
  QuestionState,
  TQuestionValue,
  Forms,
  CheckupState,
  ICommandTree,
  CommandMap,
  CheckListQuestion,
} from "./types";
import { IPageState } from "./";
import { IAnimationHandler } from "./AnimationHandler";
import { Navigator } from "./Navigator";
import { CheckOption } from "../../components/Form/CheckList";
import axios from "axios";
const getDataType = (qst: Question): TQuestionValue => {
  switch (qst.type) {
    case "checklist":
      return qst.items.map((item) => ({ label: item, checked: false }));
    case "confirm":
    case "choose":
      return null;

    case "list":
      return [];
    case "text":
      return "";
    case "unit":
      return ` ${qst.unit[0].label}`;
    case "number":
      return "";
    default:
      false;
  }
};

export function getInitialState(forms: Forms): {
  state: CheckupState;
  nQuestions: number;
} {
  let nQuestions = 0;
  let formState = {} as CheckupState;
  for (let key in forms) {
    let state = [] as QuestionState[];
    for (const qst of forms[key]) {
      let newState = {
        value: getDataType(qst),
        nested: null,
      };

      if (qst.nested) {
        newState.nested = [];
        qst.nested.forEach((subQst) => {
          newState.nested.push(getDataType(subQst));
          nQuestions += 1;
        });
      }
      state.push(newState);
      nQuestions += 1;
    }
    formState[key] = state;
  }

  return { state: formState, nQuestions };
}
const formNames: string[] = Object.keys(forms);

function getQuestionAnswerValidity(current: IPageState, ans: TQuestionValue) {
  const { currentForm, currentQuestion, currentSubQuestion } = current;
  const subQuestionIsNull = currentSubQuestion === null;
  const question = subQuestionIsNull
    ? forms[currentForm][currentQuestion[0]]
    : forms[currentForm][currentQuestion[0]].nested[currentSubQuestion[0]];

  switch (question.type) {
    case "checklist":
      return (ans as CheckOption[]).map(({ checked }) => checked).includes(true)
        ? true
        : null;
    case "list":
      return (ans as string[]).length > 0 &&
        (ans as string[]).join().replace(/\s/g, "") !== ""
        ? true
        : null;
    case "number":
      return ans === "" ? null : true;
    case "choose":
      console.log(ans);
      return ans;
    case "unit":
      return (ans as string).split(" ")[0].trim() === "" ? null : ans;
    default:
      return ans;
  }
}

export function validateSwipe(
  current: IPageState,
  state: CheckupState
): IAnimationHandler["canSwipe"] {
  const { currentForm, currentQuestion, currentSubQuestion } = current;

  const subQuestionIsNull = currentSubQuestion === null;

  const answer = subQuestionIsNull
    ? getQuestionAnswerValidity(
        current,
        state[currentForm][currentQuestion[0]].value
      )
    : getQuestionAnswerValidity(
        current,
        state[currentForm][currentQuestion[0]].nested[currentSubQuestion[0]]
      );

  const cantGoBackwards =
    currentForm === formNames[0] &&
    currentQuestion[0] === 0 &&
    currentSubQuestion === null;

  const isOptional = subQuestionIsNull
    ? forms[currentForm][currentQuestion[0]].optional || false
    : forms[currentForm][currentQuestion[0]].nested[currentSubQuestion[0]]
        .optional || false;
  const cantGoForward =
    ([null, "", [], [""]] as any[]).includes(
      Array.isArray(answer) &&
        answer.length > 0 &&
        typeof answer[0] === "string"
        ? answer.join().replace(/\s/g, "")
        : answer
    ) && !isOptional;

  return {
    backward: !cantGoBackwards,
    forward: !cantGoForward,
  };
}

export function getCommand(tree: ICommandTree): CommandMap {
  if (tree.if) {
    if (typeof tree.then === "string") {
      return tree.then;
    } else {
      return getCommand(tree.then as ICommandTree);
    }
  } else if (tree.else) {
    if (typeof tree.else === "string") {
      return tree.else;
    } else {
      return getCommand(tree.else as ICommandTree);
    }
  }
}

export function getNewCurrent(
  direction: number,
  current: IPageState,
  formState: CheckupState
): IPageState {
  const navigator = new Navigator(current, formState);
  const newState = navigator.getQuestion(direction > 0 ? "next" : "previous");

  return newState;
}

export function getNavigatorData(
  current: IPageState,
  formState: CheckupState
): IAdjacent {
  const previous = forms[current.currentForm][current.currentQuestion[0] - 1]
    ? {
        data: forms[current.currentForm][current.currentQuestion[0] - 1],
        state: formState[current.currentForm][current.currentQuestion[0] - 1],
      }
    : null;
  const next = forms[current.currentForm][current.currentQuestion[0] + 1]
    ? {
        data: forms[current.currentForm][current.currentQuestion[0] + 1],
        state: formState[current.currentForm][current.currentQuestion[0] + 1],
      }
    : null;
  let navigatorData: IAdjacent = {
    current: {
      data: forms[current.currentForm][current.currentQuestion[0]],
      state: formState[current.currentForm][current.currentQuestion[0]],
    },
  };

  if (previous) {
    navigatorData.previous = previous;
  }
  if (next) {
    navigatorData.next = next;
  }
  console.log(navigatorData);

  return navigatorData;
}

export function reloadFromLastSession<T = {}>(
  localStorageKey: string,
  defaultValue: T
): T {
  try {
    const val = JSON.parse(localStorage.getItem(localStorageKey));
    if (val !== null) {
      return val;
    } else return defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

export async function sendFormValues(values) {
  try {
    const { data } = await axios.post("/forms/anamnese", values);

    return { msg: data.msg, error: false };
  } catch (e) {
    console.error(e);
    if (e.response?.data?.error) {
      return { msg: e.response.data.error.msg, error: true };
    } else {
      return { msg: "Ocorreu um erro :(", error: true };
    }
  }
}
