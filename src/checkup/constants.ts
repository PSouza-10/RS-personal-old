import { ClosedQuestionOption } from "../../components/Form/ClosedQuestion";
import { Forms, TPaginate } from "./types";

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
          unit: "time",
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
};

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

type YesNoWithPaginate = (paginate: TPaginate) => ClosedQuestionOption[];

export const YesNoOptions: YesNoWithPaginate = (paginate) => {
  return [
    {
      label: "Não",
      value: false,
      onValueChange: (e, val) => paginate(1),
    },
    {
      label: "Sim",
      value: true,
      onValueChange: (e, val) => paginate(1),
    },
  ];
};
