import React from "react";
import { Call, Container, Image } from "./styles";
import Link from "next/link";

export function Hero() {
  return (
    <Container>
      <Call>
        <h2>
        Emagreça  de  5 a 15 quilos  em  até  90 dias  de  forma saudável  e  sem  dietas restritivas através  da reprogramação do seu estilo de vida

        </h2>
        <p>
          Você  é  capaz  de  conquistar  o  corpo  que  sempre  sonhou  ter,  só  depende  de  você.
        </p>

      </Call>
      
      <Image>
        <img src="/banner.png" alt="Cliente vendo resultado após 90 dias de foco" />
      </Image>
    </Container>
  );
}
