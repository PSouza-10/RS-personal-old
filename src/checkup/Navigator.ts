import { IPageState } from ".";
import { forms } from "./form";
import { IAdjacent, Forms, IConditions, CheckupState } from "./types";

import { getCommandTree } from "./Maps";
import { getCommand, getNavigatorData } from "./utils";
type Direction = "next" | "previous";
const changesOnlySubQuestion = [
  "next_child",
  "child",
  "finish",
  "parent",
  "previous_child",
  "nothing",
];
const formList = Object.keys(forms) as (keyof Forms)[];
type TNavigatorArgs = {
  current: IPageState;
  data: IAdjacent;
};
export class Navigator {
  conditions: IConditions;
  currentFormIdx: number;
  args: TNavigatorArgs;
  state: CheckupState;
  constructor(current: IPageState, state: CheckupState) {
    this.args = {
      current: { ...current },
      data: getNavigatorData(current, state),
    };
    this.state = state;
    // console.log(this.args.data);
    this.currentFormIdx = formList.findIndex(
      (val) => val === this.args.current.currentForm
    );
    this.initConditions(Object.freeze({ ...this.args }));
  }

  initConditions = (args: TNavigatorArgs) => {
    let subQuestionConditions = null,
      questionConditions = null,
      formConditions = null;

    if (args.current.currentSubQuestion !== null) {
      subQuestionConditions = {
        isLastOfGroup:
          args.data.current.data.nested?.length - 1 ===
          args.current.currentSubQuestion[0],
        isFirstOfGroup: args.current.currentSubQuestion[0] === 0,
      };
    }

    questionConditions = {
      isFirstOfForm: args.current.currentQuestion[0] === 0,
      isLastOfForm:
        forms[args.current.currentForm].length - 1 ===
        args.current.currentQuestion[0],
      previous: {
        hasNested: args.data.previous?.data.nested ? true : false,
        isBool:
          args.data.previous?.data.type === "confirm"
            ? {
                answer: args.data.previous?.state.value,
                negative: args.data.previous.data.negative,
              }
            : null,
      },
      isFormDefining:
        args.data.current.data.type === "confirm" &&
        args.data.current.data.formDefining,
      nested: args.data.current.data.nested ? true : false,
      isBool:
        args.data.current.data.type === "confirm"
          ? {
              answer: args.data.current.state.value,
              negative: args.data.current.data.negative,
            }
          : null,
      shouldJumpToFirstOfLastForm: false,
    };

    formConditions = {
      isLastForm: formList[formList.length - 1] === args.current.currentForm,
      isFirstForm: formList[0] === args.current.currentForm,
    };

    if (
      !formConditions.isFirstForm &&
      forms[formList[this.currentFormIdx - 1]][0].formDefining
    ) {
      if (!this.state[formList[this.currentFormIdx - 1]][0].value) {
        questionConditions.shouldJumpToFirstOfLastForm = true;
      }
    }

    this.conditions = {
      subQuestion: subQuestionConditions,
      question: questionConditions,
      form: formConditions,
    };
  };

  getQuestion(which: Direction): IPageState | null {
    const tree = getCommandTree[which](this.conditions);
    // console.log(this.conditions);
    const command = getCommand(tree);
    let base: IPageState | null = null;
    if (changesOnlySubQuestion.includes(command)) {
      base = {
        currentForm: this.args.current.currentForm,
        currentQuestion: this.args.current.currentQuestion,
        currentSubQuestion: null,
      };
    }

    // console.dir({ command, base });
    // console.dir(this.conditions);
    switch (command) {
      case "child":
        return {
          ...base,
          currentSubQuestion: [0, 1],
        };
      case "next_child":
        return {
          ...base,
          currentSubQuestion: [this.args.current.currentSubQuestion[0] + 1, 1],
        };
      case "previous_child":
        return {
          ...base,
          currentSubQuestion: [this.args.current.currentSubQuestion[0] - 1, -1],
        };
      case "nothing":
        return {
          ...base,
          currentSubQuestion: this.args.current.currentSubQuestion,
        };
      case "finish":
        return null;
      case "parent":
        return {
          ...base,
        };
      case "next_form":
        return {
          currentForm: formList[this.currentFormIdx + 1],
          currentQuestion: [0, 1],
          currentSubQuestion: null,
        };
      case "previous_form":
        const previousForm = forms[formList[this.currentFormIdx - 1]];
        return {
          currentForm: formList[this.currentFormIdx - 1],
          currentQuestion: [previousForm.length - 1, -1],
          currentSubQuestion: null,
        };
      case "next_question":
        return {
          currentForm: this.args.current.currentForm,
          currentQuestion: [this.args.current.currentQuestion[0] + 1, 1],
          currentSubQuestion: null,
        };
      case "previous_question":
        return {
          currentForm: this.args.current.currentForm,
          currentQuestion: [this.args.current.currentQuestion[0] - 1, -1],
          currentSubQuestion: null,
        };
      case "nothing":
        return this.args.current;
      case "last_nested_of_previous":
        return {
          currentForm: this.args.current.currentForm,
          currentQuestion: [this.args.current.currentQuestion[0] - 1, -1],
          currentSubQuestion: [
            this.args.data.previous.data.nested.length - 1,
            0,
          ],
        };
      case "first_of_previous_form":
        return {
          currentForm: formList[this.currentFormIdx - 1],
          currentQuestion: [0, -1],
          currentSubQuestion: null,
        };
      default:
        throw new Error("Invalid Command");
    }
  }
}
