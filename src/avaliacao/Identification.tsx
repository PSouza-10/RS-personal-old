import { useState } from "react";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import {
  MdAccessTime,
  MdCake,
  MdPhone,
  MdSentimentSatisfied,
} from "react-icons/md";
import { AiOutlineIdcard } from "react-icons/ai";
import { DateField, FormField } from "../../components";
import { IDFormContainer } from "./style";
import { RadioGroup } from "../../components/Form/Radio";
import { TimeField } from "../../components/Form/TimeField";

export interface IUserInfo {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  birthDate: Date | null;
  birthTime: string;
  socialName: string;
  sex: 1 | 2 | null;
}

interface IIdentification {
  setVal: (newVal: IUserInfo) => any;
  val: IUserInfo;
  setFormValid: (valid: boolean) => void;
}

export const IdentificationForm: React.FC<IIdentification> = ({
  setVal,
  val,
  setFormValid,
}) => {
  const [isValid, setValid] = useState({
    email: false,
    phone: false,
    firstName: false,
    lastName: false,
    sex: false,
    birthDate: false,
    birthTime: false,
  });

  const handleChange = ({ target: { value, name } }, valid: boolean | null) => {
    let newVal = value;

    if (name === "sex") {
      newVal = parseInt(value);
    }

    setVal({
      ...val,
      [name]: newVal,
    });
    let valueIsValid = false;
    if (value || (typeof value === "number" && value === 0)) {
      valueIsValid = true;
    }
    const newState = {
      ...isValid,
      [name]: valid === null ? valueIsValid : valid,
    };
    setValid(newState);

    const formIsValid = !Object.values(newState).includes(false);

    setFormValid(formIsValid);
  };

  return (
    <IDFormContainer>
      <h2 className="form-instructions" tabIndex={0}>
        Os dados Inseridos aqui serão utilizados para um possível contato.
      </h2>
      <form>
        <FormField
          name="firstName"
          type="text"
          label="Nome"
          id="firstName"
          autoFocus
          value={val.firstName}
          onChange={handleChange}
          icon={<IoMdPerson />}
        />
        <FormField
          name="lastName"
          type="text"
          id="lastName"
          label="Sobrenome"
          value={val.lastName}
          onChange={handleChange}
          icon={<AiOutlineIdcard />}
        />
        {/* <FormField
        name="socialName"
        type="text"
        id="socialName"
        label="Nome Social (Opcional)"
        value={val.socialName}
        onChange={handleChange}
        icon={<MdSentimentSatisfied />}
      /> */}
        <FormField
          name="email"
          type="email"
          label="E-Mail"
          id="email"
          validate={{
            validIf: "email",
          }}
          value={val.email}
          onChange={handleChange}
          icon={<IoMdMail />}
        />
        <FormField
          id="phone"
          name="phone"
          label="Número de celular"
          value={val.phone}
          validate={{
            validIf: "phone",
          }}
          type="tel"
          onChange={handleChange}
          icon={<MdPhone />}
        />
        <DateField
          value={val.birthDate}
          onChange={(newDate) =>
            handleChange(
              {
                target: {
                  name: "birthDate",
                  value: newDate,
                },
              },
              null
            )
          }
          id="birthDate"
          name="birthDate"
          icon={<MdCake />}
          label="Data de Nascimento"
        />
        <TimeField
          value={val.birthTime}
          onChange={(newTime) =>
            handleChange(
              {
                target: {
                  name: "birthTime",
                  value: newTime,
                },
              },
              null
            )
          }
          id="birthTime"
          name="birthTime"
          icon={<MdAccessTime />}
          label="Horário de Nascimento (Opcional)"
        />
        <RadioGroup
          name="sex"
          radioLabel="Sexo"
          className="identification-radio"
          options={[
            {
              label: "Masculino",
              value: 1,
              id: "male",
              checked: val.sex === 1,
            },
            {
              label: "Feminino",
              value: 2,
              id: "female",
              checked: val.sex === 2,
            },
          ]}
          onChange={(e) => handleChange(e, null)}
        />
        {/* <p>{JSON.stringify(isValid)}</p> */}
      </form>
    </IDFormContainer>
  );
};
