import { ptBR } from "date-fns/locale";
import { formatRelative } from "date-fns";
interface FormatObj {
  [x: string]: any;
}

const format: FormatObj = {
  lastWeek: "EEEE hh:mm",
  yesterday: "'Ontem às' hh:mm",
  today: "'Hoje às' hh:mm",
};
export function formatDate(updatedAt: string): string {
  const lastEdited = formatRelative(new Date(updatedAt), Date.now(), {
    locale: {
      ...ptBR,
      formatRelative: (token) => format[token],
    },
  });

  return lastEdited;
}
