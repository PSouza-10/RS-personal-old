import styled from "styled-components";
export const Container = styled.div`
  display: flex;
  flex-direction: column;

  > button svg {
    height: 1.3em;
    width: 1.3em;
  }
`;
export const ListContainer = styled.ul`
  list-style: none;

  li {
    display: flex;
    justify-content: center;

    gap: 0.3em;
    .input-container {
      margin: 0 0;
    }
    button {
      border: none;

      font-size: 1.2em;
      flex-shrink: 0;
      svg {
        height: 1.5em;
        width: 1.5em;
        margin: 0 0.3em;
      }
    }
  }
  margin-bottom: 0.6em;
`;
