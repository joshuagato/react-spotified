import React, { Component } from 'react';
import './Songs.scss';
import Song from './Song/Song';

import axios from 'axios';

export class Songs extends Component {

    state = {
        songs: [],
        albumTitle: '',
        artistName: '',
        artwork: '',
        numofsongs: ''
    }

    componentDidMount() {
        const albumId = new URLSearchParams(window.location.search).get('alid');
        const artistId = new URLSearchParams(window.location.search).get('arid');

        const albumSongsQuery = {
            query: `
                query FetchAlbumSong($id: Int!) {
                    albumSongs(albumId: $id) {
                        id title duration path
                    }
                }
            `,
            variables: { id: +albumId }
        };
        axios.post('http://localhost:4004/graphql', albumSongsQuery).then(response => {
            const result = response.data.data.albumSongs;
            
            this.setState({ songs: result });
        })
        .catch(error => console.log(error));


        const albumQuery = {
            query: `
                query FetchAlbum($id: Int!) {
                    album(albumId: $id) {
                        title artist artworkPath
                    }
                }
            `,
            variables: { id: +albumId }
        };
        axios.post('http://localhost:4004/graphql', albumQuery).then(response => {
            const result = response.data.data.album;
            
            this.setState({ artwork: result.artworkPath, albumTitle: result.title, artistId: result.artist });
        })
        .catch(error => console.log(error));
        
        
        const numOfSongsQuery = {
            query: `
                query NumOfSongs($id: Int!) {
                    numOfSongs(albumId: $id)
                }
            `,
            variables: { id: +albumId }
        };
        axios.post('http://localhost:4004/graphql', numOfSongsQuery).then(response => {
            
            this.setState({ numofsongs: response.data.data.numOfSongs });
        })
        .catch(error => console.log(error));


        const artistQuery = {
            query: `
                query FetchArtist($id: Int!) {
                    artist(artistId: $id) {
                        id name
                    }
                }
            `,
            variables: { id: +artistId }
        };
        axios.post('http://localhost:4004/graphql', artistQuery).then(response => {
            const result = response.data.data.artist;
            this.setState({ artistName: result.name });
        })
        .catch(error => console.log(error));
    }

    songs = (num) => {
        if(num === 0 || num >= 2) {
            return "Songs";
        }
        else if(num === 1) {
            return "Song";
        }
    }

    render() {
        return (
            <div className="songs-container">
                <section className="song-details-section">
                    <div className="albumArt-section">
                        {this.state.artwork !== '' ? <img src={require( "../../../../assets/artwork/" + this.state.artwork )} alt="" /> : ''}
                    </div>
                    <div className="details-section">
                        <h1>{this.state.albumTitle}</h1>
                        <p>By {this.state.artistName}</p>
                        <p>{this.state.numofsongs} {this.songs(this.state.numofsongs)}</p>
                    </div>
                </section>

                <section className="songs-section">
                    {
                        this.state.songs.map((song, index) => {

                            return(
                                <Song key={song.id} number={index+1} title={song.title} artist={this.state.artistName} duration={song.duration} />
                            )
                        })
                    }
                </section>
                
            </div>
        );
    }
}

export default Songs;
