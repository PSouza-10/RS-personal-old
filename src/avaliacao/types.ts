export type LabelValueTuple = [string, number];

export interface ILabelOption {
  label: string;
  opts: LabelValueTuple[];
}

export type Question = { label: string } & (
  | { type: "composite"; sub: ILabelOption[] }
  | { type: "same-answer"; sub: string[]; opts: LabelValueTuple[] }
  | { type: "simple"; opts: LabelValueTuple[] }
);

export type Form = { title: string; description?: string } & (
  | { type: "composite"; questions: Question[] }
  | { type: "same-answer"; questions: string[]; opts: LabelValueTuple[] }
);

export interface IForms {
  [x: string]: Form;
}
export type FormVal = (number | null | (number | null)[])[];
export interface IFormVal {
  [x: string]: FormVal;
}

export const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
