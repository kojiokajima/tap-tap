import React from 'react'
import {DialogActions, DialogContent} from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux"

import {PrimaryTextInput, PrimaryButton} from './index'
import {selectIsBlankModalOpen, toggleIsBlankModalOpen} from '../../features/beerSlice'
import {DialogContainer} from '../styles/Modal.styles'
import axios from 'axios'

const BlankModal = () => {
  const dispatch = useDispatch()
  const isBlankModalOpen = useSelector(selectIsBlankModalOpen)

  const closeModal = () => {
    dispatch(toggleIsBlankModalOpen());
  };

  const addBeer = () => {
    axios.post("/addBeer").then((response) => {
      window.location.reload()
    })
  }

  return (
    <DialogContainer
      open={isBlankModalOpen}
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
              defaultValue={""}
              label={""}
              name={"name"}
              type={""}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Brewery</label>
            <PrimaryTextInput
              icon={""}
              defaultValue={""}
              label={""}
              name={"brewery"}
              type={""}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Style</label>
            <PrimaryTextInput
              icon={""}
              defaultValue={""}
              label={""}
              name={"style"}
              type={""}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Memo</label>
            <PrimaryTextInput
              icon={""}
              defaultValue={""}
              label={""}
              name={"memo"}
              type={""}
              rows={5}
            />
          </div>
          <br />
        </DialogContent>
        <DialogActions>
          <PrimaryButton label={"Add"} type="submit"  />
          <PrimaryButton label={"Close"} type="button" onClick={closeModal} />
        </DialogActions>
      </form>
      {/* </Dialog> */}
    </DialogContainer>
  )
}

export default BlankModal