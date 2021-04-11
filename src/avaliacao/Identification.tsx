import { useState } from "react";
import { IoMdMail, IoMdPerson } from "react-icons/io";
import { MdCake } from "react-icons/md";
import { AiOutlineIdcard } from "react-icons/ai";
import { DateField, FormField } from "../../components";
import { IDFormContainer } from "./style";

export interface IUserInfo {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  birthDate: Date;
  birthTime: string;
}

interface IIdentification {
  setVal: (newVal: IUserInfo) => any;
  val: IUserInfo;
}

export const IdentificationForm: React.FC<IIdentification> = ({
  setVal,
  val,
}) => {
  const [isValid, setValid] = useState({
    email: false,

    firstName: false,
    lastName: false,
  });

  const handleChange = ({ target: { value, name } }, valid: boolean | null) => {
    setVal({
      ...val,
      [name]: value,
    });
    if (valid !== null) {
      setValid({
        ...isValid,
        [name]: valid,
      });
    }
  };

  return (
    <IDFormContainer>
      <p>Os dados inseridos aqui serão utilizados para um possível contato.</p>
      <FormField
        name="firstName"
        type="text"
        label="Nome"
        autoFocus
        value={val.firstName}
        onChange={handleChange}
        icon={<IoMdPerson />}
      />
      <FormField
        name="lastName"
        type="text"
        label="Sobrenome"
        value={val.lastName}
        onChange={handleChange}
        icon={<AiOutlineIdcard />}
      />
      <FormField
        name="email"
        type="email"
        label="E-Mail"
        validate={{
          validIf: "email",
        }}
        value={val.email}
        onChange={handleChange}
        icon={<IoMdMail />}
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
        icon={<MdCake />}
        label="Data de Nascimento"
      />
    </IDFormContainer>
  );
};
