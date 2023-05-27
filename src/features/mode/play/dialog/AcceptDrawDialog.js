import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const AcceptDrawDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDrawAccept = (event) => {
    event.preventDefault();
    Ws.draw(Wording.verb.ACCEPT.toLowerCase());
    dispatch(playMode.acceptDrawDialog({ open: false }));
  };

  const handleDrawDecline = (event) => {
    event.preventDefault();
    Ws.draw(Wording.verb.DECLINE.toLowerCase());
    dispatch(playMode.acceptDrawDialog({ open: false }));
  };

  return (
    <Dialog open={state.playMode.dialogs.acceptDraw.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>A draw is being offered</DialogTitle>
      <DialogContent>
        <form onSubmit={handleDrawAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={handleDrawDecline}>Decline</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptDrawDialog;
