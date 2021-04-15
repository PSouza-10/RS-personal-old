import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useRef, useState } from "react";
import { CompositeRadioForm } from "./CompositeRadioForm";
import { IdentificationForm, IUserInfo } from "./Identification";
import { SameAnswerForm } from "./SameAnswerForm";
import { Container, FormFinished } from "./style";
import { Form, IForms, IFormVal, FormVal } from "./types";
import { getInitialValues } from "./utils";
import format from "date-fns/format";
import { MdCheck } from "react-icons/md";
export type CompositeFormObj = { type: "composite" } & Form;
export type SameAnswerFormObj = { type: "same-answer" } & Form;
const CompleteForm: React.FC<{ forms: IForms | null }> = ({ forms }) => {
  const [formValues, setFormValues] = useState<IFormVal>({});
  const [currentPage, setPage] = useState(0);
  useEffect(() => {
    if (forms) {
      setFormValues(getInitialValues(forms));
    }
  }, [forms]);

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: "",
    sex: null,
    birthDate: null,
    birthTime: "",
    phone: "",
    socialName: "",
    firstName: "",
    lastName: "",
  });
  const formComponents = ["identification", ...Object.keys(forms)];

  const [formIsValid, setFormValid] = useState([
    ...Array(formComponents.length).fill(false),
  ]);

  const onFormValueChange = (val: FormVal, key: string) => {
    handleValidChange(!val.flat().includes(null), currentPage);
    setFormValues({
      ...formValues,
      [key]: val,
    });
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

  const containerRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  }, [currentPage]);

  const handleValidChange = (valid: boolean, idx: number) => {
    let newValid = [...formIsValid];
    newValid[idx] = valid;
    setFormValid(newValid);
  };

  const isLastPage = currentPage === formComponents.length - 1;

  const [formFinished, setFormFinished] = useState({
    msg: "",
    error: false,
  });
  const sendResponse = async () => {
    const user = {
      ...userInfo,
      birthDate: format(userInfo.birthDate, "dd/MM/yyyy"),
      msBirthDate: userInfo.birthDate.getTime(),
    };
    try {
      const { data } = await axios.post("/forms/simple", {
        user,
        ...formValues,
      });
      setFormFinished({ msg: data.msg, error: false });
    } catch (e) {
      console.error(e);
      if (e.response?.data?.error) {
        setFormFinished({ msg: e.response.data.error.msg, error: true });
      } else {
        setFormFinished({ msg: "Ocorreu um erro :(", error: true });
      }
    }
  };
  if (formFinished.msg) {
    return (
      <FormFinished>
        {!formFinished.error && <MdCheck />}
        <p>{formFinished.msg}</p>
      </FormFinished>
    );
  }
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
          <h4>Responda para prosseguir </h4>
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
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        forms: null,
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
