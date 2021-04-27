import React, { useState } from "react";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { PrimaryButton, PrimaryTextInput } from "./index";
import styled from "styled-components";
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'

import { toggleIsModalOpen, selectIsModalOpen, selectCurrentBeer } from "../../features/beerSlice";

const BeerModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const currentBeer = useSelector(selectCurrentBeer)
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

  const toggleDisabled = (e) => { // --> こっちが先に動いてからタイプの判定がくるのか
    console.log("IS EDIT IS ", isEdit);

    axios.post("/updateBeerData").then(response => {
      setIsDisabled(!isDisabled);
      setIsEdit(!isEdit);
    })


    console.log("NNNN ", e.target.innerText);
  };

  console.log("IDIDIDIDIDIDI: ", currentBeer);

  const closeModal = () => {
    dispatch(toggleIsModalOpen());
  };

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
      <form action="/updateBeerData" method="post">
        <DialogContent>
          <div className="dialog-form" style={{display: "none"}}>
            <PrimaryTextInput icon={""} value={currentBeer.id} label={""} name={"id"} type={""} disabled={isDisabled} />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Name</label>
            <PrimaryTextInput icon={""} value={currentBeer.name} label={""} name={"name"} type={""} disabled={isDisabled} />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Brewery</label>
            <PrimaryTextInput icon={""} value={currentBeer.brewery} label={""} name={"brewery"} type={""} disabled={isDisabled} />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Style</label>
            <PrimaryTextInput icon={""} value={currentBeer.style} label={""} name={"style"} type={""} disabled={isDisabled} />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Memo</label>
            <PrimaryTextInput icon={""} value={currentBeer.memo} label={""} name={"memo"} type={""} rows={5} disabled={isDisabled} />
          </div>
        </DialogContent>
        <DialogActions>
          {/* <PrimaryButton label={isEdit ? "Edit" : "save"} onClick={toggleDisabled} /> */}
          <PrimaryButton label={isEdit ? "Edit" : "save"} type={isEdit ? "button" : "submit"} onClick={toggleDisabled} />
          <PrimaryButton label={"Close"} type="button" onClick={closeModal} />
        </DialogActions>
      </form>
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
