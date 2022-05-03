import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { wsMssgQuit, wsMssgStartPlayfriend } from '../../actions/serverActions';
import createInviteCodeDialogActionTypes from '../../constants/dialog/createInviteCodeDialogActionTypes';
import Pgn from '../../utils/Pgn';

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);

  return (
    <Dialog open={state.createInviteCodeDialog.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>Create invite code</DialogTitle>
        {!state.mode.playfriend.hash ? <CreateCode /> : <CopyCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleCreateCode = (event) => {
    event.preventDefault();
    let color;
    event.target.elements.color.value === 'rand'
      ? color = Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
      : color = event.target.elements.color.value;
    let time = event.target.elements.time.value;
    let increment = event.target.elements.increment.value;
    wsMssgQuit(state).then(() => wsMssgStartPlayfriend(state, color, time, increment));
  }

  return (
    <DialogContent>
      <form onSubmit={handleCreateCode}>
        <TextField
          select
          fullWidth
          margin="dense"
          name="color"
          label="Color"
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
          margin="dense"
          type="number"
          name="time"
          label="Minutes"
          defaultValue={5}
          inputProps={{ min: "1", max: "60", step: "1" }}
        />
        <TextField
          fullWidth
          margin="dense"
          type="number"
          name="increment"
          label="Increment in seconds"
          defaultValue={0}
          inputProps={{ min: "0", max: "60", step: "1" }}
        />
        <DialogActions>
          <Button type="submit">
            Create Code
          </Button>
          <Button onClick={() => dispatch({ type: createInviteCodeDialogActionTypes.CLOSE })}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </DialogContent>
  );
}

const CopyCode = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  return (
    <DialogContent>
      <TextField
        fullWidth
        margin="dense"
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        value={state.mode.playfriend.hash}
      />
      <DialogActions>
        <Button onClick={() => navigator.clipboard.writeText(state.mode.playfriend.hash)}>
          Copy Code
        </Button>
        <Button onClick={() => dispatch({ type: createInviteCodeDialogActionTypes.CLOSE })}>
          Play
        </Button>
      </DialogActions>
    </DialogContent>
  );
}

export default CreateInviteCodeDialog;
