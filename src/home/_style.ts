import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  p {
    line-height: 1.25;
  }
  .explore {
    padding-top: 1rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    > nav {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 1.3rem;

      > a {
        padding: 0.5rem 1rem;

        text-align: center;
        font-size: 0.9rem;
        color: #fafafa;

        outline: none;
        cursor: pointer;

        border-bottom: 2px solid rgba(229, 229, 229, 0.33);
        transition: border-bottom 0.2s;

        &:hover {
          border-bottom: 2px solid #f26e2c;
        }
      }
    }

    > .how-it-works {
      padding: 1.3rem 1rem;
      margin-bottom: 1.8rem;
      text-align: right;

      > .card {
        margin-bottom: 1.5rem;
        > h3:after {
          content: "";
          position: absolute;
          top: 110%;
          left: 0;
          right: 0;
          opacity: 0.8;
          background-color: var(--primary);
          height: 0.2em;
          width: 70%;
        }
        > h3,
        p {
          position: relative;
          color: #fff;
          text-align: justify;
        }

        > p {
          margin-top: 1rem;
          margin-left: 0.6rem;
        }
      }

      > .button-container {
        display: flex;
        flex-direction: column;
        align-items: center;

        & > * {
          color: var(--fg);
        }
        > h3 {
          text-align: center;
          margin-bottom: 1rem;
        }
        > button {
          display: flex;
          width: 90%;
          font-size: 1.1rem;
          span {
            flex: 1;
            padding: 0.4rem 0.5rem;
            transition: all 0.2s;
            &:hover {
              background-color: #0002;
            }
          }
          border: none;

          font-weight: 600;
          background: var(--primary);
          color: var(--fg);

          cursor: pointer;
        }
      }
    }

    .history {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      color: #fff;
      font-weight: 500;

      margin-bottom: 1.8rem;
      h4 {
        font-size: 1.3rem;
        margin-bottom: 1.5rem;
      }

      > .container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
        grid-gap: 1.5rem;

        > .history-card {
          max-width: 409px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          > img {
            width: 254px;
            height: 274px;
            border-radius: 20px;
            margin-bottom: 1rem;
          }
          > p {
            font-size: 1.2em;
          }
        }
      }
    }

    > .who-am-i {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      color: #fff;

      margin-bottom: 1.8rem;

      > h4 {
        margin-bottom: 1.5rem;
        font-weight: 700;
        font-size: 1.3rem;
      }

      > .wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        > img {
          max-height: 20rem;
          width: auto;

          margin-bottom: 1rem;
        }

        > p {
          font-size: 1.1rem;
          padding: 0 1rem;
        }
      }
    }
  }

  ${({ theme: { breakpoints } }) => css`
    @media (min-width: ${breakpoints.md}) {
      .explore {
        max-width: 85vw;
        margin: 0 auto;

        .history {
          .container {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 1fr;
          }
        }

        .who-am-i {
          .wrapper {
            flex-direction: row;
            justify-content: space-between;
            gap: 30px;

            > img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  `}
`;
