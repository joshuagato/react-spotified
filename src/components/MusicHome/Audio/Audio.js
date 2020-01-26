import { Component } from 'react';
// import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
// import LowerSection from '../LowerSection/LowerSection';

class Audio extends Component {
    constructor(props) {
        super(props);

        window.$currentPlaylist = [];
        window.$shufflePlaylist = [];
        window.$tempPlaylist = [];
        window.$currentIndex = 0;
        window.$shuffle = false;
        window.$repeat = false;

        this.currentlyPlaying = {};
        this.audio = document.createElement('audio');

        this.setAudioToPlay = track => {
            this.currentlyPlaying = track;
            this.audio.src = 'http://localhost:4004/music/' + track.path;
        };

        this.setTrack = (track, newPlaylist, play) => {
            if(newPlaylist !== window.$currentPlaylist) {
    
                window.$currentPlaylist = newPlaylist;
                window.$shufflePlaylist =  window.$currentPlaylist.slice();
                this.shuffleArray(window.$shufflePlaylist);
            }
    
            if(window.$shuffle === true) {
                window.$currentIndex = window.$shufflePlaylist.indexOf(track);
            }
            else {
                window.$currentIndex = window.$currentPlaylist.indexOf(track);
            }
    
            this.pause();

            this.setAudioToPlay(track);

            if(play) {
                this.play();
            }
        };

        this.play = () => {
            this.props.onPlay();
            this.audio.play();
        };

        this.pause = () => {
            this.props.onPause();
            this.audio.pause();
        };

        this.setTime = seconds => {
            this.audio.currentTime = seconds;
        };
        
        this.shuffleArray = a => {
            var j, x, i;
            for(i = a.length; i; i--){
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
        };
    }

    render() {
        return (null);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPlay: () => dispatch(actions.trackPlaying()),
        onPause: () => dispatch(actions.trackPaused())
    };
};

export default connect(null, mapDispatchToProps, null, {forwardRef: true})(Audio);
