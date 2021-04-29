import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
// import {styled} from '@material-ui/styles'

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

// const MyButton = styled(Button)({
//   color: 'red',
//   backgroundColor: '#d2a708',
//   border: '1px, solid, blue',
//   padding: '20px',
// });

const MyButton = styled(Button)`
  background-color: #d2a708;
  color: white;
  // width: 150px;
  width: 17vw;
  &:hover {
    color: #d2a708;
    background-color: white;
    border: 1px solid #d2a708;
  }

  @media {
    width: 130px;
  }
`;
