import { CardActionArea, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";

const PrimaryCard = ({ name, brewery, style, onClick }) => {

  return (
    <MyCardActionArea onClick={onClick}>
      <MyCardContent>
        <MyTypography>{name}</MyTypography>
        <MyTypography>{style}</MyTypography>
        <MyTypography>{brewery}</MyTypography>
      </MyCardContent>
    </MyCardActionArea>
  );
};

export default PrimaryCard;

const MyCardActionArea = styled(CardActionArea)`
  width: 22vw;
  height: 40vh;
  border: 2px solid #401f01;
`;

const MyCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 5px;
`

const MyTypography = styled(Typography)`
  color: #401f01;

  &:nth-child(1) {
    font-size: 2vw;
    
  }
  &:nth-child(2),
  &:nth-child(3) {
    font-size: 1.5vw;
  }

  @media (max-width: 800px) {
    &:nth-child(1) {
      font-size: 4vw;
    }
    &:nth-child(2),
    &:nth-child(3) {
      font-size: 3vw;
    }
  }

  @media (max-width: 550px) {
    &:nth-child(1) {
      font-size: 6vw;
    }
    &:nth-child(2),
    &:nth-child(3) {
      font-size: 5vw;
    }
  }

`;
