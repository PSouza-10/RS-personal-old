import { forms } from "./constants";
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
      return ``;
    case "range":
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

function getSubQuestionAnswerValidity(
  current: IPageState,
  ans: TQuestionValue
) {
  const { currentForm, currentQuestion, currentSubQuestion } = current;

  const question =
    forms[currentForm][currentQuestion[0]].nested[currentSubQuestion[0]];

  switch (question.type) {
    case "checklist":
      return (ans as CheckOption[]).map(({ checked }) => checked).includes(true)
        ? true
        : null;
    case "list":
      return (ans as string[]).length > 0 ? true : null;
    default:
      return true;
  }
}

export function validateSwipe(
  current: IPageState,
  state: CheckupState
): IAnimationHandler["canSwipe"] {
  const { currentForm, currentQuestion, currentSubQuestion } = current;

  const subQuestionIsNull = currentSubQuestion === null;

  const answer = subQuestionIsNull
    ? state[currentForm][currentQuestion[0]].value
    : getSubQuestionAnswerValidity(
        current,
        state[currentForm][currentQuestion[0]].nested[currentSubQuestion[0]]
      );

  const cantGoBackwards =
    currentForm === formNames[0] &&
    currentQuestion[0] === 0 &&
    currentSubQuestion === null;

  const isLastQuestion =
    formNames[formNames.length - 1] === currentForm &&
    currentQuestion[0] === forms[currentForm].length - 1 &&
    (subQuestionIsNull ||
      currentSubQuestion[0] ===
        forms[currentForm][currentQuestion[0]].nested.length - 1);
  console.log(answer);
  const cantGoForward =
    ([null, "", []] as any[]).includes(answer) || isLastQuestion;

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
