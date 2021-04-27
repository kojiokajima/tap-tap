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

export const Sidebarcontainer = styled.div`
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