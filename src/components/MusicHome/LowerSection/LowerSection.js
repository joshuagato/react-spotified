import React from 'react';
import './LowerSection.scss';

import VolumeIcon from '../../../assets/icons/volume.png';
import shuffle from '../../../assets/icons/shuffle.png';
import previous from '../../../assets/icons/previous.png';
import play from '../../../assets/icons/play.png';
import pause from '../../../assets/icons/pause.png';
import next from '../../../assets/icons/next.png';
import repeat from '../../../assets/icons/repeat.png';

import ControlButtons from './ControlButtons/ControlButtons';

const LowerSection = (props) =>  (
    <div className="lower-div">
        <div className="music-player">

            <div className="left">
                <section className="album-art">
                    <img src={props.albumArt} alt="img" />
                </section>
                <section className="track-details">
                    <span className="title">{props.title}</span>
                    <span className="artist">{props.artist}</span>
                </section>
            </div>

            <div className="middle">
                <section className="controls">
                    <div>
                        <ControlButtons class="control-button shuffle" title="Shuffle Button"
                            src={shuffle}  alt="shuffle" />

                        <ControlButtons class="control-button previous" title="Previous Button"
                            src={previous}  alt="previous" />

                        <ControlButtons class="control-button play" title="Play Button"
                            src={play}  alt="play" />

                        <ControlButtons class="control-button pause" title="Pause Button"
                            src={pause}  alt="pause" style={{ 'display': 'none' }} />

                        <ControlButtons class="control-button next" title="Next Button"
                            src={next}  alt="next" />

                        <ControlButtons class="control-button repeat" title="Repeat Button"
                            src={repeat}  alt="repeat" />
                    </div>
                </section>
                <section className="progress">
                    <span className="current-time">{props.current}</span>
                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                    <span className="remaining-time">{props.remaining}</span>
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

export default LowerSection;