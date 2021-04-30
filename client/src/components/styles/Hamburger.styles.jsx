import styled from 'styled-components'
import { Drawer } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

export const HamburgerContainer = styled.div`

`
export const MyDrawer = styled(Drawer)`
  width: 300px;
`

export const MyMenu = styled(Menu)`
  display: none;

  @media (max-width: 800px) {
    display: block;
    color: #401f01;
    position: absolute;
    top: 3%;
    right: 3%;
  }
`;



export const SidebarContainerHam = styled.div`
  background-color: #ffe3ca;
  width: 210px;
  height: 94vh;
  padding: 3vh 1vw;

  &-profile {
    display: flex;
    align-items: center;
    // justify-content: space-around;
    justify-content: center;
    margin-bottom: 5vh;

    & * {
      width: 130px;
    }

    & .profile-image {
      margin-right: 2vw;
    }
    & .profile-name {
    }
  }
`;

export const SidebarProfileHam = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: space-around;
  // justify-content: center;
  color: #401f01;
  margin-bottom: 5vh;
  text-align: center;
`;

export const SidebarButtonsHam = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around; 
  height: 70%;
  align-items: center;
`;
