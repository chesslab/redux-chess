import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  IconButton
} from '@mui/material';
import * as nav from 'features/nav/navSlice';

const SettingsDialog = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAnimationChange = (event: Event) => {
    dispatch(nav.settingsDialogSet({
      pieceAnimation: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  const handleEvalChange = (event: Event) => {
    dispatch(nav.settingsDialogSet({
      eval: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  const handleHeuristicsChange = (event: Event) => {
    dispatch(nav.settingsDialogSet({
      heuristics: event.target.value === 'on' ? 'off' : 'on'
    }));
  };

  return (
    <Dialog open={state.nav.dialogs.settings.open} maxWidth="xs" fullWidth={true}>
      <DialogTitle>
        Settings
        <IconButton onClick={() => dispatch(nav.settingsDialog({ open: false }))}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            label="Animate the chess pieces while playing"
            control={<Checkbox
              name="pieceAnimation"
              checked={state.nav.dialogs.settings.fields.pieceAnimation === 'on'}
              value={state.nav.dialogs.settings.fields.pieceAnimation}
              onChange={handleAnimationChange}
            />}
          />
          <FormControlLabel
            label="Display computer evaluation while playing"
            control={<Checkbox
              name="eval"
              checked={state.nav.dialogs.settings.fields.eval === 'on'}
              value={state.nav.dialogs.settings.fields.eval}
              onChange={handleEvalChange}
            />}
          />
          <FormControlLabel
            label="Display chess heuristics while playing"
            control={<Checkbox
              name="heuristics"
              checked={state.nav.dialogs.settings.fields.heuristics === 'on'}
              value={state.nav.dialogs.settings.fields.heuristics}
              onChange={handleHeuristicsChange}
            />}
          />
        </FormGroup>
        <Button sx={{ mt: 2 }}
          fullWidth
          size="large"
          variant="contained"
          onClick={() => dispatch(nav.settingsDialog({ open: false }))}
        >
          Accept
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
