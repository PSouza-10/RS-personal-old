import { TextAreaInput } from "./style";

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
  subtitle?: string;
}

export const TextArea: React.FC<Props> = ({ label, subtitle, ...props }) => {
  return (
    <TextAreaInput className="textarea">
      <label>{label}</label>
      <textarea {...props} />
      <h5>{subtitle}</h5>
    </TextAreaInput>
  );
};
