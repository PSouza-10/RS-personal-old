import { useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { forms, YesNoOptions, timeMeasures } from "./constants";
import { CheckupContainer, CheckupFormContainer } from "./style";
import {
  CheckList,
  ClosedQuestion,
  EditableList,
  FormField,
  UnitField,
} from "../../components";
import { getInitialState, getNewCurrent, validateSwipe } from "./utils";
import { Forms, Question } from "./types";
import { CheckOption } from "../../components/Form/CheckList";

const variantsX = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
const variantsY = {
  enter: (direction: number) => {
    console.log();
    return {
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export interface IPageState {
  currentForm: keyof Forms;
  currentQuestion: [number, number];
  currentSubQuestion: [number, number] | null;
}

const swipeConfidenceThreshold = 9000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
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

  const paginate = (newDirection: number) => {
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
  const renderQuestion = (qst: Question, sub = false) => {
    const form = qstState;
    const value = sub ? form.nested[currentSubQuestion[0]] : form.value;
    switch (qst.type) {
      case "confirm":
        return (
          <ClosedQuestion
            currentValue={value}
            options={YesNoOptions}
            setValue={setQuestionState}
          />
        );
      case "checklist":
        return (
          <CheckList
            options={value as CheckOption[]}
            onOptionChange={(idx, checked) => {
              let newVal = [...(value as CheckOption[])];
              newVal[idx].checked = checked;
              setQuestionState(newVal);
            }}
          />
        );
      case "list":
        return (
          <EditableList items={value as string[]} setItems={setQuestionState} />
        );
      case "text":
        return (
          <FormField
            onChange={(e) => setQuestionState(e.target.value)}
            value={value as string}
          />
        );
      case "unit":
        return (
          <UnitField
            setValue={setQuestionState}
            unit={timeMeasures}
            value={value as string}
          />
        );
    }
  };
  useEffect(() => {
    const newSwipeState = validateSwipe(current, formState);
    setSwipe(newSwipeState);
    console.log(newSwipeState);
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
          canSwipe={Object.assign({}, canSwipe)}
        >
          {subQuestionIsNull ? (
            <>
              <h1>{qstData.predicate}</h1>

              {renderQuestion(qstData)}
            </>
          ) : (
            <>
              <h4>
                {qstData.predicate}
                <br></br>
                <strong> Sua Resposta: {qstState.value ? "Sim" : "Não"}</strong>
              </h4>
              <h1>{qstData.nested[currentSubQuestion[0]].predicate}</h1>
              {renderQuestion(qstData.nested[currentSubQuestion[0]], true)}
            </>
          )}
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

export interface IAnimationHandler {
  page: number;
  direction: number;
  canSwipe: {
    forward: boolean;
    backward: boolean;
  };
  paginate: (newDirection: number) => void;
  axis: "x" | "y";
}

const AnimationHandler: React.FC<IAnimationHandler> = ({
  children,
  page,
  direction,
  canSwipe,
  paginate,
  axis = "x",
}) => (
  <AnimatePresence initial={false} custom={direction}>
    <motion.div
      key={page}
      custom={direction}
      variants={axis === "x" ? variantsX : variantsY}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        [axis]: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(e, { offset, velocity }) => {
        const swipe = swipePower(offset[axis], velocity[axis]);

        if (swipe < -swipeConfidenceThreshold && canSwipe.forward) {
          paginate(1);
        } else if (swipe > swipeConfidenceThreshold && canSwipe.backward) {
          paginate(-1);
        }
      }}
      className="qst"
    >
      {children}
    </motion.div>
  </AnimatePresence>
);
