import styled from "styled-components";
import {CardActionArea, CardMedia, CardContent, Typography} from "@material-ui/core";

const PrimaryCard = ({name, brewery, style}) => {
  const imageUrl = "https://images.unsplash.com/photo-1607611439230-fcbf50e42f7c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80"

  return (
    <MyCardActionArea>
      <CardMedia
        component="img"
        alt="Contemplative Reptile"
        height="140"
        image={imageUrl}
        title="Contemplative Reptile"
      />
      <CardContent>
        {/* <Typography gutterBottom variant="h5" component="h2">
          Lizard
        </Typography> */}
        <Typography color="textSecondary" component="h3">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {style}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {brewery}
        </Typography>
      </CardContent>
    </MyCardActionArea>
  );
};

export default PrimaryCard;


const MyCardActionArea = styled(CardActionArea)`
  width: 22vw;
  height: 40vh;
`