import { css } from "styled-components";
export default css`
  .button {
    font-weight: 500;
    padding: 0.3em 0.2em;
    background-color: inherit;
    color: ${({ theme: { colors } }) => colors.primary};
    border: 2px solid ${({ theme: { colors } }) => colors.primary};
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    font-size: inherit;

    &:not(:disabled):hover,
    &:not(:disabled):focus {
      background-color: ${({ theme: { colors } }) => colors.primary};
      color: #fff;
    }
    &:not(:disabled):focus {
      box-shadow: 0 0 6px 4px
        ${({ theme: { colors } }) => colors.primary + "40"};
    }

    &:disabled {
      opacity: 0.6;
      cursor: initial;
    }
  }

  .danger {
    color: var(--error);
    border-color: var(--error);
    &:not(:disabled):hover,
    &:focus {
      background-color: var(--error);
      color: #fff;
    }
    &:not(:disabled):focus {
      box-shadow: 0 0 6px 4px #ee222240;
    }
  }
  .inline {
    color: var(--primary);
    font-size: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
  .close {
    height: 50px;
    padding: 5px 5px;
    svg {
      height: 40px;
      width: 40px;
      fill: #fff;
    }
    &:hover {
      background-color: var(--white-fade);
      svg {
        fill: var(--primary);
      }
    }
  }

  .scrollbar-grey::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5em;
    border-radius: 0;
  }

  .scrollbar-grey::-webkit-scrollbar-thumb {
    background-color: #fff3;
    border-radius: 0;
  }

  .page-container {
    max-height: calc(100vh - 50px);
    min-height: calc(100vh - 50px);
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 100vw;
  }

  .badge {
    border: 1px solid var(--primary);
    color: var(--primary);
    font-size: 0.8rem;
    padding: 0.1rem 0.3rem;
    cursor: pointer;
    border-radius: 0.5em;
    transition: color 0.2s ease, background-color 0.2s ease;
    &:hover,
    &.selected {
      background-color: var(--primary);
      color: var(--fg);
    }
  }
`;
