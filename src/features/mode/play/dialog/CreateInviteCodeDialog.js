import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import Pgn from 'common/Pgn';
import * as modeConst from 'features/mode/modeConst';
import * as playMode from 'features/mode/playModeSlice';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import ColorButtonGroup from 'features/ColorButtonGroup';
import VariantTextField from 'features/VariantTextField';

const CreateInviteCodeDialog = () => {
  const state = useSelector(state => state);

  const dispatch = useDispatch();

  return (
    <Dialog open={state.playMode.dialogs.createInviteCode.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Play a Friend
        <IconButton onClick={() => dispatch(playMode.createInviteCodeDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {state.playMode.play?.hash ? <CopyCode /> : <CreateCode />}
    </Dialog>
  );
}

const CreateCode = () => {
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    variant: variantConst.CLASSICAL,
    startPos: '',
    fen: '',
    minutes: 5,
    increment: 3,
    color: 'rand',
  });

  const handleMinutesChange = (event: Event) => {
    setFields({
      ...fields,
      minutes: event.target.value
    });
  };

  const handleIncrementChange = (event: Event) => {
    setFields({
      ...fields,
      increment: event.target.value
    });
  };

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const handleCreateCode = (event) => {
    event.preventDefault();
    dispatch(nav.setPlay());
    let settings = {
      min: fields.minutes,
      increment: fields.increment,
      color: fields.color === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : fields.color,
      submode: 'friend',
      ...(fields.variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
      ...(fields.variant === variantConst.CAPABLANCA_FISCHER) && {startPos: event.target.elements.startPos.value},
      ...(fields?.fen && {fen: event.target.elements.fen?.value})
    };
    Ws.start(fields.variant, modeConst.PLAY, { settings: JSON.stringify(settings) });
  }

  return (
    <DialogContent>
      <form onSubmit={handleCreateCode}>
        <Typography
          id="input-minutes"
          align="center"
          gutterBottom
        >
          Minutes per side
        </Typography>
        <Slider
          name="min"
          aria-label="Minutes"
          defaultValue={5}
          valueLabelDisplay="auto"
          step={1}
          min={1}
          max={60}
          onChange={handleMinutesChange}
        />
        <Typography
          id="input-increment"
          align="center"
          gutterBottom
        >
          Increment in seconds
        </Typography>
        <Slider
          name="increment"
          aria-label="Increment"
          defaultValue={3}
          valueLabelDisplay="auto"
          step={1}
          min={0}
          max={60}
          onChange={handleIncrementChange}
        />
        <Grid container justifyContent="center">
          <ColorButtonGroup props={fields} />
        </Grid>
        <VariantTextField props={fields} />
        <TextField
          fullWidth
          variant="filled"
          name="fen"
          label="From FEN position"
          onChange={handleFenChange}
          margin="dense"
        />
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Create Invite Code
        </Button>
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
        variant="filled"
        type="text"
        name="sharecode"
        label="Share this code with a friend"
        value={state.playMode.play.hash}
        margin="dense"
      />
      <Button sx={{ mt: 2 }}
        fullWidth
        size="large"
        variant="contained"
        onClick={() => {
          navigator.clipboard.writeText(state.playMode.play.hash);
          dispatch(playMode.createInviteCodeDialog({ open: false }));
      }}>
        Copy and Play
      </Button>
    </DialogContent>
  );
}

export default CreateInviteCodeDialog;
