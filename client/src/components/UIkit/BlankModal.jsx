import React from 'react'
import {DialogActions, Dialog, DialogContent} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux"
import styled from 'styled-components'

import {PrimaryTextInput, PrimaryButton} from './index'
import {selectIsBlankModalOpen, toggleIsBlankModalOpen} from '../../features/beerSlice'

const BlankModal = () => {
  const dispatch = useDispatch()
  const isBlankModalOpen = useSelector(selectIsBlankModalOpen)

  const closeModal = () => {
    dispatch(toggleIsBlankModalOpen());
  };

  return (
    <DialogContainer
      open={isBlankModalOpen}
      // open={false}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">[]</DialogTitle> */}
      <form action="/addBeer" method="post">
        <DialogContent>
          {/* <div className="dialog-form" style={{ display: "none" }}>
            <PrimaryTextInput
              icon={""}
              value={""}
              label={""}
              name={"id"}
              type={""}
            />
          </div> */}
          <div className="dialog-form">
            <label htmlFor="">Name</label>
            {/* <PrimaryTextInput icon={""} value={currentBeer.name} label={""} name={"name"} type={""} disabled={isDisabled} /> */}
            <PrimaryTextInput
              icon={""}
              value={""}
              label={""}
              name={"name"}
              type={""}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Brewery</label>
            <PrimaryTextInput
              icon={""}
              value={""}
              label={""}
              name={"brewery"}
              type={""}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Style</label>
            <PrimaryTextInput
              icon={""}
              value={""}
              label={""}
              name={"style"}
              type={""}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Memo</label>
            <PrimaryTextInput
              icon={""}
              value={""}
              label={""}
              name={"memo"}
              type={""}
              rows={5}
            />
          </div>
          <br />
        </DialogContent>
        <DialogActions>
          <PrimaryButton label={"Add"} type="submit" />
          <PrimaryButton label={"Close"} type="button" onClick={closeModal} />
        </DialogActions>
      </form>
      {/* </Dialog> */}
    </DialogContainer>
  )
}

export default BlankModal


const DialogContainer = styled(Dialog)`
  & .dialog-form {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    & .MuiGrid-spacing-xs-1 > * {
      width: 90%;
    }
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