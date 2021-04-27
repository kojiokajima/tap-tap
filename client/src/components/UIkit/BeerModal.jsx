import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { PrimaryButton, PrimaryTextInput } from "./index";
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux'

import { toggleIsModalOpen, selectIsModalOpen, selectCurrentBeer } from "../../features/beerSlice";

const BeerModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const currentBeer = useSelector(selectCurrentBeer)
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

  const toggleDisabled = (e) => {
    setIsDisabled(!isDisabled);
    setIsEdit(!isEdit);
    console.log("NNNN ", e.target.innerText);
  };

  const closeModal = () => {
    dispatch(toggleIsModalOpen());
  };

  console.log("CURRENT BEER IS ", currentBeer);

  return (
    // <Dialog
    <DialogContainer
      open={isModalOpen}
      // open={false}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {/* <DialogTitle id="alert-dialog-title">[]</DialogTitle> */}
      {/* <form action="" method="post"> */}
        <DialogContent>
          <div className="dialog-form">
            <label htmlFor="">Name</label>
            <PrimaryTextInput icon={""} value={currentBeer.name} label={""} name={""} type={""} disabled={isDisabled} />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Brewery</label>
            <PrimaryTextInput icon={""} value={currentBeer.brewery} label={""} name={""} type={""} disabled={isDisabled} />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Style</label>
            <PrimaryTextInput icon={""} value={currentBeer.style} label={""} name={""} type={""} disabled={isDisabled} />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Memo</label>
            <PrimaryTextInput icon={""} value={currentBeer.memo} label={""} name={""} type={""} rows={5} disabled={isDisabled} />
          </div>
        </DialogContent>
        <DialogActions>
          <PrimaryButton label={"Close"} onClick={closeModal} />
          <PrimaryButton label={isEdit ? "Edit" : "save"} onClick={toggleDisabled} />
        </DialogActions>
      {/* </form> */}
      {/* </Dialog> */}
    </DialogContainer>
  );
};

export default BeerModal;

const DialogContainer = styled(Dialog)`
  & .dialog-form {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    & .MuiGrid-spacing-xs-1 > * {
      width:90%;
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
