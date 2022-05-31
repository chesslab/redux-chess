const boardActionTypes = {
	START: 'START',
	START_FEN: 'START_FEN',
	START_PGN: 'START_PGN',
	FLIP: 'FLIP_BOARD',
	BROWSE_HISTORY: 'BROWSE_HISTORY',
	PICK_PIECE: 'PICK_PIECE',
	LEAVE_PIECE: 'LEAVE_PIECE',
	CASTLED_SHORT: 'CASTLED_SHORT',
	CASTLED_LONG: 'CASTLED_LONG',
	LEGAL_SQS: 'LEGAL_SQS',
	UNDO: 'UNDO',
	VALID_MOVE: 'VALID_MOVE',
	PLAY_MOVE: 'PLAY_MOVE',
	GRANDMASTER: 'GRANDMASTER'
};

export default boardActionTypes;
