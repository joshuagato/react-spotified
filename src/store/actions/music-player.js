import * as actionTypes from './actionTypes';

export const trackPlaying = () => {
    return {
        type: actionTypes.TRACK_PLAYING_OR_PLAY_BUTTON_PRESSED
    };
}

export const trackPaused = () => {
    return {
        type: actionTypes.TRACK_PAUSED_OR_PAUSE_BUTTON_PRESSED
    };
}