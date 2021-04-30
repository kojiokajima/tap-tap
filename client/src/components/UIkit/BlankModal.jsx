import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {DialogActions, DialogContent} from '@material-ui/core'

import {PrimaryTextInput, PrimaryButton} from './index'
import {DialogContainer} from '../styles/Modal.styles'
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
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form action="/addBeer" method="post">
        <DialogContent>
          <div className="dialog-form">
            <label htmlFor="">Name</label>
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
    </DialogContainer>
  )
}

export default BlankModal