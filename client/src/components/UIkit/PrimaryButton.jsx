import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const PrimaryButton = ({ label, onClick, type="submit" }) => {
  return (
    <div>
      <MyButton onClick={onClick} type={type} >
        {label}
      </MyButton>
    </div>
  );
};

export default PrimaryButton;


const MyButton = styled(Button)`
  background-color: #d2a708;
  color: white;
  width: 16vw;
  &:hover {
    color: #d2a708;
    background-color: white;
    border: 1px solid #d2a708;
  }

  @media (max-width: 800px) {
    width: 120px;
  }
`;
