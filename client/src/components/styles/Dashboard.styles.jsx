import styled from "styled-components"

export const DashboardContainer = styled.div`
  display: flex;
  width: 100%;
`

export const ContentContainer = styled.div`
  background-color: #faebd7;
  width: 75vw;
  height: 96vh;
  padding: 2vh 3vw;
`

export const ContentTitle = styled.div`
  margin: 2vh 0;
  color:  #401F01;
`
export const BeerListContainer = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
`

export const BeerListItem = styled.div`
  width: 19vw;
  height: 30vw;
  margin: 3vh 2vw;

  & button {
    width: 100%;
    height: 100%;
    & img {
      height: 50%;
    }
    & .MuiCardContent-root {
      height: 50%;
      & > * {
      // font-size: 2vw;
      }
    }
  }
`



export const SidebarContainer = styled.div`
  background-color: #ffe3ca;
    width: 25vw;
    height: 94vh;
    padding: 3vh 1vw;

    &-profile {
      display: flex;
      align-items: center;
      // justify-content: space-around;
      justify-content: center;
      margin-bottom: 5vh;

      & .profile-image {
        margin-right: 2vw;
      }
      & .profile-name {
      }
    }
`

export const SidebarProfile = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: space-around;
  // justify-content: center;
  color: #401F01;
  margin-bottom: 5vh;
`

export const SidebarButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 70%;
`