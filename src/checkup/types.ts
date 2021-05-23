import { CheckOption } from "../../components/Form/CheckList";
export type ConfirmQuestion = {
  type: "confirm";
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
  unit?: "time";
};
export type QuestionTypes =
  | ConfirmQuestion
  | ListQuestion
  | CheckListQuestion
  | TextQuestion
  | UnitQuestion;

export type Question = {
  predicate?: string;
  nested?: Question[];
} & QuestionTypes;

export interface Forms {
  diseaseHistory: Question[];
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
