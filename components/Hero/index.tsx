import React from "react";
import { Call, Container, Image } from "./styles";
import Link from "next/link";

export function Hero() {
  return (
    <Container>
      <Call>
        <h2>Consultoria voltada ao aprendizado</h2>
        <p>
          Sua saúde e estética vem das suas escolhas, mas pode ser que você não
          saiba quais escolhas fazer para ter resultados. Por isso o objetivo
          aqui é te ensinar, e auxiliar em seu crescimento pessoal.
        </p>
        <span>
          <Link href="/avaliacao" passHref>
            <a className="button">Avaliação física gratuita </a>
          </Link>
        </span>
      </Call>
      <Image>
        <img src="/banner.webp" alt="Personal trainer auxiliando cliente" />
      </Image>
    </Container>
  );
}
