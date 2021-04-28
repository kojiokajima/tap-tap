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
  }

  & .MuiDialog-paperWidthSm {
    width: 60vw;
    height: 60vh;

    & .MuiDialogContent-root {
      & label {
        color: #d2a708;
        display: inline-block;
        width: 30%;
      }
    }
  }
`;