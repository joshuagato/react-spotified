import * as actionTypes from '../actions/actionTypes';

const initialState = {
    playing: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.TRACK_PLAYING_OR_PLAY_BUTTON_PRESSED:
            return { ...state, playing: true };

        case actionTypes.TRACK_PAUSED_OR_PAUSE_BUTTON_PRESSED:
            return { ...state, playing: false };

        default: return state;
    }
}

export default reducer;