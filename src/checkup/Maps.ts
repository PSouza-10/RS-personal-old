import { IConditions, ICommandTree } from "./types";

export interface ICommandTreeGetter {
  [x: string]: (c: IConditions) => ICommandTree;
}

export const getCommandTree: ICommandTreeGetter = {
  next: (c: IConditions) => ({
    if: !c.subQuestion,
    then: {
      if: c.question.nested,
      then: {
        if: c.question.isBool,
        then: {
          if:
            (c.question.isBool?.answer && !c.question.isBool?.negative) ||
            (c.question.isBool?.negative && !c.question.isBool?.answer),
          then: "child",
          else: {
            if: c.question.isFormDefining,
            then: "next_form",
            else: {
              if: c.question.isLastOfForm,
              then: {
                if: c.form.isLastForm,
                then: "finish",
                else: "next_form",
              },
              else: "next_question",
            },
          },
        },
        else: "child",
      },
      else: {
        if: c.question.isLastOfForm,
        then: {
          if: c.form.isLastForm,
          then: "finish",
          else: "next_form",
        },
        else: "next_question",
      },
    },
    else: {
      if: c.subQuestion?.isLastOfGroup,
      then: {
        if: c.question.isLastOfForm,
        then: {
          if: c.form.isLastForm,
          then: "finish",
          else: "next_form",
        },
        else: "next_question",
      },
      else: "next_child",
    },
  }),
  previous: (c: IConditions) => ({
    if: c.subQuestion,
    then: {
      if: c.subQuestion?.isFirstOfGroup,
      then: "parent",
      else: "previous_child",
    },
    else: {
      if: c.question?.isFirstOfForm,
      then: {
        if: c.form?.isFirstForm,
        then: "nothing",
        else: {
          if: c.question.shouldJumpToFirstOfLastForm,
          then: "first_of_previous_form",
          else: "previous_form",
        },
      },
      else: {
        if: c.question.previous?.hasNested,
        then: {
          if: c.question.previous?.isBool,
          then: {
            if:
              (c.question.previous.isBool?.answer &&
                !c.question.previous.isBool?.negative) ||
              (c.question.previous.isBool?.negative &&
                !c.question.previous.isBool?.answer),
            then: "last_nested_of_previous",
            else: "previous_question",
          },
          else: "last_nested_of_previous",
        },
        else: "previous_question",
      },
    },
  }),
};
