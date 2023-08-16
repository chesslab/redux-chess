import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Wording from 'common/Wording.js';
import * as playMode from 'features/mode/playModeSlice';
import Ws from 'features/ws/Ws';

const AcceptRematchDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRematchAccept = (event) => {
    event.preventDefault();
    Ws.rematch(Wording.verb.ACCEPT.toLowerCase());
    dispatch(playMode.acceptRematchDialog({ open: false }));
    Ws.restart();
  };

  const handleRematchDecline = (event) => {
    event.preventDefault();
    Ws.rematch(Wording.verb.DECLINE.toLowerCase());
    dispatch(playMode.acceptRematchDialog({ open: false }));
  };

  return (
    <Dialog open={state.playMode.dialogs.acceptRematch.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>A rematch is being offered</DialogTitle>
      <DialogContent>
        <form onSubmit={handleRematchAccept}>
          <DialogActions>
            <Button type="submit">Accept</Button>
            <Button onClick={handleRematchDecline}>Decline</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptRematchDialog;
