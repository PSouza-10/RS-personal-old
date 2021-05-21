import {
  DetailedHTMLProps,
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
} from "react";
import { MdAdd, MdRemoveCircle } from "react-icons/md";
import { FormField } from "../Input";
import { Container, ListContainer } from "./style";

export interface EditableListProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  items: string[];
  setItems: Dispatch<SetStateAction<string[]>>;
  limit?: number;
}
export const EditableList: React.FC<EditableListProps> = ({
  items,
  setItems,
  limit = -1,
  ...props
}) => {
  function add() {
    let newItems = [...items, ""];
    setItems(newItems);
  }
  function remove(idx: number) {
    let newItems = [...items];
    newItems.splice(idx, 1);
    setItems(newItems);
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    let newItems = [...items];
    newItems[idx] = e.target.value;
    setItems(newItems);
  }
  return (
    <Container>
      <ListContainer>
        {items.map((item, idx) => (
          <li key={idx}>
            <FormField
              {...props}
              type="text"
              value={item}
              autoFocus
              name={props.name}
              id={`${props.name}-${idx}`}
              onChange={(e) => handleChange(e, idx)}
            ></FormField>
            <button onClick={() => remove(idx)} className="button">
              <MdRemoveCircle />
            </button>
          </li>
        ))}
      </ListContainer>

      <button
        onClick={add}
        className="button"
        disabled={limit === items.length}
      >
        <MdAdd />
      </button>
    </Container>
  );
};
