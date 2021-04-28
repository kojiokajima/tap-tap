import styled from "styled-components";

export const SignInOutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  // @media (max-width: 800px){
  //   background-color: blue;
  // }
`;

export const SignInOutHero = styled.div`
  border: 1px solid #000;
  width: 50vw;
  height: 100vh;
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const SignInOutForm = styled.div`
  position: relative;
  width: 50vw;
  // display: flex;
  // justify-content: space-around;
  // align-items: center;
  & form {
    padding: 10vh 5vw;
    position: relative;
    border: 1px solid #000;
    // width: 100%;
    height: 80vh;
    // padding: 5rem;
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  color: red;
  top: 7%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
