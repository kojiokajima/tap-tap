import styled from "styled-components";
import {
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

const PrimaryCard = ({ name, brewery, style, onClick }) => {
  const imageUrl =
    "https://images.unsplash.com/photo-1607611439230-fcbf50e42f7c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80";

  return (
    <MyCardActionArea onClick={onClick}>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={imageUrl}
        title="Contemplative Reptile"
      />
      <MyCardContent>
        {/* <Typography gutterBottom variant="h5" component="h2">
          Lizard
        </Typography> */}
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

`;
