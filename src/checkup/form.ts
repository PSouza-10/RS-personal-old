import { Forms } from "./types";
import {
  YesNoOptions,
  YesNoOptionsReversed,
  ZeroToTenQuestions,
  alcoholUnits,
  timeMeasures,
  smallTimeMeasures,
} from "./constants";

const shouldSkip6and7ofTraining = (state) => {
  const str = (state["trainingHistory"][0].nested[0] as string)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  console.log(str);
  if (str.toLowerCase() === "musculacao") {
    return false;
  } else {
    return true;
  }
};

export const forms: Forms = {
  diseaseHistory: [
    {
      predicate: "Você porta alguma doença crônica?",

      type: "confirm",
      nested: [
        {
          predicate: "Qual, ou quais doenças?",
          type: "checklist",
          items: [
            "Diabetes",
            "Hipertensão",
            "Colesterol",
            "Triglicerides",
            "Obesidade",
            "Coronariopatia",
            "Outras",
          ],
        },
      ],
    },
    {
      predicate: "Há alguem na familia com doença crônica ou coronária?",

      type: "confirm",
      nested: [
        {
          predicate: "Quem tem essas doenças em sua família?",
          type: "list",
          limit: 3,
        },
      ],
    },
    {
      predicate: "Você sente algum tipo de dor intermitente?",

      type: "confirm",
      nested: [
        {
          predicate: "Quais dores sente?",
          type: "list",
        },
      ],
    },
    {
      predicate: "Você está realizando algum tratamento médico, patológico?",

      type: "confirm",
      nested: [
        {
          predicate: "Qual tratamento está realizando?",
          type: "text",
        },
      ],
    },
    {
      predicate:
        "Faz uso de algum tipo de medicamento ou substância controlada?",

      type: "confirm",
      nested: [
        {
          predicate: "Que medicamentos medicamentos ou substâncias usa?",
          type: "list",
        },
      ],
    },
    {
      predicate: "Já fez algum tipo de cirurgia?",

      type: "confirm",
      nested: [
        {
          predicate: "Que cirurgia você fez?",
          type: "text",
        },
      ],
    },
    {
      predicate: "Já fraturou alguma parte do corpo?",

      type: "confirm",
      nested: [
        {
          predicate: "Qual parte do corpo?",
          type: "text",
        },
        {
          predicate: "A quanto tempo ocorreu a fratura?",
          type: "unit",
          unit: timeMeasures,
        },
      ],
    },
    {
      predicate: "Você ficou com alguma sequela?",

      type: "confirm",
      nested: [
        {
          predicate: "Com quais sequelas ficou?",
          type: "list",
        },
      ],
    },
  ],
  lifeHabits: [
    {
      type: "text",
      predicate: "Qual é o seu ramo de atuação profissional?",
    },
    {
      type: "confirm",
      negative: true,
      predicate: (state) =>
        `Trabalha atualmente como ${state["lifeHabits"][0].value}?`,
      nested: [
        {
          type: "text",
          predicate:
            "Como se sente por não atuar profissionalmente no seu ramo?",
        },
      ],
    },
    {
      type: "confirm",
      predicate: "Você é Fumante?",
      nested: [
        {
          type: "unit",
          unit: timeMeasures,
          predicate: "A quanto tempo?",
        },
        {
          type: "choose",
          predicate: "Até quantos cigarros fuma por dia?",
          opts: [
            { label: "Até 10", value: 2 },
            { label: "Até 20", value: 4 },
            { label: "Até 30", value: 8 },
            { label: "30 ou mais", value: 10 },
          ],
        },
      ],
    },
    {
      type: "confirm",
      predicate: "Você ingere bebida alcoólica?",
      nested: [
        {
          type: "unit",
          predicate: "Que quantidade?",
          unit: alcoholUnits,
        },
        {
          type: "choose",
          predicate: "Com que frequência?",
          opts: [
            { label: "Semanalmente", value: "Semanalmente" },
            { label: "Diariamente", value: "Diariamente" },
            { label: "Anualmente", value: "Anualmente" },
            { label: "Mensalmente", value: "Mensalmente" },
          ],
        },
      ],
    },
    {
      type: "number",
      id: "tv",
      predicate: "Quantas horas passa diante da TV em média, por dia?",

      nested: [
        {
          type: "list",
          predicate: "Que tipo de programas assiste?",
        },
      ],
    },
    {
      type: "confirm",
      predicate: "Costuma acordar a noite para urinar?",
      nested: [
        {
          type: "confirm",
          predicate: "Acorda para urinar mais de uma vez?",
        },
      ],
    },
    {
      type: "list",
      predicate: "Qual ou quais gêneros de música costuma ouvir?",
    },

    {
      type: "confirm",
      predicate: "Costuma acordar a noite para beber água?",
      nested: [
        {
          type: "confirm",
          predicate: "Acorda para tomar água mais de uma vez?",
        },
      ],
    },
  ],
  sleepHistory: [
    {
      predicate: "Quantas horas você dorme em média por noite?",

      type: "number",
    },
    {
      predicate: "A que horas se recolhe para dormir?",
      type: "text",
    },
    {
      predicate: "Costuma sentir sonolência?",
      type: "confirm",
      nested: [
        {
          type: "checklist",
          items: [
            "Ao dirigir + 5",
            "A qualquer momento do dia + 5",
            "Depois do almoço + 3",
            "Em local público + 5",
            "Ao ler ou ver tv",
          ],
          predicate: "Em qual ou quais momentos do dia?",
        },
      ],
    },
    {
      predicate: "O seu celular fica no quarto enquanto dorme?",
      type: "confirm",
    },
    {
      predicate: "Que atividades faz de 3 a 5 horas antes de dormir?",
      type: "list",
    },
    {
      predicate: "Você tem alguma dificuldade para dormir?",
      type: "confirm",
      nested: [{ type: "text", predicate: "Descreva" }],
    },
    {
      predicate: "Você tem um sono tranquilo?",
      type: "confirm",
      negative: true,
      nested: [{ type: "text", predicate: "Como se comporta dormindo?" }],
    },
    {
      predicate:
        "Geralmente acorda sozinho(a) ou precisa do despertador para acordar?",
      type: "choose",
      opts: [
        { label: "Acordo sozinho(a)", value: true },
        { label: "Preciso de despertador", value: false },
      ],
    },
    {
      predicate: "Você acorda renovado(a), disposto(a) ?",
      type: "confirm",
      negative: true,
      nested: [{ type: "text", predicate: "Como se sente?" }],
    },
  ],
  stress: [
    {
      type: "choose",
      predicate:
        "De 0 a 10 qual a dificuldade com que você lida com situações dificeis?",
      opts: ZeroToTenQuestions,
    },
    {
      type: "choose",
      predicate: "De 0 a 10  qual o seu grau de preocupação no dia a dia?",
      opts: ZeroToTenQuestions,
    },
    {
      type: "choose",
      predicate: "De 0 a 10 Qual o seu grau de ansiedade?",
      opts: ZeroToTenQuestions,
    },
    {
      type: "choose",
      predicate: "De 0 a 10 o quanto o stress limita as suas ações diárias?",
      opts: ZeroToTenQuestions,
    },
    {
      type: "choose",
      predicate:
        "De 0 a 10 o quanto se sente frustrado(a) em relação a sua vida ?",
      opts: ZeroToTenQuestions,
    },
  ],
  motivation: [
    {
      predicate: "De 0 a 10 o quanto você se sente motivado(a) diante da vida",
      type: "choose",
      opts: ZeroToTenQuestions,
    },
    {
      predicate: "De 0 a 10 o quanto você persegue os seus objetivos",
      type: "choose",
      opts: ZeroToTenQuestions,
    },
    {
      predicate: "De 0 a 10 o quanto você se considera focado(a)",
      type: "choose",
      opts: ZeroToTenQuestions,
    },
    {
      predicate:
        "De 0 a 10 o quanto as dificuldades te impedem de avançar na vida",
      type: "choose",
      opts: ZeroToTenQuestions,
    },
    {
      predicate: "De 0 a 10, o quanto você termina o que começa?",
      type: "choose",
      opts: ZeroToTenQuestions,
    },
  ],
  emotionalHistory: [
    {
      type: "confirm",
      predicate: "Você tem medo de algo na sua vida?",
      nested: [{ predicate: "Do que você tem medo?", type: "text" }],
    },
    {
      predicate:
        "De 0 a 10 o quanto as suas emocões interferem no seu comportamento diario?",
      type: "choose",
      opts: ZeroToTenQuestions,
    },
    {
      predicate:
        "De 0 a 10 o quanto você diria que esta satisfeito(a) consigo mesmo(a)?",
      type: "choose",
      opts: ZeroToTenQuestions,
    },
    {
      type: "text",
      predicate: "Qual é seu maior desejo na vida?",
    },
    {
      predicate:
        "De 0 a 10, o quanto você diria que está insatisfeito(a) com sua vida?",
      type: "choose",
      opts: ZeroToTenQuestions,
    },
    {
      type: "text",
      predicate: "Se você pudesse, o que faria diferente na sua vida?",
      nested: [{ type: "text", predicate: "Por que?" }],
    },
    {
      predicate: "De 0  a 10, o quanto você diria que conhece a si mesmo?",
      type: "choose",
      opts: ZeroToTenQuestions,
      nested: [
        { type: "confirm", predicate: "Acha isso importante?" },
        { type: "text", predicate: "Por que?" },
      ],
    },
    {
      type: "confirm",
      predicate: "Em algum momento você já chegou a pensar em suicídio?",
    },
  ],
  socioEconomicCondition: [
    {
      type: "confirm",
      predicate: "Você tem condução própria?",
      nested: [
        {
          type: "confirm",
          predicate: "Você tem casa própria?",
        },
      ],
    },
    {
      type: "confirm",
      predicate: "Você é casado(a)?",
      nested: [
        {
          type: "confirm",
          predicate: "Tem filhos?",
        },
      ],
    },
    {
      type: "choose",
      predicate: "Como é a sua atividade/trabalho?",
      opts: [
        { label: "Trabalho em casa", value: "Trabalho em casa" },
        { label: "Trabalho no escritório", value: "Trabalho no escritório" },
        { label: "Não trabalho", value: "Não trabalho" },
        { label: "Nenhuma das opções", value: "Nenhuma das opções" },
      ],
      nested: [
        { type: "confirm", predicate: "Gosta de realizar esta atividade?" },
      ],
    },
    {
      type: "confirm",
      predicate: "Preferiria realizar outra atividade?",
      nested: [{ type: "text", predicate: "Qual atividade?" }],
    },
    {
      type: "text",
      predicate: "O que gosta de fazer nas horas de lazer?",
    },
  ],
  trainingHistory: [
    {
      type: "confirm",
      predicate: "Pratica alguma atividade ou treinamento físico?",
      formDefining: true,
      nested: [
        { type: "text", predicate: "Qual atividade?" },
        {
          type: "unit",
          unit: timeMeasures,
          predicate: "A quanto tempo?",
        },
      ],
    },
    {
      type: "confirm",
      predicate: "Possui alguma limitação física?",
      nested: [{ type: "list", predicate: "Qual ou quais limitações possui?" }],
    },
    {
      type: "unit",
      unit: smallTimeMeasures,
      predicate: "Quanto tempo dura seu treino ou atividade?",
      nested: [
        { type: "number", predicate: "Quantos dias por semana?" },
        { type: "confirm", predicate: "Você treina perto de casa?" },
      ],
    },
    {
      type: "choose",
      predicate: "Em que período costuma ou prefere treinar?",
      opts: [
        { label: "A noite", value: "Noite" },
        { label: "A tarde", value: "Tarde" },
        { label: "De dia", value: "Manhã" },
      ],
      nested: [
        {
          type: "choose",
          predicate: "Treina sozinho(a) ou com alguém?",
          opts: [
            {
              label: "Sozinho(a)",
              value: "Sozinho(a)",
            },
            {
              label: "Acompanhado(a)",
              value: "Acompanhado(a)",
            },
          ],
        },
      ],
    },
    {
      predicate: "Descreva brevemente o seu treino",
      type: "text",
      skipIf: shouldSkip6and7ofTraining,
    },
    {
      type: "confirm",
      predicate: "Você já usou esteróides anabolizantes?",
      nested: [
        { type: "list", predicate: "Quais esteróides?" },
        {
          type: "list",
          predicate: "Se teve efeitos colaterais, liste-os, se não prossiga",
          optional: true,
        },
      ],
      skipIf: shouldSkip6and7ofTraining,
    },
  ],
  nutrition: [
    {
      predicate: "Quantas refeições você faz por dia?",
      type: "number",
      nested: [
        {
          predicate: "Em casa ou na rua?",
          type: "choose",
          opts: [
            { label: "Em casa", value: "casa" },
            { label: "Na rua", value: "rua" },
          ],
        },
      ],
    },
    {
      predicate: "Você cozinha?",
      type: "confirm",
    },
    {
      predicate: "Tem alguma restrição alimentar, alergia a algum alimento?",
      type: "confirm",
      nested: [
        {
          predicate: "Descreva",
          type: "text",
        },
      ],
    },
    {
      predicate: "Seu intestino funciona regularmente?",
      type: "confirm",
      nested: [
        {
          predicate: "Descreva",
          type: "text",
        },
      ],
    },
    {
      predicate: "Alguma vez já se consultou com um nutricionista?",
      type: "confirm",
      nested: [{ predicate: "Como foi?", type: "text" }],
    },
    {
      type: "checklist",
      items: ["Doces", "Massas", "Carnes"],
      predicate: "Tem alguma das seguintes preferências alimentares?",
    },
    {
      predicate: "Costuma atacar a geladeira a noite?",
      type: "confirm",
      nested: [
        { predicate: "Que horário?", type: "number" },
        { predicate: "Como se sente fazendo isso?", type: "text" },
      ],
    },
    {
      predicate: "Geralmente come o que tem, ou seleciona o que come?",
      type: "choose",
      opts: [
        { label: "Seleciono", value: "Seleciona" },
        { label: "Como o que tiver", value: "Come o que tiver" },
        { label: "Depende da situação", value: "Depende" },
      ],
    },
    {
      predicate: "Quais alimentos não podem faltar na sua alimentação diária?",
      type: "list",
    },
  ],
  behavior: [
    {
      predicate: "Quanto tempo você passa em média nas redes sociais?",
      type: "number",
      nested: [{ predicate: "Tem a ver com o seu trabalho", type: "confirm" }],
    },
    {
      predicate: "Qual sua perspectiva sobre religião e/ou espiritualidade?",
      type: "text",
    },
    {
      predicate: "Qual a sua expectativa da vida?",
      type: "text",
    },
    {
      predicate: "Você diria que este mundo é um lugar bom para viver",
      type: "choose",
      opts: YesNoOptions,
      nested: [{ type: "text", predicate: "Por que?" }],
    },
    {
      predicate: "O que você mudaria nele se tivesse esse poder em mãos?",
      type: "text",
    },
  ],
};
