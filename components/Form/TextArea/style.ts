import styled from "styled-components";
export const TextAreaInput = styled.div`
  margin: 0.5em 1em;
  height: fit-content;
  min-height: fit-content;
  label {
    font-size: 1.1em;
  }
  textarea {
    background-color: transparent;
    font-size: 1em;
    color: var(--fg);
    border: none;
    width: 100%;
    resize: vertical;
    max-width: 100%;
    height: auto;
    min-height: fit-content;
    outline: 1px solid var(--white-fade);
    white-space: pre-line;
    padding: 0.2rem;
    &:focus {
      outline: 0.5px solid var(--primary);
    }
  }
  h5 {
    font-weight: 400;
    font-size: 0.8rem;
    color: #fff8;
  }
`;
