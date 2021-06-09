import { DropdownOption } from "../../components/Form/Dropdown";
import { Forms } from "./types";
export const ZeroToTenQuestions = Array(11)
  .fill(0)
  .map((_, idx) => ({ value: idx, label: `${idx}` }));
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
export const smallTimeMeasures = [
  {
    value: "Horas",
    label: "Horas",
  },

  {
    value: "Minutos",
    label: "Minutos",
  },
];
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

export const formLabelMap: Record<keyof Forms, string> = {
  behavior: "Histórico de Comportamento",
  diseaseHistory: "Histórico de Doenças",
  emotionalHistory: "Histórico emocional",
  lifeHabits: "Histórico de Hábitos de vida",
  motivation: "Histórico de Garra",
  nutrition: "Histórico de hábitos alimentares",
  sleepHistory: "Histórico de Qualidade do Sono",
  socioEconomicCondition: "Histórico de condição sócio-econômica",
  stress: "Histórico de Estress",
  trainingHistory: "Histórico de treino",
};
