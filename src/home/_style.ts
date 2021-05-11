import styled, { css } from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;

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
        color: #FAFAFA;

        outline: none;
        cursor: pointer;        

        border-bottom: 2px solid rgba(229, 229, 229, 0.33);
        transition: border-bottom 0.2s;

        &:hover {
          border-bottom: 2px solid #F26E2C;
        }
      }
    }

    > .how-it-works {
      padding: 1.3rem 0.5rem;
      margin-bottom: 1.8rem;
      text-align: right;

      > .card {
        margin-bottom: 1.5rem;

        > h3, p {
          color: #FFF;
          text-align: justify;
        }

        > p {
          margin-top: 0.4rem;
          margin-left: 0.6rem;
        }
      }

      > .button-container {
        display: flex;
        flex-direction: column;
        align-items: flex-end;


        > p {
          font-size: 0.7rem;
          font-weight: 700;
          color: #FFF;
          margin-bottom: 0.3rem;
          text-align: center;
        }

        > button {
          max-width: 462px;
          width: 100%;
          padding: 0.4rem 0;

          display: flex;
          align-content: right;
          align-items: center;
          justify-content: center;
          text-align: center;

          border: none;

          font-size: 0.8rem;
          font-weight: 600;
          background: #F26E2C;
          color: #FFF;

          cursor: pointer;
          transition: opacity 0.2s;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }

    .history {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      color: #FFF;
      font-weight: 500;

      margin-bottom: 1.8rem;

      > p {
        margin-bottom: 1.5rem;
        font-weight: 700;
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
            font-size: 0.8rem;
          }
        }
      }
    }

    > .who-am-i {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      color: #FFF;

      margin-bottom: 1.8rem;

      > p {
        margin-bottom: 1.5rem;
        font-weight: 700;
      }

      > .wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        > img {
          width: 340px;
          height: 350px;

          margin-bottom: 1rem;
        } 

        > p {
          max-width: 340px;
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