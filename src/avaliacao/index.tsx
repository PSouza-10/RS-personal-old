import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { Container } from "./style";

const FormIntro: React.FC = () => {
  return (
    <Container>
      <div className="form-intro" tabIndex={0}>
        <h1>Avaliação Física - (Anamnese)</h1>
        <p>
          Olá! Bem vindo(a) a avaliação física de anamnese. Você pode fazer a
          avaliação completa (mais extensa) ou a avaliação simples, que é mais
          rápida porém tem resultados menos precisos.
        </p>
        <p>A anamnese é um (descreva a anamnese)</p>

        <Link href="/avaliacao/simple" passHref>
          <a className="form-opt" aria-labelledby="av_simples">
            <h4 id="av_simples">Avaliação Simples</h4>
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
    </Container>
  );
};

export default FormIntro;
