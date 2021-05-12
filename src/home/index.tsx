import React from "react";
import { Container } from "./_style";
import { Hero } from "../../components";

import Head from "next/head";

export default function Home() {
  return (
    <Container className="page-container">
      <Head>
        <title>RS-Personal - Home</title>
      </Head>
      <Hero />

      <section className="explore">
        <nav>
          <a href="#how-it-works">Como funciona</a>
          <a href="#history">Histórias de sucesso</a>
          <a href="#reinaldo">Reinaldo Santos</a>
        </nav>

        <div className="how-it-works" id="how-it-works">
          <section className="card">
            <h3>O que é o 90/ 5 a 15 ?</h3>
            <p>
              O 90/ 5 a 15 é um método 100% online cuidadosamente elaborado para
              ajudar você a emagrecer de 5 a 15 quilos em até 90 dias de forma
              saudável e segura usando um procedimento simples, mas muito
              poderoso capaz de derreter a sua gordura corporal.
            </p>
          </section>
          <section className="card">
            <h3>O 90/ 5 a 15 funciona para mim?</h3>
            <p>
              O 90/ 5 a 15 certamente funciona para qualquer pessoa que deseja
              emagrecer saudavelmente e esteja disposta a transformar o seu
              estilo de vida seguindo as orientações necessárias para alcançar
              esse objetivo.
            </p>
          </section>
          <section className="card">
            <h3>Como funciona o 90/ 5 a 15 ?</h3>
            <p>
              O primeiro passo é você fazer um checkup da sua saúde funcional. O
              resultado será enviado para o seu email, gratuitamente no conforto
              da sua casa.Entrarei em contato para agendarmos uma consulta
              online e assim você poderá fazer a sua inscrição no 90/ 5 a 15.
              Vou ajudar você a entender melhor o seu momento atual, corrigindo
              o seu comportamento presente e adaptando o seu estilo de vida para
              o seu bem-estar físico, mental e emocional. Emagrecer, além de um
              estado do consciência, é também uma escolha. Faça a melhor escolha
              para sua vida.
            </p>
          </section>

          <section className="button-container">
            <h3>Clique no botão abaixo e faça o seu checkup gratuito.</h3>
            <button>
              {" "}
              <span>Quero fazer o meu Checkup Funcional</span>
            </button>
          </section>
        </div>

        <div className="history" id="history">
          <h4>Histórias de Sucesso</h4>

          <div className="container">
            <section className="history-card">
              <img src="/success.png" alt="moça" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                odio, nisi eum eveniet similique totam suscipit dolorem ducimus,{" "}
              </p>
            </section>
            <section className="history-card">
              <img src="/success.png" alt="moça" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                odio, nisi eum eveniet similique totam suscipit dolorem ducimus,{" "}
              </p>
            </section>
            <section className="history-card">
              <img src="/success.png" alt="moça" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                odio, nisi eum eveniet similique totam suscipit dolorem ducimus,
              </p>
            </section>
          </div>
        </div>

        <div className="who-am-i" id="reinaldo">
          <h4>Quem sou eu?</h4>

          <div className="wrapper">
            <img src="/reinaldo.png" alt="Reinaldo Santos" />
            <p>
              Eu sou <strong>Reinaldo Santos</strong>, Educador Físico e
              Nutricionista. Atuo como personal trainer e uso o meu conhecimento
              e experiência para ajudar pessoas a emagrecerem através de um
              método simples e poderoso focado nos pilares da saúde funcional
              por meio da reprogramação do estilo de vida.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
