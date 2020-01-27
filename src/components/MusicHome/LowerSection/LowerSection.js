import React, { Component } from 'react';
import './LowerSection.scss';
import { connect } from 'react-redux';
// import axios from 'axios';
// import { findDOMNode } from 'react-dom';

import shuffleInactive from '../../../assets/icons/shuffle.png';
import shuffleActive from '../../../assets/icons/shuffle-active.png';
import repeatInactive from '../../../assets/icons/repeat.png';
import repeatActive from '../../../assets/icons/repeat-active.png';
import volumeInactive from '../../../assets/icons/volume-mute.png';
import volumeActive from '../../../assets/icons/volume.png';
import previous from '../../../assets/icons/previous.png';
import play from '../../../assets/icons/play.png';
import pause from '../../../assets/icons/pause.png';
import next from '../../../assets/icons/next.png';

import ControlButtons from './ControlButtons/ControlButtons';
import Audio from '../Audio/Audio';
import * as actions from '../../../store/actions/index';

class LowerSection extends Component {

    constructor(props) {
        super(props);

        this.audioInstance = React.createRef();
    }

    componentDidMount() {
        this.props.onSetInitialPlaylistToAllSongs();
    }

    componentDidUpdate(prevProps, _) {
        if(prevProps.songs !== this.props.songs) {
            const newPlaylist = this.props.songs;
            
            this.audioInstance.current.setTrack(newPlaylist[0], newPlaylist, false);
        }
    }


    playSong = () => {
        this.audioInstance.current.play();
    }
    pauseSong = () => {
        this.audioInstance.current.pause();
    }


    prevSong = () => {
        if(this.audioInstance.current.audio.currentTime >= 3 || window.$currentIndex === 0) {
            this.audioInstance.current.setTime(0);
        }
        else {
            window.$currentIndex -= 1;

            const trackToPlay = this.props.shuffle ? window.$shufflePlaylist[window.$currentIndex] : window.$currentPlaylist[window.$currentIndex];
            this.audioInstance.current.setTrack(trackToPlay, window.$currentPlaylist, true);
        }
    }
    nextSong = () => {
        if(this.props.repeat) {
            this.audioInstance.current.setTime(0);
            this.playSong();
            return;
        }

        if(window.$currentIndex === window.$currentPlaylist.length - 1) {
            window.$currentIndex = 0;
        }
        else {
            window.$currentIndex += 1;
        }

        const trackToPlay = this.props.shuffle ? window.$shufflePlaylist[window.$currentIndex] : window.$currentPlaylist[window.$currentIndex];
        this.audioInstance.current.setTrack(trackToPlay, window.$currentPlaylist, true);
    }

    setRepeat = () => {
        this.props.onRepeatPressed();
    }
    setShuffle = () => {
        this.props.onShufflePressed();
    }
    setMute = () => {
        this.props.onMutePressed();
    }

    render() {
        // console.log(this.props.)
        return(
            <div className="lower-div">
                {/* <Audio ref="audio" /> */}
                <Audio ref={this.audioInstance} />
                
                <div className="music-player">

                    <div className="left">
                        <section className="album-art">
                            {this.props.currentlyPlaying.artworkPath ? <img src={'http://localhost:4004/artwork/' + this.props.currentlyPlaying.artworkPath} alt="img" /> : 'loading...1'}
                        </section>
                        <section className="track-details">
                            {this.props.currentlyPlaying.title ? <span className="title">{this.props.currentlyPlaying.title}</span> : 'loading...'}
                            {this.props.currentlyPlaying.artistName ? <span className="artist">{this.props.currentlyPlaying.artistName}</span> : 'loading...3'}
                        </section>
                    </div>

                    <div className="middle">
                        <section className="controls">
                            <div>
                                <ControlButtons class="control-button shuffle" title="Shuffle Button"
                                    src={this.props.shuffle ? shuffleActive : shuffleInactive}  alt="shuffle"
                                        clicked={this.setShuffle} />

                                <ControlButtons class="control-button previous" title="Previous Button"
                                    src={previous}  alt="previous" clicked={this.prevSong} />

                                { !this.props.playing ? <ControlButtons class="control-button play" title="Play Button"
                                    src={play}  alt="play" clicked={this.playSong} />
                                :
                                <ControlButtons class="control-button pause" title="Pause Button"
                                    src={pause}  alt="pause" clicked={this.pauseSong} />
                                }
                                <ControlButtons class="control-button next" title="Next Button"
                                    src={next}  alt="next" clicked={this.nextSong} />

                                <ControlButtons class="control-button repeat" title="Repeat Button"
                                    src={this.props.repeat ? repeatActive : repeatInactive}  alt="repeat" 
                                        clicked={this.setRepeat} />
                            </div>
                        </section>
                        <section className="progress">
                            <span className="current-time">{this.props.current}</span>
                            <div className="progress-bar-container">
                                <div className="progress-bar"></div>
                            </div>
                            <span className="remaining-time">{this.props.remaining}</span>
                        </section>
                    </div>

                    <div className="right">
                        <section>
                            <button title="Mute Button" onClick={this.setMute}>
                                <img src={this.props.mute ? volumeInactive : volumeActive} alt="vol" />
                            </button>
                            <div className="volume-bar-container">
                                <div className="volume-bar"></div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        songs: state.songs.songs,
        playing: state.musPlay.playing,
        shuffle: state.musPlay.shuffle,
        repeat: state.musPlay.repeat,
        mute: state.musPlay.mute,
        currentlyPlaying: state.musPlay.currentlyPlaying
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onShufflePressed: () => dispatch(actions.shufflePressed()),
        onRepeatPressed: () => dispatch(actions.repeatPressed()),
        onMutePressed: () => dispatch(actions.mutePressed()),
        onSetInitialPlaylistToAllSongs: () => dispatch(actions.setInitialPlaylistToAllSongs())
    };
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(LowerSection);