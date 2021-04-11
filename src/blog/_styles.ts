import styled, { css } from "styled-components";

const filtersCSS = css`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.6rem;

  .input-container {
    margin: 0 0;
  }

  .search-action {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 2rem;
    button {
      font-size: 0.8rem;
    }
  }
  .tags {
    margin-top: 1rem;
    .selector {
      display: flex;
      gap: 0.3rem;
      padding: 0.5rem;
      flex-wrap: wrap;
    }
  }
`;

export const BlogContainer = styled.main<{ filtersIsOpen: boolean }>`
  min-height: calc(100vh - 55px);
  overflow-y: ${({ filtersIsOpen }) => (filtersIsOpen ? "hidden" : "auto")};
  max-height: ${({ filtersIsOpen }) =>
    filtersIsOpen ? "auto" : "calc(100vh - 55px)"};
  /* max-height: calc(100vh - 55px); */
  display: flex;
  position: relative;
  .posts {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    gap: 2rem;
    width: 100%;
  }
  .filters {
    ${filtersCSS}
    max-width: ${({ filtersIsOpen }) => (filtersIsOpen ? "100vw" : "0")};
    overflow: hidden;
    position: fixed;
    top: 50px;
    border-left: 2px solid var(--primary);
    right: 0;
    bottom: 0;
    background-color: var(--bg);
    transition: max-width 0.6s ease;
    visibility: ${({ filtersIsOpen }) =>
      filtersIsOpen ? "visible" : "hidden"};
  }
  .filter-control {
    position: fixed;
    bottom: 0.6rem;
    right: 0.6rem;
    border-radius: 50%;
    overflow: hidden;
    border: none;
    box-shadow: none;
    cursor: pointer;
    &:hover {
      span {
        background-color: #0002;
      }
    }
    span {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        fill: var(--fg);
        height: 2rem;
        width: 2rem;
      }
    }
    background-color: var(--primary);
  }
  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      .posts {
        width: 70vw;
        padding: 0.5rem 3rem;
      }
      .filters {
        flex: 1;
        position: sticky;
        max-width: 100%;
        right: 0;
        top: 0;
        bottom: 0;
      }
      .filter-control {
        display: none;
      }
    }
  `}
`;
export const PostCardContainer = styled.article<{ textExpanded: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid #fff4;
  border-radius: 0.5em;
  overflow: hidden;
  flex-shrink: 0;
  figure {
    display: flex;
    justify-content: center;
    svg {
      height: 8rem;
      width: 8rem;
      fill: var(--primary);
    }
    img {
      max-height: 50vh;
      width: auto;
      height: auto;
      max-width: 100%;
    }
    .video {
      div {
        min-height: 100%;
        min-width: 100%;
      }
      max-width: 100%;
      max-height: calc((100vw -1rem) / 16 * 9);
      height: auto;
      width: auto;
    }
  }
  section {
    padding: 1rem;
    h2 {
      margin-bottom: 0.5rem;
    }
    .tags {
      display: flex;
      gap: 0.3rem;
      padding: 0.5rem;
      flex-wrap: wrap;
    }
    p {
      text-align: justify;
      color: var(--fg);
      font-size: 01rem;
      word-wrap: normal;
      max-height: ${({ textExpanded }) => (textExpanded ? "1000%" : "5.5rem")};
      overflow: hidden;
      position: relative;
      max-width: 100%;
      transition: max-height 0.3s ease;
      span {
        color: var(--primary);
        cursor: pointer;
        font-size: 0.7rem;
        position: absolute;
        bottom: 0rem;
        background-color: var(--bg);
        right: 0;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  footer {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 1rem;
    time {
      display: flex;
      align-items: center;
      h4 {
        height: 100%;
        font-size: 01rem;
      }
      svg {
        margin-right: 0.5rem;
        height: 1.3rem;
        width: 1.3rem;
        fill: var(--primary);
      }
      color: var(--fg);
    }
    .read-more {
      margin-left: auto;
      margin-right: 1rem;
    }
  }
`;
export const PostContainer = styled.article`
  padding: 0.4rem 2rem;
  display: flex;
  flex-direction: column;

  header {
    padding: 1rem 0;
    h1 {
      font-size: 1.6rem;
      margin-bottom: 0.4rem;
    }
    time {
      color: var(--fg);
    }
    .tags {
      display: flex;
      margin-top: 0.6rem;
      em {
        background-color: var(--primary);
        color: var(--fg);
        border-radius: 0.3em;
        margin-right: 0.5rem;
        font-size: 0.9rem;
        padding: 0.3rem;
      }
    }
    border-bottom: 2px solid #fff4;
    margin-bottom: 1rem;
  }

  & > *:not(h1) {
    margin-bottom: 0.8rem;
  }
  h3,
  h4 {
    color: var(--primary);
  }
  h3 {
    font-size: 1.3rem;
  }
  h4 {
    font-size: 1.2rem;
  }

  p {
    color: var(--fg);
    text-align: justify;
    font-size: 1.1rem;
  }
  figure {
    align-self: center;
    img {
      max-width: 100%;
      max-height: 75vh;
      width: auto;
      height: auto;
    }
  }
  ol,
  ul,
  tbody {
    color: var(--fg);
    list-style-position: inside;
  }
  thead {
    color: var(--primary);
  }

  ul {
    list-style-type: square;
  }
  table,
  th,
  td {
    border: 1px solid #fff4;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 0.2rem;
    font-size: 1.1rem;
  }
  .video {
    div {
      min-height: 100%;
      min-width: 100%;
    }
    max-width: 100%;
    height: calc(100vw / 16 * 9);
    width: 100%;
  }
`;
