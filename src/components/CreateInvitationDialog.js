import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem,
  TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { createCode, close as closeCreateInvitationDialog } from "../actions/createInvitationDialogActions";
import { startBoard } from '../actions/boardActions';
import { playfriend, quit } from '../actions/serverActions';
import Pgn from '../utils/Pgn';

const CreateInvitationDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const randColor = () => {
    return Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK;
  }

  const handleCreateCode = (event) => {
    event.preventDefault();
    let color = event.target.elements.color.value;
    if (color === 'rand') {
      color = randColor();
    }
    dispatch(quit(state.server.ws)).then(() => {
      dispatch(playfriend(state.server.ws, color, event.target.elements.time.value)).then((data) => {
        const code = JSON.parse(data).id;
        dispatch(createCode({
          color: color,
          time: event.target.elements.time.value,
          code: code
        }));
      });
    });
  }

  return (
    <Dialog open={state.createInvitationDialog.open}>
      <DialogTitle>Invite a friend</DialogTitle>
      <DialogContent id="invite-friend-dialog">
        <form onSubmit={handleCreateCode}>
          <Grid container spacing={3}>
            <Typography variant="body1" gutterBottom>
              Create a new code and share it with a friend.
            </Typography>
            <TextField
              select
              fullWidth
              name="color"
              label="Color"
              variant="outlined"
              defaultValue="rand"
            >
              <MenuItem key={0} value="rand">
                Random
              </MenuItem>
              <MenuItem key={1} value={Pgn.symbol.WHITE}>
                White
              </MenuItem>
              <MenuItem key={2} value={Pgn.symbol.BLACK}>
                Black
              </MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="number"
              name="time"
              label="Minutes"
              variant="outlined"
              defaultValue={10}
              inputProps={{ min: "1", max: "60", step: "1" }}
            />
            {state.createInvitationDialog.code}
          </Grid>
          <DialogActions>
            <Button type="submit">
              Create code
            </Button>
            <Button
              onClick={() => dispatch(closeCreateInvitationDialog())} color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateInvitationDialog;
