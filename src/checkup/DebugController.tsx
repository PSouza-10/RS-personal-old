import { useState } from "react";
import { IPageState } from ".";
import { Modal } from "../../components";
import { Dropdown } from "../../components/Form/Dropdown";
import { formLabelMap } from "./constants";
import { forms } from "./form";
import { DebugControllerContainer } from "./style";
import { CheckupState, Forms } from "./types";

export const DebugController: React.FC<{
  setCurrent: React.Dispatch<React.SetStateAction<IPageState>>;
  visible: boolean;
  toggle: () => any;
}> = ({ setCurrent, toggle, visible }) => {
  const [selectedForm, setForm] = useState<keyof Forms>("diseaseHistory");

  return (
    <>
      <Modal
        visible={visible}
        header={{ title: "Explorar formulário" }}
        toggleVisibility={toggle}
      >
        <DebugControllerContainer>
          <span>
            <h3>Formulário:</h3>
            <Dropdown
              options={Object.keys(forms).map((k) => ({
                label: formLabelMap[k],
                value: k,
              }))}
              onChange={(e) => setForm(e.target.value as keyof Forms)}
              defaultValue={selectedForm}
            />
          </span>
          <div>
            <h3>Questões:</h3>
            <ol>
              {forms[selectedForm].map(({ predicate, nested }, idx) => (
                <>
                  <li key={idx}>
                    <p
                      onClick={() => {
                        setCurrent({
                          currentForm: selectedForm,
                          currentQuestion: [idx, 1],
                          currentSubQuestion: null,
                        });
                        toggle();
                      }}
                    >
                      {predicate}
                    </p>
                    {nested && (
                      <ul>
                        {nested.map((sub, subIdx) => (
                          <li key={subIdx}>
                            <p
                              onClick={() => {
                                setCurrent({
                                  currentForm: selectedForm,
                                  currentQuestion: [idx, 0],
                                  currentSubQuestion: [subIdx, 1],
                                });
                                toggle();
                              }}
                            >
                              {sub.predicate}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>{" "}
                </>
              ))}
            </ol>
          </div>
        </DebugControllerContainer>
      </Modal>
    </>
  );
};
