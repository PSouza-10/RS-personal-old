import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { CompositeRadioForm } from "./CompositeRadioForm";
import { IdentificationForm, IUserInfo } from "./Identification";
import { SameAnswerForm } from "./SameAnswerForm";
import { Container } from "./style";
import { getInitialValues } from "./utils";
export interface Form {
  title: string;
  questions: any | any[];
  results: string[];
  opts?: [string, number][];
  type: "composite" | "same-answer";
}
export interface IForms {
  [x: string]: Form;
}
export type FormVal = Array<null | number | null[] | number[]>;
interface IFormVal {
  [x: string]: FormVal;
}
const FormIntro: React.FC<{ forms: IForms | null }> = ({ forms }) => {
  const [formValues, setFormValues] = useState<IFormVal>({});
  const [currentPage, setPage] = useState(0);
  useEffect(() => {
    if (forms) {
      setFormValues(getInitialValues(forms));
    }
  }, [forms]);

  const [userInfo, setUserInfo] = useState<IUserInfo>({
    email: "",

    birthDate: new Date(),
    birthTime: "",
    phone: "",
    firstName: "",
    lastName: "",
  });

  const formPages = [
    <IdentificationForm
      setVal={(newVal) => setUserInfo(newVal)}
      val={userInfo}
    />,
    <SameAnswerForm
      setValue={(val) =>
        setFormValues({
          ...formValues,
          stress: val,
        })
      }
      val={formValues["stress"]}
      content={forms["stress"]}
      formKey="stress"
    />,
    <CompositeRadioForm
      setValue={(val) =>
        setFormValues({
          ...formValues,
          "life-quality": val,
        })
      }
      val={formValues["life-quality"]}
      content={forms["life-quality"]}
      formKey="life-quality"
    />,
  ];
  return (
    <Container className="page-container">
      {forms && formValues && formPages[currentPage]}
      <section className="page-nav">
        {currentPage !== 0 && (
          <button
            className="button"
            onClick={() => setPage((page) => page - 1)}
          >
            Anterior
          </button>
        )}
        {currentPage === formPages.length - 1 ? (
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
    const { data } = await axios.get("/forms");

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
export default FormIntro;
