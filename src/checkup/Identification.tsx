import { useEffect, useState } from "react";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import { MdAccessTime, MdCake, MdPhone } from "react-icons/md";
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
  height: number;
  weight: number;
  sex: "Masculino" | "Feminino" | null;
}

interface IIdentification {
  setVal: (newVal: IUserInfo) => any;
  val: IUserInfo;
  setFormValid: (valid: boolean) => void;
  parentIsValid: boolean;
}
export const IdentificationForm: React.FC<IIdentification> = ({
  setVal,
  val,
  setFormValid,
  parentIsValid,
}) => {
  const [isValid, setValid] = useState<Record<keyof IUserInfo, boolean>>({
    email: false,
    phone: false,
    firstName: false,
    lastName: false,
    sex: false,
    birthDate: false,
    birthTime: false,
    height: false,
    weight: false,
  });

  const handleChange = ({ target: { value, type = "text", name } }, valid) => {
    let newVal = type === "number" ? Number(value) : value;

    setVal({
      ...val,
      [name]: newVal,
    });

    let valueIsValid = false;
    if (value || (typeof value === "number" && value === 0)) {
      valueIsValid = true;
    }
    const newValidState = {
      ...isValid,
      [name]: valid === null ? valueIsValid : valid,
    };
    setValid(newValidState);
    const { birthTime, ...vals } = newValidState;
    const formIsValid = !Object.values(vals).includes(false);

    setFormValid(formIsValid);
  };
  useEffect(() => {
    if (Object.values(isValid).includes(!parentIsValid)) {
      setValid(
        Object.fromEntries(
          Object.keys(isValid).map((key) => [key, parentIsValid])
        ) as Record<keyof IUserInfo, boolean>
      );
    }
  }, [parentIsValid]);
  return (
    <IDFormContainer>
      <h2 className="form-instructions" tabIndex={0}>
        Os dados Inseridos aqui serão utilizados para um possível contato.
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={(e) =>
          e.key === "Enter" || !e.key ? e.preventDefault() : null
        }
      >
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
        <FormField
          label="Altura (cm)"
          name="height"
          id="height"
          type="number"
          value={val.height}
          onChange={(e) => handleChange(e, null)}
        />
        <FormField
          label="Peso (kg)"
          name="weight"
          id="weight"
          type="number"
          value={val.weight}
          onChange={(e) => handleChange(e, null)}
        />
        <RadioGroup
          name="sex"
          radioLabel="Sexo"
          className="identification-radio"
          options={[
            {
              label: "Masculino",
              value: "Masculino",
              id: "male",
              checked: val.sex === "Masculino",
            },
            {
              label: "Feminino",
              value: "Feminino",
              id: "female",
              checked: val.sex === "Feminino",
            },
          ]}
          onChange={(e) => handleChange(e, null)}
        />
        {/* <p>{JSON.stringify(isValid)}</p> */}
      </form>
    </IDFormContainer>
  );
};
