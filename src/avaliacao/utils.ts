import { IForms } from "./index";
export function getInitialValues(forms: IForms) {
  let obj = {};
  for (let key in forms) {
    const formObj = { ...forms[key] };

    switch (formObj.type) {
      case "composite":
        const parsedQuestions = formObj.questions.map(
          ({ sub, label, opts }) => {
            if (sub) {
              return [...Array(sub.length).fill(null)];
            } else if (opts) {
              return null;
            }
          }
        );

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
