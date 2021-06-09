import { useEffect, useState } from "react";
import { forms } from "./form";
import { CheckupContainer, CheckupFormContainer } from "./style";
import { getInitialState, getNewCurrent, validateSwipe } from "./utils";
import { Forms, TPaginate } from "./types";
import { AnimationHandler } from "./AnimationHandler";
import { QuestionRenderer } from "./QuestionRenderer";
import { DebugController } from "./DebugController";

export interface IPageState {
  currentForm: keyof Forms;
  currentQuestion: [number, number];
  currentSubQuestion: [number, number] | null;
}

export const Controller: React.FC = () => {
  const [current, setCurrent] = useState<IPageState>({
    currentForm: "diseaseHistory",
    currentQuestion: [0, 0],
    currentSubQuestion: null,
  });
  const { currentForm, currentQuestion, currentSubQuestion } = current;
  const subQuestionIsNull = currentSubQuestion === null;
  const [formState, setFormState] = useState(getInitialState(forms).state);
  const [canSwipe, setSwipe] = useState({
    backward: false,
    forward: false,
  });

  const qstData = forms[currentForm][currentQuestion[0]];
  const qstState = formState[currentForm][currentQuestion[0]];

  const paginate: TPaginate = (newDirection: number) => {
    let newCurrent = getNewCurrent(newDirection, current, formState);
    setCurrent(newCurrent);
  };

  const setQuestionState = (newValue: any) => {
    setFormState((state) => {
      let newFormState = [...state[currentForm]];
      if (!subQuestionIsNull) {
        let nestedValue = newFormState[currentQuestion[0]].nested;
        nestedValue[currentSubQuestion[0]] = newValue;
        newFormState[currentQuestion[0]].nested = nestedValue;
      } else {
        newFormState[currentQuestion[0]].value = newValue;
      }
      return {
        ...state,
        [currentForm]: newFormState,
      };
    });
  };

  useEffect(() => {
    const newSwipeState = validateSwipe(current, formState);
    setSwipe(newSwipeState);
  }, [current, formState]);
  useEffect(() => {
    let qst = subQuestionIsNull
      ? qstData
      : forms[currentForm][currentQuestion[0]].nested[currentSubQuestion[0]];

    switch (qst.type) {
      case "choose":
      case "confirm":
        if (qstState.value !== null) {
          paginate(1);
        }

        break;
      default:
        return;
    }
  }, [formState]);

  function getPreviousQuestionAnswer() {
    switch (qstData.type) {
      case "checklist":
      case "list":
        return "";
      case "confirm":
        return qstState.value ? "Sim" : "Não";
      default:
        return qstState.value;
    }
  }
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);
  return (
    <CheckupContainer>
      <CheckupFormContainer>
        <AnimationHandler
          axis={"x"}
          direction={
            subQuestionIsNull ? currentQuestion[1] : currentSubQuestion[1]
          }
          page={subQuestionIsNull ? currentQuestion[0] : currentSubQuestion[0]}
          paginate={(dir) => paginate(dir)}
          canSwipe={canSwipe}
        >
          {subQuestionIsNull ? (
            <>
              {qstData.skipIf && qstData.skipIf(formState) ? paginate(1) : null}
              <h1>
                {typeof qstData.predicate === "string"
                  ? qstData.predicate
                  : qstData.predicate(formState)}
              </h1>
            </>
          ) : (
            <>
              <h4>
                {typeof qstData.predicate === "string"
                  ? qstData.predicate
                  : qstData.predicate(formState)}
                <br></br>
                <strong> Sua Resposta: {getPreviousQuestionAnswer()}</strong>
              </h4>
              <h1>{qstData.nested[currentSubQuestion[0]].predicate}</h1>
            </>
          )}
          <QuestionRenderer
            question={{ state: qstState, data: qstData }}
            setValue={setQuestionState}
            sub={currentSubQuestion}
          />
        </AnimationHandler>

        <span className="buttons">
          <button
            className="button"
            disabled={!canSwipe.backward}
            onClick={() => canSwipe.backward && paginate(-1)}
          >
            Anterior
          </button>
          <button className="button" onClick={toggle}>
            Inspecionar
          </button>
          <button
            disabled={!canSwipe.forward}
            className="button"
            onClick={() => canSwipe.forward && paginate(1)}
          >
            Próxima
          </button>
        </span>
      </CheckupFormContainer>
      <DebugController
        visible={visible}
        toggle={toggle}
        setCurrent={setCurrent}
      />
    </CheckupContainer>
  );
};
