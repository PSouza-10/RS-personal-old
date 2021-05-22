import { forms } from "./constants";
import {
  Question,
  FormState,
  QuestionState,
  TQuestionValue,
  Forms,
  CheckupState,
} from "./types";
import { IPageState, IAnimationHandler } from "./";
const getDataType = (qst: Question): TQuestionValue => {
  switch (qst.type) {
    case "checklist":
      return qst.items.map((item) => ({ label: item, checked: false }));
    case "confirm":
      return null;
    case "list":
      return [];
    case "text":
      return "";
    case "unit":
      return `1 Meses`;
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

export function validateSwipe(
  current: IPageState,
  state: CheckupState
): IAnimationHandler["canSwipe"] {
  const { currentForm, currentQuestion, currentSubQuestion } = current;

  const subQuestionIsNull = currentSubQuestion === null;

  const answer = subQuestionIsNull
    ? state[currentForm][currentQuestion[0]].value
    : state[currentForm][currentQuestion[0]].nested[currentSubQuestion[0]];

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

  const cantGoForward = [null, "", []].includes(answer) || isLastQuestion;
  console.log({ current, state });
  return {
    backward: !cantGoBackwards,
    forward: !cantGoForward,
  };
}

export function getNewCurrent(
  direction: number,
  current: IPageState,
  formState: CheckupState
): IPageState {
  const { currentForm, currentQuestion, currentSubQuestion } = current;
  const subQuestionIsNull = currentSubQuestion === null;
  const currentFormData = forms[currentForm];
  let newCurrent = {
    ...current,
  };
  const nextForm = formNames.find(
    (n, idx) => formNames[idx + direction] === currentForm
  ) as keyof Forms;
  const nextSubQuestion = subQuestionIsNull
    ? 0
    : currentSubQuestion[0] + direction;

  let sequence = [];
  const nextQuestion = currentQuestion[0] + direction;
  const stateOfForm = formState[currentForm];
  if (subQuestionIsNull) {
    sequence.push("No Subquestion");

    const qst = currentFormData[currentQuestion[0]];
    const qstState = stateOfForm[currentQuestion[0]];

    if (direction < 0) {
      if (stateOfForm[currentQuestion[0] - 1].value) {
        sequence.push("Previous has subquestion");
        newCurrent = {
          ...newCurrent,
          currentQuestion: [nextQuestion, direction],
          currentSubQuestion: [
            stateOfForm[nextQuestion].nested.length - 1,
            direction,
          ],
        };
      } else {
        sequence.push("Previous does not have subquestion");
        newCurrent = {
          ...newCurrent,
          currentQuestion: [nextQuestion, direction],
          currentSubQuestion: null,
        };
      }
    } else {
      switch (qst.type) {
        case "confirm":
          if (qstState.value) {
            newCurrent = {
              ...newCurrent,
              currentSubQuestion: [nextSubQuestion, direction],
            };
          } else {
            newCurrent = {
              ...newCurrent,
              currentQuestion: [nextQuestion, direction],
            };
          }
        default:
          false;
      }
    }
  } else {
    if (direction > 0) {
      if (
        currentSubQuestion[0] ===
        currentFormData[currentQuestion[0]].nested.length - 1
      ) {
        sequence.push("Last Subquestion of Group");
        if (currentFormData.length - 1 === currentQuestion[0]) {
          sequence.push("Last Question of Form");
          newCurrent = {
            currentForm: nextForm,
            currentQuestion: [0, 0],
            currentSubQuestion: null,
          };
        } else {
          sequence.push("Next Question");
          // if (
          //   stateOfForm[nextQuestion].value &&
          //   currentFormData[nextQuestion].type === "confirm" &&
          //   currentFormData[nextQuestion].nested
          // ) {
          //   newCurrent = {
          //     ...newCurrent,
          //     currentQuestion: [nextQuestion, direction],
          //     currentSubQuestion: [
          //       currentFormData[nextQuestion].nested.length - 1,
          //       direction,
          //     ],
          //   };
          // } else {
          newCurrent = {
            ...newCurrent,
            currentQuestion: [nextQuestion, direction],
            currentSubQuestion: null,
          };
          // }
        }
      } else {
        sequence.push("Next SubQuestion");
        newCurrent = {
          ...newCurrent,
          currentSubQuestion: [nextSubQuestion, direction],
        };
      }
    } else {
      if (currentSubQuestion[0] === 0) {
        sequence.push("First Subquestion of Group");

        newCurrent = {
          ...newCurrent,
          currentQuestion: [currentQuestion[0], direction],
          currentSubQuestion: null,
        };
      } else {
        sequence.push("Previous SubQuestion");
        newCurrent = {
          ...newCurrent,
          currentSubQuestion: [nextSubQuestion, direction],
        };
      }
    }
  }
  // console.log(sequence);
  return newCurrent;
}
