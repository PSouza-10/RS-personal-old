import React from "react";
import { Container, TrifectaWrapper } from "./_style";
import { Hero } from "../../components";
import Link from "next/link";
import Head from "next/head";
import { IoBodyOutline } from "react-icons/io5";
export default function Home() {
  return (
    <Container>
      <Head>
        <title>Rs-Personal - Home</title>
      </Head>
      <Hero />

      <section className="explore">
        <h2>Os três componentes do Desenvolvimento Pessoal</h2>

        <Trifecta />

        <p>
          Para alcançar seus objetivos tanto na saúde como na vida, seu Corpo,
          Mente e Espírito devem estar sincronizados e estáveis. O trabalho do
          personal treinar não é só ajudar a desenvolver e estabilizar o corpo,
          mas sim o todo do indivíduo.
        </p>
        <nav>
          <Link href="/explore/body">
            <button className="button">Aprenda mais Sobre o corpo</button>
          </Link>
          <Link href="/explore/mind">
            <button className="button">Aprenda mais Sobre a mente</button>
          </Link>
          <Link href="/explore/spirit">
            <button className="button">Aprenda mais sovre o espírito</button>
          </Link>
        </nav>
      </section>
    </Container>
  );
}

const Trifecta = () => {
  return (
    <TrifectaWrapper>
      <div className="triangle">
        <Link href="/explore/body">
          <a className="word">Corpo</a>
        </Link>
        <Link href="/explore/mind">
          <a className="word">Mente</a>
        </Link>
        <Link href="/explore/spirit">
          <a className="word">Espírito</a>
        </Link>
        <div className="inner-triangle">
          <IoBodyOutline className="body" />
        </div>
      </div>
    </TrifectaWrapper>
  );
};
