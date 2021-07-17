import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";
import styled from "styled-components";
import { Loading } from "../components";
import { Controller } from "../src/checkup";
import { forms } from "../src/checkup/form";
import { IdentificationForm, IUserInfo } from "../src/checkup/Identification";
import { FormFinished } from "../src/checkup/style";
import { CheckupState } from "../src/checkup/types";
import {
  getInitialState,
  reloadFromLastSession,
  sendFormValues,
} from "../src/checkup/utils";
import format from "date-fns/format";
const Container = styled.main`
  & > .button {
  }
`;
const defaultUserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: null,
  birthTime: "",
  height: 0,
  weight: 0,
  sex: null,
};
const steps = ["id", "form", "finish"] as const;
export default function Checkup() {
  const [step, setStep] = useState<typeof steps[number]>("id");
  const [formState, setFormState] = useState(() =>
    reloadFromLastSession<CheckupState>(
      "checkupData",
      getInitialState(forms).state
    )
  );
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [valid, setValid] = useState(false);
  const [{ loading, msg, error }, setFinishState] = useState({
    msg: "",
    error: false,
    loading: false,
  });
  async function onSubmit() {
    setStep("finish");
    // console.log({ userInfo, answers });
    setFinishState({ msg, error, loading: true });
    const user = {
      ...userInfo,
      birthDate: format(userInfo.birthDate, "dd/MM/yyyy"),
      msBirthDate: userInfo.birthDate.getTime(),
    };
    const response = await sendFormValues({
      userInfo: user,
      answers: formState,
    });

    setFinishState({ ...response, loading: false });
  }
  useEffect(() => {
    const val = reloadFromLastSession<{ userInfo: IUserInfo; valid: boolean }>(
      "checkupUserData",
      { userInfo: defaultUserInfo, valid: false }
    );
    setUserInfo({
      ...val.userInfo,
      birthDate: new Date(val.userInfo.birthDate),
    });
    setValid(val.valid);
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "checkupUserData",
      JSON.stringify({ userInfo, valid })
    );
  }, [userInfo, valid]);
  if (loading) {
    return <Loading wholePage />;
  }

  if (step === "finish") {
    return (
      <>
        <Head>
          <title>Obrigado por responder!</title>
        </Head>
        <FormFinished>
          {error ? <MdClose /> : <MdCheck />}
          <p>{msg}</p>
          {error && (
            <button className="button" onClick={onSubmit}>
              Tentar enviar novamente
            </button>
          )}
          <Link href="/" passHref>
            <a className="button">Voltar a página inicial</a>
          </Link>
        </FormFinished>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkup Funcional - RS Personal</title>
      </Head>
      {step === "id" ? (
        <>
          <IdentificationForm
            val={userInfo}
            setVal={setUserInfo}
            setFormValid={setValid}
            parentIsValid={valid}
          />
          <button
            className="button"
            disabled={!valid}
            onClick={() => setStep("form")}
            style={{
              margin: "0 auto",
              fontSize: "1.3rem",
            }}
          >
            Iniciar a avaliação
          </button>
        </>
      ) : (
        <Controller
          formState={formState}
          setFormState={setFormState}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}
