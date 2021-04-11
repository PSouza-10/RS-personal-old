import { IForms } from "./types";
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
