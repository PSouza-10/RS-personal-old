import { CheckOption } from "../../components/Form/CheckList";
import { ClosedQuestionOption } from "../../components/Form/ClosedQuestion";
import { DropdownOption } from "../../components/Form/Dropdown";
export type ConfirmQuestion = {
  type: "confirm";
  negative?: true;
};
export type ChoiceQuestion = {
  type: "choose";
  opts?: ClosedQuestionOption[];
};
export type ListQuestion = {
  type: "list";
  limit?: number;
};

export type CheckListQuestion = {
  type: "checklist";
  items: string[];
};
export type TextQuestion = {
  type: "text";
};

export type UnitQuestion = {
  type: "unit";
  unit: DropdownOption[];
};

export type RangeQuestion = {
  type: "range";
  mask?: string;
};
export type QuestionTypes =
  | ConfirmQuestion
  | ListQuestion
  | CheckListQuestion
  | TextQuestion
  | UnitQuestion
  | RangeQuestion
  | ChoiceQuestion;

export type Question = {
  predicate?: string | ((state: CheckupState) => string);
  nested?: Question[];
  id?: string;
} & QuestionTypes;

export interface Forms {
  [x: string]: Question[];
  diseaseHistory: Question[];
  // lifeHabits: Question[];
}

export type TQuestionValue =
  | string
  | null
  | string[]
  | boolean[]
  | CheckOption[];
export interface QuestionState {
  value: TQuestionValue;
  nested: null | TQuestionValue[];
}

export type FormState = QuestionState[];
export interface CheckupState {
  [x: string]: FormState;
}
export type TPaginate = (newDirection: number) => void;

export interface FormConditions {
  isLastForm: boolean;
  isFirstForm: boolean;
}

export interface QuestionConditions {
  isFirstOfForm: boolean;
  isLastOfForm: boolean;
  previous: {
    hasNested: boolean;
    isBool: { answer: boolean; negative?: true } | null;
  };
  nested: boolean;
  isBool: { answer: boolean; negative?: true } | null;
}

export interface IConditions {
  form: FormConditions;
  question: QuestionConditions;
  subQuestion: {
    isLastOfGroup: boolean;
    isFirstOfGroup: boolean;
  };
}

export type CommandMap =
  | "next_child"
  | "next_question"
  | "child"
  | "finish"
  | "next_form"
  | "parent"
  | "previous_child"
  | "nothing"
  | "previous_form"
  | "last_nested_of_previous"
  | "previous_question";

export interface ICommandTree {
  if: boolean | any;
  then: ICommandTree | CommandMap;
  else: ICommandTree | CommandMap;
}
interface QuestionInfo {
  data: Question | null;
  state: QuestionState | null;
}

export interface IAdjacent {
  previous?: QuestionInfo;
  current: QuestionInfo;
  next?: QuestionInfo;
}
