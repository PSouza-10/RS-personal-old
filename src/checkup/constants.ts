import { ClosedQuestionOption } from "../../components/Form/ClosedQuestion";
import { DropdownOption } from "../../components/Form/Dropdown";
import { Forms, TPaginate } from "./types";
export const alcoholUnits: DropdownOption[] = [
  {
    value: "Copos",
    label: "Copo(s)",
  },
  {
    value: "Garrafas",
    label: "Garrafa(s)",
  },
  {
    value: "Dose",
    label: "Dose(s)",
  },
];
export const timeMeasures = [
  {
    value: "Dias",
    label: "Dias",
  },

  {
    value: "Meses",
    label: "Meses",
  },

  {
    value: "Anos",
    label: "Anos",
  },
];

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
      type: "range",
      id: "tv",
      predicate: "Quantas horas passa diante da TV em média, por dia?",
      mask: "9",
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
};

export const YesNoOptions = [
  {
    label: "Não",
    value: false,
  },
  {
    label: "Sim",
    value: true,
  },
];

export const YesNoOptionsReversed = [
  {
    label: "Não",
    value: true,
  },
  {
    label: "Sim",
    value: false,
  },
];
