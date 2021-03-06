import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DialogContent, DialogActions } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import axios from "axios";

import { PrimaryButton, PrimaryTextInput } from "./index";
import {DialogContainer} from '../styles/Modal.styles'
import { selectUser } from "../../features/userSlice";
import {　toggleIsModalOpen,　selectIsModalOpen,　selectCurrentBeer } from "../../features/beerSlice";


const BeerModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const currentBeer = useSelector(selectCurrentBeer);
  const currentUser = useSelector(selectUser);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [currentUntapped, setCurrentUntapped] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState(false)

  const toggleDisabled = () => {
    axios.post("/updateBeerData").then((response) => {
      setIsDisabled(!isDisabled);
      setIsEdit(!isEdit);
      if (!response.noRes) {
        console.log(response.data);
      } else {
        window.location.reload()
      }
    })
  };

  const closeModal = () => {
    setIsEdit(true)
    setIsDisabled(true)
    dispatch(toggleIsModalOpen());
  };

  const deleteItem = () => {
    axios.post("/deleteItem", {
        ...currentBeer,
      })
      .then(() => {
        window.location.reload();
      });
  };

  const addToMine = () => {
    axios.post("/addToMine", {
        ...currentBeer,
        currentUserId: currentUser.uid,
      })
      .then(() => {
        window.location.reload();
      });
  };

  const toggleTapped = () => {
    setCurrentUntapped(!currentUntapped);
  };

  const toggleFavorite = () => {
    setCurrentFavorite(!currentFavorite)
    axios.post("/toggleFavorite", {
      ...currentBeer,
    }).then(() => {
      window.location.reload()
    })
  }

  useEffect(() => {
    setCurrentUntapped(currentBeer.untapped);
    setCurrentFavorite(currentBeer.favorite)
  }, [isModalOpen]);

  return (
    <DialogContainer
      open={isModalOpen}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form action="/updateBeerData" method="post">
        <DialogContent>
          <div className="dialog-form" style={{ display: "none" }}>
            <PrimaryTextInput
              icon={""}
              defaultValue={currentBeer.id}
              label={""}
              name={"id"}
              type={""}
              disabled={isDisabled}
            />
          </div>
          <div className="dialog-form">
            <label htmlFor="">Name</label>
            <PrimaryTextInput
              icon={""}
              defaultValue={`${currentBeer.name}`}
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
              defaultValue={currentBeer.brewery}
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
              defaultValue={currentBeer.style}
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
              defaultValue={currentBeer.memo}
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
              defaultValue={currentUntapped}
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
    </DialogContainer>
  );
};

export default BeerModal;