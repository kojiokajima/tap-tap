import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { PrimaryButton, PrimaryTextInput } from "./index";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {DialogContainer} from '../styles/Modal.styles'


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
  const [currentUntapped, setCurrentUntapped] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState(false)

  const toggleDisabled = () => { // --> こっちが先に動いてからタイプの判定がくるのか

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
    setCurrentUntapped(!currentUntapped);
  };

  const toggleFavorite = () => {
    console.log("HI TOGGLE FAVORITE");
    setCurrentFavorite(!currentFavorite)
    axios.post("/toggleFavorite", {
      ...currentBeer,
      // favorite: currentFavorite
    }).then(() => {
      window.location.reload()
    })
  }

  console.log("CURRENT BEER IS ", currentBeer);

  useEffect(() => {
    setCurrentUntapped(currentBeer.untapped);
    setCurrentFavorite(currentBeer.favorite)
  }, [isModalOpen]);

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
      {/* <DialogForm action="/updateBeerData" method="post"> */}
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
            <label
              name="untapped"
              htmlFor=""
              onClick={isDisabled ? null : toggleTapped}
            >
              {
                currentUntapped ? "untapped" : "tapped!"
              }
            </label>
            <input
              type="text"
              name="untrapped"
              value={currentUntapped}
              style={{ display: "none" }}
            />
            {
              currentBeer?.userId === currentUser?.uid ?

              currentFavorite ?
                <Favorite style={{color: "red"}} onClick={toggleFavorite} />
              :
                <FavoriteBorder onClick={toggleFavorite} />

              :
              null
            }
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
      {/* </DialogForm> */}
      {/* </Dialog> */}
    </DialogContainer>
  );
};

export default BeerModal;