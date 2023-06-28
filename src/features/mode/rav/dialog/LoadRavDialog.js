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
import * as ravMode from 'features/mode/ravModeSlice';
import * as modeConst from 'features/mode/modeConst';
import * as variantConst from 'features/mode/variantConst';
import * as nav from 'features/nav/navSlice';
import Ws from 'features/ws/Ws';
import multiAction from 'features/multiAction';

const LoadRavDialog = () => {
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
      movetext: event.target.elements.rav.value,
      ...(variant === variantConst.CHESS_960) && {startPos: event.target.elements.startPos.value},
    };
    Ws.start(event.target.elements.variant.value, modeConst.RAV, settings);
  };

  return (
    <Dialog open={state.ravMode.dialogs.loadRav.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        RAV Movetext
        <IconButton onClick={() => dispatch(ravMode.loadRavDialog({ open: false }))}>
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
            id="LoadRavDialog-TextField-movetext"
            fullWidth
            required
            multiline
            rows={4}
            name="rav"
            label="Movetext"
            variant="filled"
            margin="normal"
            inputProps={{
              spellCheck: false
            }}
          />
          <Button
            id="LoadRavDialog-Button-load"
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

export default LoadRavDialog;
