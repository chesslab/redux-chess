import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Slider,
  TextField,
  Typography
} from '@mui/material';
import Pgn from 'common/Pgn';
import SelectColorButtons from 'features/mode/SelectColorButtons';
import * as modeConst from 'features/mode/modeConst';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import * as nav from 'features/nav/navSlice';
import * as variantConst from 'features/mode/variantConst';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const PlayComputerDialog = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const [fields, setFields] = React.useState({
    position: 'start',
    level: 1,
    color: 'rand',
    fen: ''
  });

  const handleCreateGame = (event) => {
    event.preventDefault();
    let payload;
    if (fields.position === 'fen') {
      payload = configure(Pgn.symbol.WHITE); // arbitrary color
      Ws.start(variantConst.CLASSICAL, modeConst.STOCKFISH, {
        fen: fields.fen
      });
    } else {
      let color = fields.color === 'rand'
        ? Math.random() < 0.5 ? Pgn.symbol.WHITE : Pgn.symbol.BLACK
        : fields.color;
      payload = configure(color);
      Ws.start(variantConst.CLASSICAL, modeConst.STOCKFISH, {
        color: color
      });
    }
    multiAction.initGui(dispatch);
    dispatch(nav.setPlay());
    dispatch(stockfishMode.set({
      variant: variantConst.CLASSICAL,
      computer: payload,
    }));
  };

  const handlePositionChange = (event: Event) => {
    setFields({
      ...fields,
      position: event.target.value
    });
  };

  const handleLevelChange = (event: Event) => {
    setFields({
      ...fields,
      level: event.target.value
    });
  };

  const handleFenChange = (event: Event) => {
    setFields({
      ...fields,
      fen: event.target.value
    });
  };

  const configure = (color) => {
    let settings = {
      color: color,
      options: {
        "Skill Level": 11
      },
      params: {
        "depth": 4
      }
    };
    if (fields.level === 0) {
      settings.options["Skill Level"] = 6;
      settings.params["depth"] = 2;
    } else if (fields.level === 2) {
      settings.options["Skill Level"] = 17;
      settings.params["depth"] = 8;
    } else if (fields.level === 3) {
      settings.options["Skill Level"] = 20;
      settings.params["depth"] = 12;
    }

    return settings;
  }

  return (
    <Dialog open={state.stockfishMode.dialogs.playComputer.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Play Computer
        <IconButton onClick={() => dispatch(stockfishMode.playComputerDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleCreateGame}>
          <Typography
            id="level"
            gutterBottom
            align="center"
          >
            Difficulty level
          </Typography>
          <Slider
            name="level"
            aria-label="Level"
            defaultValue={1}
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={3}
            marks
            onChange={handleLevelChange}
          />
          {
            fields.position === 'start'
              ? <Grid container justifyContent="center">
                <SelectColorButtons props={fields} />
              </Grid>
              : null
          }
          <TextField
            select
            required
            fullWidth
            name="position"
            label="From position"
            variant="filled"
            defaultValue="start"
            value={fields.position}
            margin="normal"
            onChange={handlePositionChange}
            >
            <MenuItem key={0} value="start">
              Start
            </MenuItem>
            <MenuItem key={1} value="fen">
              FEN
            </MenuItem>
          </TextField>
          {
            fields.position === 'fen'
              ? <TextField
                  fullWidth
                  required
                  name="fen"
                  label="Enter a FEN position"
                  variant="filled"
                  margin="normal"
                  onChange={handleFenChange}
              />
              : null
          }
          <Button
            fullWidth
            type="submit"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Create Game
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PlayComputerDialog;
