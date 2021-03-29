import styled from "styled-components";

export const BlogContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 3rem;
  gap: 2rem;
  a {
    display: flex;
    flex-direction: column;
    border: 1px solid #fff4;
    border-radius: 0.5em;
    overflow: hidden;
    h1,
    p {
      margin: 0.5rem 1rem;
    }
    figure {
      display: flex;
      justify-content: center;
      svg {
        height: 8rem;
        width: 8rem;
        fill: var(--primary);
      }
      img {
        min-width: 100%;
        height: auto;
      }
    }
    h1 {
      text-align: center;
    }
    p {
      text-align: justify;
      color: var(--fg);
      font-size: 1.1rem;
    }
  }
`;

export const PostContainer = styled.article`
  padding: 1rem 2rem;
  h1 {
    margin-bottom: 2rem;
    font-size: 1.6rem;
  }

  & > *:not(h1) {
    margin-bottom: 0.5rem;
  }
  h3,
  h4 {
    color: var(--primary);
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.2rem;
  }

  p {
    color: var(--fg);
    text-align: justify;
    font-size: 1.1rem;
  }

  img {
    min-width: 100%;
    height: auto;
  }
`;
