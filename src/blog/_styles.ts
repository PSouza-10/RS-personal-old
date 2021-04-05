import styled from "styled-components";

export const BlogContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 3rem;
  gap: 2rem;
  max-height: calc(100vh - 55px);
  overflow-y: auto;
  article {
    display: flex;
    flex-direction: column;
    border: 1px solid #fff4;
    border-radius: 0.5em;
    overflow: hidden;

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
      }
    }
    section {
      padding: 1rem;
      h2 {
        margin-bottom: 0.5rem;
      }
      p {
        text-align: justify;
        color: var(--fg);
        font-size: 01rem;
        word-wrap: normal;
        max-height: 5.5rem;
        overflow: hidden;
        position: relative;
        max-width: 100%;
        &::after {
          content: "...";
          position: absolute;
          bottom: -0.2rem;
          right: 0;
          background-color: var(--bg);
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
