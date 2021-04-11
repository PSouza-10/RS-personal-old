import Link from "next/link";
import { Container } from "./style";

const FormIntro: React.FC = () => {
  return (
    <Container>
      <div className="form-intro">
        <h1>Avaliação Física - (Anamnese)</h1>
        <p>
          Olá! Bem vindo(a) a avaliação física de anamnese. Você pode fazer a
          avaliação completa (mais extensa) ou a avaliação simples, que é mais
          rápida porém tem resultados menos precisos.
        </p>
        <p>A anamnese é um (descreva a anamnese)</p>

        <Link href="/avaliacao/simple" passHref>
          <a className="button">Avaliação Simples</a>
        </Link>
        <Link href="/avaliacao/complete" passHref>
          <a className="button">Avaliação Completa</a>
        </Link>
      </div>
    </Container>
  );
};

export default FormIntro;
