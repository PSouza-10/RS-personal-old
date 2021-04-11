import { ChangeEvent } from "react";
import { RadioGroup } from "../../components/Form/Radio";
import { FormVal, Form, Question } from "./types";
import { FormContainer } from "./style";
interface ICompositeRadioForm {
  setValue: (val: FormVal) => any;
  val: FormVal;
  content: { type: "composite" } & Form;
  formKey: string;
}
type RadioGroupChangeHandler = (
  questionIdx: number,
  e: ChangeEvent<HTMLInputElement>,
  subQstIdx: number | null
) => void;
export const CompositeRadioForm: React.FC<ICompositeRadioForm> = ({
  content,
  setValue,
  val,
  formKey,
}) => {
  const handleValueChange: RadioGroupChangeHandler = (
    questionIdx,
    e,
    subQstIdx
  ) => {
    let newVal = [...val];

    if (subQstIdx !== null) {
      let subQstVal = newVal[questionIdx];
      subQstVal[subQstIdx] = parseInt(e.target.value);
    } else {
      newVal[questionIdx] = parseInt(e.target.value);
    }
    setValue(newVal);
  };
  return (
    <FormContainer>
      {content.description && <p>{content.description}</p>}
      {content.questions.map((question, qstIdx) => {
        const props = {
          question,
          qstIdx,
          formKey,
          handleChange: handleValueChange,
          key: formKey + "-" + qstIdx,
          val: val[qstIdx],
        };
        switch (question.type) {
          case "composite":
            return (
              <CompositeSubQuestion
                {...(props as IQuestionComponent<"composite">)}
              />
            );
          case "same-answer":
            return (
              <SameAnswerQuestion
                {...(props as IQuestionComponent<"same-answer">)}
              />
            );
          case "simple":
            return (
              <SimpleQuestion {...(props as IQuestionComponent<"simple">)} />
            );
        }
      })}
    </FormContainer>
  );
};

interface IQuestionComponent<T = "simple" | "composite" | "same-answer"> {
  qstIdx: number;
  question: { type: T } & Question;
  handleChange: RadioGroupChangeHandler;
  formKey: string;
  val: number | null | (number | null)[];
}
const CompositeSubQuestion: React.FC<IQuestionComponent<"composite">> = ({
  formKey,
  handleChange,
  qstIdx,
  question,
  val,
}) => {
  const { sub, label } = question;
  return (
    <>
      <h4>{label}</h4>
      {sub.map((subQuestion, subQstIdx) => (
        <RadioGroup
          radioLabel={subQuestion.label}
          options={subQuestion.opts.map(([optLabel, value], optIdx) => ({
            id: `${formKey}-${qstIdx}-sub-${subQstIdx}-opt-${optIdx}`,
            label: optLabel,
            value,
            checked: val[subQstIdx] === value,
          }))}
          className="subQuestion"
          onChange={(val) => handleChange(qstIdx, val, subQstIdx)}
          name={`${formKey}-${qstIdx}-sub-${subQstIdx}`}
          key={`${formKey}-${qstIdx}-sub-${subQstIdx}`}
        />
      ))}
    </>
  );
};

const SameAnswerQuestion: React.FC<IQuestionComponent<"same-answer">> = ({
  formKey,
  handleChange,
  qstIdx,
  question,
  val,
}) => {
  const { label, opts, sub } = question;

  return (
    <>
      <h4>{label}</h4>
      {sub.map((subQuestion, subQstIdx) => (
        <RadioGroup
          radioLabel={subQuestion}
          options={opts.map(([optLabel, value], optIdx) => ({
            id: `${formKey}-${qstIdx}-sub-${subQstIdx}-opt-${optIdx}`,
            label: optLabel,
            value,
            checked: val[subQstIdx] === value,
          }))}
          className="subQuestion"
          onChange={(val) => handleChange(qstIdx, val, subQstIdx)}
          name={`${formKey}-${qstIdx}-sub-${subQstIdx}`}
          key={`${formKey}-${qstIdx}-sub-${subQstIdx}`}
        />
      ))}
    </>
  );
};

const SimpleQuestion: React.FC<IQuestionComponent<"simple">> = ({
  question,
  qstIdx,
  handleChange,
  formKey,
  val,
}) => {
  const { label, opts } = question;

  return (
    <RadioGroup
      radioLabel={label}
      options={opts.map(([optLabel, value], optIdx) => ({
        id: `${formKey}-${qstIdx}-opt-${optIdx}`,
        value: value,
        label: optLabel,
        checked: val === value,
      }))}
      name={formKey + "-" + qstIdx.toString()}
      onChange={(val) => handleChange(qstIdx, val, null)}
    />
  );
};
