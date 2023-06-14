import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import * as pgnMode from 'features/mode/pgnModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const LoadPgnDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [variant, setVariant] = useState(variantConst.CLASSICAL);

  const handleVariantChange = (event: Event) => {
    setVariant(event.target.value);
  };

  const handleLoad = (event) => {
    event.preventDefault();
    multiAction.initGui(dispatch);
    dispatch(nav.setAnalysis());
    let settings = {
      movetext: event.target.elements.pgn.value,
      ...(variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
    };
    Ws.start(event.target.elements.variant.value, modeConst.PGN, settings);
  };

  return (
    <Dialog open={state.pgnMode.dialogs.loadPgn.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        PGN Movetext
        <IconButton onClick={() => dispatch(pgnMode.loadPgnDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleLoad}>
          <TextField
            select
            required
            fullWidth
            name="variant"
            label="Variant"
            variant="filled"
            value={variant}
            margin="normal"
            onChange={handleVariantChange}
            >
            <MenuItem key={0} value="classical">
              Classical
            </MenuItem>
            <MenuItem key={1} value="960">
              Fischer Random 960
            </MenuItem>
            <MenuItem key={2} value="capablanca">
              Capablanca
            </MenuItem>
          </TextField>
          {
            variant === variantConst.CHESS_960
              ? <TextField
                fullWidth
                required
                name="startPos"
                label="Start position"
                variant="filled"
                helperText="Examples: RNBQKBNR, RBBKRQNN, NRKNBBQR, etc."
              />
              : null
          }
          <TextField
            id="LoadPgnDialog-TextField-movetext"
            fullWidth
            required
            multiline
            rows={4}
            name="pgn"
            label="Movetext"
            variant="filled"
            margin="normal"
            inputProps={{
              spellCheck: false
            }}
          />
          <Button
            id="LoadPgnDialog-Button-load"
            fullWidth
            type="submit"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Load
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoadPgnDialog;
