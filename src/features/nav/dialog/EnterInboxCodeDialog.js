import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormGroup,
  IconButton,
  TextField
} from '@mui/material';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';

const EnterInboxCodeDialog = () => {
  const state = useSelector(state => state.nav);

  const dispatch = useDispatch();

  const initialState = {
    hash: '',
    pgn: ''
  };

  const [fields, setFields] = useState(initialState);

  const handleCheckInbox = () => {
    Ws.inboxRead(fields.hash);
  };

  const handleHashChange = (event: Event) => {
    setFields({
      ...fields,
      hash: event.target.value
    });
  };

  const handlePgnChange = (event: Event) => {
    setFields({
      ...fields,
      pgn: event.target.value
    });
  };

  const handleSendMove = () => {
    dispatch(nav.enterInboxCodeDialog({ open: false }));
    Ws.inboxReply(fields.hash, fields.pgn);
    setFields(initialState);
  };

  return (
    <Dialog open={state.dialogs.enterInboxCode.open} maxWidth="sm" fullWidth={true}>
      <DialogTitle>
        Read Inbox
        <IconButton onClick={() => dispatch(nav.enterInboxCodeDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {
          !state.dialogs.enterInboxCode.inbox
            ? <FormGroup>
                <TextField
                  fullWidth
                  required
                  name="hash"
                  label="Inbox code"
                  variant="filled"
                  onChange={handleHashChange}
                  margin="dense"
                />
                <Button sx={{ mt: 2 }}
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={() => handleCheckInbox()}
                >
                  Read Inbox
                </Button>
              </FormGroup>
          : null
        }
        {
          state.dialogs.enterInboxCode.inbox
            ? <FormGroup>

                {
                  state.dialogs.enterInboxCode.inbox.fen
                    ? <Card sx={{ mt: 2 }}>
                        <CardContent>
                          <Button
                            size="small"
                            onClick={() => navigator.clipboard.writeText(state.dialogs.enterInboxCode.inbox.fen)}
                          >
                            Copy FEN String
                          </Button>
                          <TextField
                            id="EnterInboxCodeDialog-TextField-fen"
                            fullWidth
                            name="fen"
                            variant="filled"
                            inputProps={{
                              spellCheck: false,
                              readOnly: true
                            }}
                            value={state.dialogs.enterInboxCode.inbox.fen}
                            margin="dense"
                          />
                        </CardContent>
                      </Card>
                    : null
                }
                {
                  state.dialogs.enterInboxCode.inbox.movetext
                    ? <Card sx={{ mt: 2, mb: 1 }}>
                        <CardContent>
                          <Button
                            size="small"
                            onClick={() => navigator.clipboard.writeText(state.dialogs.enterInboxCode.inbox.movetext)}
                          >
                            Copy SAN Movetext
                          </Button>
                          <TextField
                            id="EnterInboxCodeDialog-TextField-fen"
                            multiline
                            rows={4}
                            fullWidth
                            name="movetext"
                            variant="filled"
                            inputProps={{
                              spellCheck: false,
                              readOnly: true
                            }}
                            value={state.dialogs.enterInboxCode.inbox.movetext}
                            margin="dense"
                          />
                        </CardContent>
                      </Card>
                    : null
                }
                <TextField
                  id="EnterInboxCodeDialog-TextField-movetext"
                  required
                  fullWidth
                  name="pgn"
                  label="Your move in PGN format"
                  variant="filled"
                  inputProps={{
                    spellCheck: false
                  }}
                  onChange={handlePgnChange}
                  margin="dense"
                />
                <Button sx={{ mt: 2 }}
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={() => handleSendMove()}
                >
                  Send
                </Button>
              </FormGroup>
            : null
        }
      </DialogContent>
    </Dialog>
  );
};

export default EnterInboxCodeDialog;
