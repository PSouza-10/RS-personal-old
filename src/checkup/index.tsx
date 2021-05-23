import { useEffect, useState } from "react";
import { forms } from "./constants";
import { CheckupContainer, CheckupFormContainer } from "./style";
import { getInitialState, getNewCurrent, validateSwipe } from "./utils";
import { Forms, TPaginate } from "./types";
import { AnimationHandler } from "./AnimationHandler";
import { QuestionRenderer } from "./QuestionRenderer";

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
    forward: true,
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
              <h1>{qstData.predicate}</h1>
            </>
          ) : (
            <>
              <h4>
                {qstData.predicate}
                <br></br>
                <strong> Sua Resposta: {qstState.value ? "Sim" : "Não"}</strong>
              </h4>
              <h1>{qstData.nested[currentSubQuestion[0]].predicate}</h1>
            </>
          )}
          <QuestionRenderer
            question={{ state: qstState, data: qstData }}
            setValue={setQuestionState}
            sub={currentSubQuestion}
            paginate={paginate}
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
          <button
            disabled={!canSwipe.forward}
            className="button"
            onClick={() => canSwipe.forward && paginate(1)}
          >
            Próxima
          </button>
        </span>
      </CheckupFormContainer>
    </CheckupContainer>
  );
};
