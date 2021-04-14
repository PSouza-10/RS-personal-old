import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useRef, useState } from "react";
import { CompositeRadioForm } from "./CompositeRadioForm";
import { IdentificationForm, IUserInfo } from "./Identification";
import { SameAnswerForm } from "./SameAnswerForm";
import { Container } from "./style";
import { Form, IForms, IFormVal } from "./types";
import { getInitialValues } from "./utils";

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
    birthDate: new Date(),
    birthTime: "",
    phone: "",
    socialName: "",
    firstName: "",
    lastName: "",
  });
  const buildFormPage = (key: string) => {
    if (forms[key].type === "composite") {
      return (
        <CompositeRadioForm
          setValue={(val) =>
            setFormValues({
              ...formValues,
              [key]: val,
            })
          }
          val={formValues[key]}
          content={forms[key] as CompositeFormObj}
          formKey={key}
        />
      );
    } else {
      return (
        <SameAnswerForm
          setValue={(val) =>
            setFormValues({
              ...formValues,
              [key]: val,
            })
          }
          val={formValues[key]}
          content={forms[key] as SameAnswerFormObj}
          formKey={key}
        />
      );
    }
  };
  const formComponents = ["identification", ...Object.keys(forms)];

  const containerRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
    }
  }, [currentPage]);
  return (
    <Container className="page-container multipart-form" ref={containerRef}>
      {currentPage === 0 ? (
        <>
          <h2 className="form-instructions" tabIndex={0}>
            Os dados Inseridos aqui serão utilizados para um possível contato.
          </h2>
          <IdentificationForm
            val={userInfo}
            setVal={(value) => setUserInfo(value)}
          />
        </>
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
        {currentPage === formComponents.length - 1 ? (
          <button className="button">Enviar</button>
        ) : (
          <button
            className="button"
            onClick={() => setPage((page) => page + 1)}
          >
            Próximo
          </button>
        )}
      </section>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data } = await axios.get("/forms/" + context.params.type);

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
