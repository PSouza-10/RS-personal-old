import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { CompositeRadioForm } from "./CompositeRadioForm";
import { IdentificationForm, IUserInfo } from "./Identification";
import { SameAnswerForm } from "./SameAnswerForm";
import { Container, FormFinished } from "./style";
import { Form, IForms, IFormVal, FormVal } from "./types";
import {
  getInitialValues,
  highlightFirstUnanswered,
  sendFormValues,
  updateFormStorage,
} from "./utils";
import format from "date-fns/format";
import { MdCheck } from "react-icons/md";
import { Loading } from "../../components";
export type CompositeFormObj = { type: "composite" } & Form;
export type SameAnswerFormObj = { type: "same-answer" } & Form;

const CompleteForm: React.FC<{
  forms: IForms | null;
  storageKey: "simple-stored" | "complete-stored";
}> = ({ forms, storageKey }) => {
  const formComponents = ["identification", ...Object.keys(forms)];

  const [formValues, setFormValues] = useState<IFormVal>({});
  const [currentPage, setPage] = useState(0);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: null,
    birthTime: "",

    sex: null,
  });
  const [formIsValid, setFormValid] = useState([
    ...Array(formComponents.length).fill(false),
  ]);
  const [formFinished, setFormFinished] = useState({
    msg: "",
    error: false,
    loading: false,
  });
  const setLoading = (val: boolean) =>
    setFormFinished({ ...formFinished, loading: val });

  useEffect(() => {
    if (forms) {
      let initialFormValues = getInitialValues(forms);
      const savedForm = localStorage.getItem(storageKey);
      if (savedForm) {
        setLoading(true);
        const savedData = JSON.parse(savedForm);
        initialFormValues = {
          ...initialFormValues,
          ...savedData.formValues,
        };
        setUserInfo({
          ...savedData.userInfo,
          birthDate: new Date(savedData.userInfo.birthDate),
        });
        setFormValid(savedData.formIsValid);
        setLoading(false);
      }
      setFormValues(initialFormValues);
    }
  }, [forms]);

  useEffect(() => {
    updateFormStorage({ userInfo, formValues, formIsValid }, storageKey);
  }, [formValues, userInfo, formIsValid]);

  const containerRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  }, [currentPage]);

  const onFormValueChange = (val: FormVal, key: string) => {
    handleValidChange(!val.flat().includes(null), currentPage);
    const newFormValues = {
      ...formValues,
      [key]: val,
    };
    setFormValues(newFormValues);
  };

  const buildFormPage = (key: string) => {
    if (forms[key].type === "composite") {
      return (
        <CompositeRadioForm
          setValue={(val) => onFormValueChange(val, key)}
          val={formValues[key]}
          content={forms[key] as CompositeFormObj}
          formKey={key}
        />
      );
    } else {
      return (
        <SameAnswerForm
          setValue={(val) => onFormValueChange(val, key)}
          val={formValues[key]}
          content={forms[key] as SameAnswerFormObj}
          formKey={key}
        />
      );
    }
  };

  const handleValidChange = (valid: boolean, idx: number) => {
    let newValid = [...formIsValid];
    newValid[idx] = valid;
    setFormValid(newValid);
  };

  const isLastPage = currentPage === formComponents.length - 1;

  const sendResponse = async () => {
    const user = {
      ...userInfo,
      birthDate: format(userInfo.birthDate, "dd/MM/yyyy"),
      msBirthDate: userInfo.birthDate.getTime(),
    };
    const response = await sendFormValues({ user, ...formValues });
    setFormFinished(response);
  };

  if (formFinished.msg) {
    return (
      <FormFinished>
        {!formFinished.error && <MdCheck />}
        <p>{formFinished.msg}</p>
        {formFinished.error && (
          <button className="button" onClick={sendResponse}>
            Tentar enviar novamente
          </button>
        )}
      </FormFinished>
    );
  } else if (formFinished.loading) {
    return <Loading wholePage />;
  }
  const highlightEmptyRegisterInput = () => {
    const id = Object.keys(userInfo).find((key) => !userInfo[key]);
    const input = document.getElementById(id);
    input && input.focus();
  };
  return (
    <Container className="page-container multipart-form" ref={containerRef}>
      {currentPage === 0 ? (
        <IdentificationForm
          val={userInfo}
          setFormValid={(newValid) => handleValidChange(newValid, 0)}
          setVal={(value) => setUserInfo(value)}
        />
      ) : (
        <>
          {forms[formComponents[currentPage]].description && (
            <h2 className="form-instructions" tabIndex={0}>
              {forms[formComponents[currentPage]].description}
            </h2>
          )}
          {/* {JSON.stringify(formValues[formComponents[currentPage]])} */}
          {buildFormPage(formComponents[currentPage])}
        </>
      )}

      <section className="page-nav">
        {currentPage !== 0 && (
          <button
            className="button"
            onClick={() => setPage((page) => page - 1)}
          >
            Anterior
          </button>
        )}

        {!formIsValid[currentPage] ? (
          <h4
            onClick={() =>
              currentPage > 0
                ? highlightFirstUnanswered(
                    formValues[formComponents[currentPage]],
                    formComponents[currentPage]
                  )
                : highlightEmptyRegisterInput()
            }
          >
            {currentPage > 0
              ? "Responda para prosseguir (Clique para ver)"
              : "Preencha todos os campos"}
          </h4>
        ) : (
          <button
            className="button"
            onClick={() =>
              isLastPage ? sendResponse() : setPage((page) => page + 1)
            }
          >
            {isLastPage ? "Enviar" : "Próximo"}
          </button>
        )}
      </section>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data } = await axios.get("/forms/simple");

    return {
      props: {
        forms: data as IForms,
        storageKey: context.params.type + "-stored",
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        forms: null,
        storageKey: "",
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { type: "complete" } }, { params: { type: "simple" } }],
    fallback: false,
  };
};
export default CompleteForm;
