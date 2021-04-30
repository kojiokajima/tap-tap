import styled from "styled-components";

import Hero from "../../assets/hero.jpg";

export const SignInOutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 800px) {
    position: relative;
    display: block;
  }
`;

export const SignInOutHero = styled.div`
  border: 1px solid #000;
  width: 50vw;
  height: 100vh;
  background-image: url(${Hero});
  background-size: cover;
  background-position: center;
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  @media (max-width: 800px) {
    width: 100vw;
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      content: " ";
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export const SignInOutForm = styled.div`
  position: relative;
  width: 50vw;

  & form {
    padding: 10vh 5vw;
    position: relative;
    border: 1px solid #000;
    height: 80vh;
  }

  @media (max-width: 800px) {
    width: 80vw;
    height: 80vh;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & form {
      height: 60vh;
      border: none;
    }
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  color: red;
  top: 7%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
