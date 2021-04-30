import styled from 'styled-components'
import {Dialog} from '@material-ui/core'

export const DialogContainer = styled(Dialog)`
  & .dialog-form {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;


    & .MuiGrid-spacing-xs-1 > * {
      width: 90%;
    }
  }

  & .MuiDialogActions-root {
    justify-content: space-around;

    @media (max-width: 550px) {
      flex-direction: column;
      & > * {
        margin-top: 20px;
      }
      
    }

  }

  & .MuiDialog-paperWidthSm {
    width: 60vw;
    height: 60vh;
    justify-content: space-around;

    @media (max-width: 550px) {
      width: 90vw;
      height: 80vh;
    }

    & .MuiDialogContent-root {
      & label {
        color: #d2a708;
        display: inline-block;
        width: 30%;
      }
    }
  }
`;