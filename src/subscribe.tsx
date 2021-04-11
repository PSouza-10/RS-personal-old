import { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 55px);
  color: var(--fg);
  article {
    flex: 1;
    max-height: 88%;
    overflow-y: auto;
    text-align: justify;
    padding: 0.3rem 0.8rem;
  }
  section {
    padding: 0.3rem 0.5rem;
    justify-content: space-between;
    display: flex;
    height: 12%;
    align-items: center;
    border-top: 2px solid var(--primary);
    h3 {
      font-weight: 500;
      font-size: 1rem;
    }
  }

  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      flex-direction: row;
      section {
        border-top: none;
        border-left: 2px solid var(--primary);
        height: 100%;
        flex-direction: column;
        justify-content: center;
        max-width: 35%;
        h3 {
          text-align: center;
          margin-bottom: 1rem;
        }
      }
      article {
        height: 100%;
        max-height: 100%;
      }
    }
  `}
`;

const SubscribePage: React.FC = () => {
  return (
    <Container>
      <article className="scrollbar-grey">
        <h1>Texto de venda</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam nam
          exercitationem explicabo unde repellendus temporibus iusto, voluptate
          ratione dolores eius nihil molestiae numquam repudiandae aliquam vitae
          dolorum sed aut consectetur reiciendis? Adipisci sit eum obcaecati
          harum quidem, ipsum repellendus laboriosam nobis aliquid vitae
          expedita soluta fugiat, suscipit iste perspiciatis neque commodi
          aspernatur dolorem veniam quas optio delectus. Sapiente blanditiis
          mollitia, quam libero non sequi, voluptatum dolore qui minus eaque
          animi quae architecto nam corporis? Labore saepe eum placeat laborum
          magnam voluptas omnis fuga rem itaque optio, modi provident, quaerat
          suscipit quod odit dolore, enim eos quas pariatur dolorum unde
          consequuntur! Voluptatibus sapiente molestias in esse reiciendis
          eligendi, ad ipsam reprehenderit deleniti sed iusto velit quae hic
          aspernatur nam eveniet dolorem assumenda tempore perferendis
          dignissimos nemo consequatur eaque. Magnam natus pariatur illum
          aliquid, veniam sed sapiente unde officiis recusandae optio nisi amet
          alias at, excepturi, ea blanditiis corrupti quaerat dicta! Asperiores
          itaque odio cum commodi vero facilis labore repellendus iusto ex ipsa
          sapiente suscipit sequi numquam dicta, sint nam quasi eaque. Qui culpa
          ratione ducimus autem illum cum fuga magni dolorem nobis quasi natus,
          facere obcaecati? Necessitatibus voluptates obcaecati aperiam repellat
          debitis perspiciatis quaerat nesciunt nisi, totam corporis sequi ad
          non, molestiae corrupti, libero aliquid accusantium ullam distinctio
          consequuntur et facere perferendis. Fugiat quo excepturi quos ex
          explicabo facilis pariatur temporibus nostrum dolorem, iure nobis
          aperiam, obcaecati distinctio, deleniti ratione et autem qui
          blanditiis rem rerum ipsum. Officiis eligendi officia, laudantium ex
          non accusantium ab consectetur eaque voluptatum tenetur iste, tempora
          mollitia eius facere quisquam animi amet? Repellendus, at illum ex
          blanditiis similique consequatur ut laudantium adipisci ratione
          assumenda nesciunt labore rerum possimus itaque inventore incidunt
          quos quia molestias minus recusandae odio perspiciatis corrupti porro
          esse! Praesentium quasi enim doloremque dolore. Cupiditate explicabo
          fugit rem nemo quibusdam doloribus quisquam, molestiae architecto.
        </p>
      </article>
      <section>
        <h3>Consultoria por R$ 69,99 ao mês</h3>

        <a className="button" href="https://hotmart.com">
          Inscreva-se
        </a>
      </section>
    </Container>
  );
};

export default SubscribePage;
