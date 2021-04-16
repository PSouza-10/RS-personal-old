import axios from "axios";
import { FormVal, IForms } from "./types";
export function getInitialValues(forms: IForms) {
  let obj = {};
  for (let key in forms) {
    const formObj = { ...forms[key] };

    switch (formObj.type) {
      case "composite":
        const parsedQuestions = formObj.questions.map((qst) => {
          switch (qst.type) {
            case "composite":
            case "same-answer":
              return [...Array(qst.sub.length).fill(null)];
            default:
              return null;
          }
        });

        obj[key] = [...parsedQuestions];
        break;
      case "same-answer":
        obj[key] = [...Array(formObj.questions.length).fill(null)];
        break;
      default:
        throw new Error("Invalid Form");
    }
  }
  return obj;
}
export async function sendFormValues(values) {
  try {
    const { data } = await axios.post("/forms/simple", values);

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
export const updateFormStorage = (value, key) => {
  if (key) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const highlightFirstUnanswered = (
  currentFormValue: FormVal,
  currentFormKey: string
) => {
  let qstIdx,
    subQstIdx = null;

  let idx = 0;
  for (const formValue of currentFormValue) {
    if (Array.isArray(formValue)) {
      const possiblyNullIdx = formValue.findIndex((val) => val === null);
      if (possiblyNullIdx > -1) {
        qstIdx = idx;
        subQstIdx = possiblyNullIdx;
        break;
      }
    } else if (formValue === null) {
      qstIdx = idx;
      break;
    }
    idx++;
  }
  if (qstIdx !== null) {
    const radioGroupId = `${currentFormKey}-${qstIdx}${
      subQstIdx !== null ? `-sub-${subQstIdx}` : ""
    }`;

    const radioGroup = document.getElementById(radioGroupId);
    if (radioGroup) {
      radioGroup.scrollIntoView();
      radioGroup.classList.add("highlight");
      setTimeout(() => {
        radioGroup.classList.remove("highlight");
      }, 2000);
    }
  }
};
