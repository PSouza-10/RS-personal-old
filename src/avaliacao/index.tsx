import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import { Modal } from "../../components";
import { Checkbox } from "../../components/Form/Checkbox";
import { EULA, Privacy } from "../Agreements";
import { Container } from "./style";

const FormIntro: React.FC = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState("EULA");

  const openModal = (key: string) => {
    setCurrentText(key);
    setModalOpen(true);
  };

  const agreements = {
    EULA: {
      title: "Contrato de Licença do Usuário Final",
      content: <EULA />,
    },
    Privacy: {
      title: "Política de Privacidade",
      content: <Privacy />,
    },
  };
  return (
    <Container>
      <Head>
        <title>Avaliação de Anamnese</title>
      </Head>
      <div className="form-intro" tabIndex={0}>
        <h1>Avaliação Física - (Anamnese)</h1>
        <p>
          Olá! Bem vindo(a) a avaliação física de anamnese. Esse teste tem o
          objetivo de diagnosticar o estado físico de que o responde, e
          determinar qual o melhor modo de tratá-lo no caso de um problema.
        </p>
        <p>
          Após enviar as respostas do questionário, você será contatado pela
          nossa equipe sobre os resultados e recomendações por uma das formas de
          contato que informar a seguir.
        </p>

        <p>O questionário e seus resultados são completamente gratuitos.</p>

        <p>
          Ao prosseguir, você concorda com nosso{" "}
          <span onClick={() => openModal("EULA")}>{agreements.EULA.title}</span>{" "}
          e com a nossa{" "}
          <span onClick={() => openModal("Privacy")}>
            {agreements.Privacy.title}
          </span>
          .
        </p>
        <Link href="/avaliacao/simple" passHref>
          <a className="form-opt" aria-labelledby="av_simples">
            <h4 id="av_simples">Fazer a Avaliação</h4>
            <MdArrowForward />
          </a>
        </Link>

        {/* <Link href="/avaliacao/complete" passHref>
          <a className="form-opt" aria-labelledby="av_completa">
            <h4 id="av_completa">Avaliação Completa</h4>
            <MdArrowForward />
          </a>
        </Link> */}
      </div>
      <Modal
        visible={modalIsOpen}
        toggleVisibility={() => setModalOpen(!modalIsOpen)}
        header={{
          title: agreements[currentText].title,
        }}
      >
        {agreements[currentText].content}
      </Modal>
    </Container>
  );
};

export default FormIntro;
