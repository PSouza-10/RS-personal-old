import { ChangeEvent } from "react";
import { RadioGroup } from "../../components/Form/Radio";
import { FormVal, Form } from "./index";
import { FormContainer } from "./style";
interface ICompositeRadioForm {
  setValue: (val: FormVal) => any;
  val: FormVal;
  content: Form;
  formKey: string;
}

export const CompositeRadioForm: React.FC<ICompositeRadioForm> = ({
  content,
  setValue,
  val,
  formKey,
}) => {
  const handleValueChange = (
    questionIdx: number,
    e: ChangeEvent<HTMLInputElement>,
    subQstIdx: number | null
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
      <h1>{content.title}</h1>
      {content.questions.map(({ sub, opts, label }, qstIdx) => {
        if (sub) {
          return (
            <>
              <h4>{label}</h4>
              {sub.map((subQuestion, subQstIdx) => (
                <RadioGroup
                  radioLabel={subQuestion.label}
                  options={subQuestion.opts.map(
                    ([optLabel, value], optIdx) => ({
                      id: `${formKey}-${qstIdx}-sub-${subQstIdx}-opt-${optIdx}`,
                      label: optLabel,
                      value,
                    })
                  )}
                  className="subQuestion"
                  onChange={(val) => handleValueChange(qstIdx, val, subQstIdx)}
                  name={`${formKey}-${qstIdx}-sub-${subQstIdx}`}
                />
              ))}
            </>
          );
        } else {
          return (
            <RadioGroup
              radioLabel={label}
              options={opts.map(([optLabel, value], optIdx) => ({
                id: `${formKey}-${qstIdx}-opt-${optIdx}`,
                value: value,
                label: optLabel,
              }))}
              name={formKey + "-" + qstIdx.toString()}
              onChange={(val) => handleValueChange(qstIdx, val, null)}
            />
          );
        }
      })}
    </FormContainer>
  );
};
