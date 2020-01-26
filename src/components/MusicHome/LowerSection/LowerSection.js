import React, { Component } from 'react';
import './LowerSection.scss';
import { connect } from 'react-redux';
import axios from 'axios';
// import { findDOMNode } from 'react-dom';

import VolumeIcon from '../../../assets/icons/volume.png';
import shuffle from '../../../assets/icons/shuffle.png';
import previous from '../../../assets/icons/previous.png';
import play from '../../../assets/icons/play.png';
import pause from '../../../assets/icons/pause.png';
import next from '../../../assets/icons/next.png';
import repeat from '../../../assets/icons/repeat.png';

import ControlButtons from './ControlButtons/ControlButtons';
import Audio from '../Audio/Audio';
// import * as actions from '../../../store/actions/index';

class LowerSection extends Component {

    constructor(props) {
        super(props);

        this.audioInstance = React.createRef();

        this.state = {
            songs: []
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

            const trackToPlay = window.$shuffle ? window.$shufflePlaylist[window.$currentIndex] : window.$currentPlaylist[window.$currentIndex];
            this.audioInstance.current.setTrack(trackToPlay, window.$currentPlaylist, true);
        }
    }
    

    nextSong = () => {
        if(window.$repeat) {
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

        const trackToPlay = window.$shuffle ? window.$shufflePlaylist[window.$currentIndex] : window.$currentPlaylist[window.$currentIndex];
        this.audioInstance.current.setTrack(trackToPlay, window.$currentPlaylist, true);
    };

    componentDidMount() {
        const graphqlQuery = {
            query: `
                {
                    allSongs {
                        id title path
                    }
                }
            `
        };
        axios.post('http://localhost:4004/graphql', graphqlQuery).then(response => {
            this.setState({ songs: response.data.data.allSongs });
        })
        .catch(error => console.log(error));
    }

    componentDidUpdate(_, prevState) {

        if(prevState.songs !== this.state.songs) {
            const newPlaylist = this.state.songs;
            
            // this.audioInstance.current.setAudioToPlay(newPlaylist[0]);
            this.audioInstance.current.setTrack(newPlaylist[0], newPlaylist, false);
        }
    }

    render() {
        return(
            <div className="lower-div">
                {/* <Audio ref="audio" /> */}
                <Audio ref={this.audioInstance} />
                
                <div className="music-player">

                    <div className="left">
                        <section className="album-art">
                            <img src={this.props.albumArt} alt="img" />
                        </section>
                        <section className="track-details">
                            <span className="title">{this.props.title}</span>
                            <span className="artist">{this.props.artist}</span>
                        </section>
                    </div>

                    <div className="middle">
                        <section className="controls">
                            <div>
                                <ControlButtons class="control-button shuffle" title="Shuffle Button"
                                    src={shuffle}  alt="shuffle" />

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
                                    src={repeat}  alt="repeat" />
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
                            <button title="Mute Button">
                                <img src={VolumeIcon} alt="vol" />
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
        playing: state.musPlay.playing
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onPlay: () => dispatch(actions.trackPlaying()),
//         onPause: () => dispatch(actions.trackPaused())
//     };
// }

export default connect(mapStateToProps, null, null, {forwardRef: true})(LowerSection);
// export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(LowerSection);