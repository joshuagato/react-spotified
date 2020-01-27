import axios from 'axios';
import * as actionTypes from './actionTypes';

export const setCurentlyPlaying = track => {
    return dispatch => {
        dispatch(getCurrentTrackDetails(track));

         // Album query
         const albumQuery = {
            query: `
                query FetchAlbum($id: Int!) {
                    album(albumId: $id) {
                        artworkPath
                    }
                }
            `,
            variables: { id: +track.album }
        };
        axios.post('http://localhost:4004/graphql', albumQuery).then(response => {
            const result = response.data.data.album;
            dispatch(getAndPushArtworkPath(result.artworkPath));
        })
        .catch(error => console.log(error));


        // Artist query
        const artistQuery = {
            query: `
                query FetchArtist($id: Int!) {
                    artist(artistId: $id) {
                        id name
                    }
                }
            `,
            variables: { id: +track.artist }
        };
        axios.post('http://localhost:4004/graphql', artistQuery).then(response => {
            const result = response.data.data.artist;
            dispatch(getAndPushArtistName(result.name));
        })
        .catch(error => console.log(error));
    }
}
const getAndPushArtistName = name => {
    return {
        type: actionTypes.GET_AND_PUSH_ARTIST_NAME,
        artistName: name
    }
}
const getAndPushArtworkPath = artwork => {
    return {
        type: actionTypes.GET_AND_PUSH_ARTWORK_PATH,
        artworkPath: artwork
    }
}
const getCurrentTrackDetails = track => {
    return {
        type: actionTypes.SET_CURRENTLY_PLAYING,
        currentTrack: track
    }
}


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


export const repeatPressed = () => {
    return {
        type: actionTypes.REPEAT_BUTTON_PRESSED
    };
}
export const shufflePressed = () => {
    return {
        type: actionTypes.SHUFFLE_BUTTON_PRESSED
    };
}