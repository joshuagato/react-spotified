import React, { Component } from 'react';
import './Songs.scss';
import { connect } from 'react-redux';

import Song from './Song/Song';
import Audio from '../../Audio/Audio';
import * as actions from '../../../../store/actions/index'


export class Songs extends Component {

    constructor(props) {
        super(props);

        this.audioInstance = React.createRef();
    }

    componentDidMount() {
        const albumId = new URLSearchParams(window.location.search).get('alid');
        const artistId = new URLSearchParams(window.location.search).get('arid');

        this.props.onFetchAllSongDetails(albumId, artistId);
    }

    componentDidUpdate(prevProps, _) {
        if(prevProps.currentlyPlaying.id !== this.props.currentlyPlaying.id && prevProps.songs !== this.props.songs) {

            const newPlaylist = this.props.songs;
            this.audioInstance.current.setTrack(newPlaylist[0], newPlaylist, false);
        }
    }

    songs = num => {
        if(num === 0 || num >= 2) {
            return "Songs";
        }
        else if(num === 1) {
            return "Song";
        }
    }

    playClicked = id => {
        console.log("CLICKED THE PLAY BUTTON WITH ID: ", id);
    }

    render() {
        return (
            <div className="songs-container">
                <Audio ref={this.audioInstance} />

                <section className="song-details-section">
                    <div className="albumArt-section">
                        {/* {this.props.albumArtwork !== '' ? <img src={require( "../../../../assets/artwork/" + this.props.albumArtwork )} alt="" /> : ''} */}
                        {this.props.albumArtwork !== '' ? <img src={ "http://localhost:4004/artwork/" + this.props.albumArtwork} alt="" /> : ''}
                    </div>
                    <div className="details-section">
                        <h1>{this.props.albumTitle}</h1>
                        <p>By {this.props.artistName}</p>
                        <p>{this.props.numofsongs} {this.songs(this.props.numofsongs)}</p>
                    </div>
                </section>

                <section className="songs-section">
                    {
                        this.props.songs.map((song, index) => {

                            return(
                                <Song key={song.id} id={song.id} number={index+1} title={song.title} artist={this.props.artistName} 
                                duration={song.duration} clicked={this.playClicked} />
                            )
                        })
                    }
                </section>
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        songs: state.songs.songs,
        albumTitle: state.songs.albumTitle,
        albumArtwork: state.songs.albumArtwork,
        numofsongs: state.songs.numofsongs,
        artistName: state.songs.artistName,
        currentlyPlaying: state.musPlay.currentlyPlaying
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllSongDetails: (albumId, artistId) => dispatch(actions.fetchAllSongDetails(albumId, artistId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
