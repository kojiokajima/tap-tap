import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { FavoriteBorder } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { PrimaryButton, PrimaryTextInput } from "./index";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  toggleIsModalOpen,
  selectIsModalOpen,
  selectCurrentBeer,
} from "../../features/beerSlice";
import { selectUser } from "../../features/userSlice";

const BeerModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isModalOpen = useSelector(selectIsModalOpen);
  const currentBeer = useSelector(selectCurrentBeer);
  const currentUser = useSelector(selectUser);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [currentUntapped, setCurrentUntapped] = useState(false)

  const toggleDisabled = (e) => {
    // --> こっちが先に動いてからタイプの判定がくるのか

    axios.post("/updateBeerData").then((response) => {
      setIsDisabled(!isDisabled);
      setIsEdit(!isEdit);
    });
  };

  // console.log("ID MATCH? ", currentBeer?.userId, " ", currentUser?.uid);
  console.log("currentUntapped ", currentUntapped);
  console.log("currentBeer.untapped ", currentBeer.untapped);

  const closeModal = () => {
    dispatch(toggleIsModalOpen());
  };

  const deleteItem = () => {
    axios
      .post("/deleteItem", {
        ...currentBeer,
      })
      .then((response) => {
        window.location.reload();
      });
  };

  const addToMine = () => {
    axios
      .post("/addToMine", {
        ...currentBeer,
        currentUserId: currentUser.uid,
      })
      .then((response) => {
        window.location.reload();
      });
  };

  const toggleTapped = () => {
    // axios.post("/toggleTapped")
    setCurrentUntapped(!currentUntapped)
  };

  console.log("CURRENT BEER IS ", currentBeer);

  useEffect(() => {
    setCurrentUntapped(currentBeer.untapped)
  }, [isModalOpen])

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
          <div className="dialog-form" style={{ display: "none" }}>
            <PrimaryTextInput
              icon={""}
              value={currentBeer.id}
              label={""}
              name={"id"}
              type={""}
              disabled={isDisabled}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Name</label>
            {/* <PrimaryTextInput icon={""} value={currentBeer.name} label={""} name={"name"} type={""} disabled={isDisabled} /> */}
            <PrimaryTextInput
              icon={""}
              value={`${currentBeer.name}`}
              label={""}
              name={"name"}
              type={""}
              disabled={isDisabled}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Brewery</label>
            <PrimaryTextInput
              icon={""}
              value={currentBeer.brewery}
              label={""}
              name={"brewery"}
              type={""}
              disabled={isDisabled}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Style</label>
            <PrimaryTextInput
              icon={""}
              value={currentBeer.style}
              label={""}
              name={"style"}
              type={""}
              disabled={isDisabled}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Memo</label>
            <PrimaryTextInput
              icon={""}
              value={currentBeer.memo}
              label={""}
              name={"memo"}
              type={""}
              rows={5}
              disabled={isDisabled}
            />
          </div>
          <br />
          <div className="dialog-form">
            <label name="untapped" htmlFor="" onClick={isDisabled ? null : toggleTapped}>
              {
                // currentBeer.untapped ?
                currentUntapped ?
                  "untapped"
                :
                  "tapped!"
              }
            </label>
            <input type="text" name="untrapped" value={currentUntapped} style={{display: "none"}} />
          </div>

        </DialogContent>
        {currentUser?.uid === currentBeer?.userId ? (
          <DialogActions>
            <PrimaryButton
              label={isEdit ? "Edit" : "save"}
              type={isEdit ? "button" : "submit"}
              onClick={toggleDisabled}
            />
            <PrimaryButton
              label={"delete"}
              type="button"
              onClick={deleteItem}
            />
            <PrimaryButton label={"Close"} type="button" onClick={closeModal} />
          </DialogActions>
        ) : (
          <DialogActions>
            <PrimaryButton label={"Close"} type="button" onClick={closeModal} />
            <PrimaryButton label={"Add"} type="button" onClick={addToMine} />
          </DialogActions>
        )}
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
