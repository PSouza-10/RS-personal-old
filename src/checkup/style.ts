import styled from "styled-components";

export const CheckupContainer = styled.section`
  padding: 2rem 2rem;
  height: calc(100% - 60px - 3.7em);
  overflow: hidden;
  overflow-y: auto;
  min-width: 100%;
  max-width: 100%;
`;

export const CheckupFormContainer = styled.section`
  color: var(--fg);
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .qst {
    height: 100%;
    width: 100%;
    position: absolute;
    > h4 {
      color: var(--white-fade);
      strong {
        color: var(--primary);
      }
    }

    > h1 {
      margin: 1em 0;
    }
    .closed-question-container {
      font-size: 0.8rem;
    }
    .unitInput {
      display: flex;
      justify-content: center;
    }
  }
  .buttons {
    display: flex;
    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: space-between;
    padding: 1em;
    background-color: var(--detail);
  }
`;

export const DebugControllerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  max-height: calc(100% - 50px);
  overflow-y: auto;
  color: var(--fg);
  span {
    display: flex;
    .dropdown {
      flex: 1;
    }
  }
  p {
    cursor: pointer;
    list-style-position: inside;
    &:hover {
      text-decoration: underline;
      color: var(--primary);
    }
  }
  > div {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    > ol,
    li ul {
      margin-left: 1.5rem;
    }
  }
`;
