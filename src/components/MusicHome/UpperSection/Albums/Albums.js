import React, { Component } from 'react';
import './Albums.scss';

import { withRouter } from 'react-router-dom';

import Auxil from '../../../Auxil/Auxil';
import Album from './Album/Album';

import axios from 'axios';

class Albums extends Component {

    state = {
        albums: []
    }

    UNSAFE_componentWillMount() {

        const graphqlQuery = {
            query: `
                {
                    albums {
                        id title artist artworkPath
                    }
                }
            `
        };
        axios.post('http://localhost:4004/graphql', graphqlQuery).then(response => {
            this.setState({ albums: response.data.data.albums });
        })
        .catch(error => console.log(error));
    }

    openSongs = (albumId, artistId) => {
        // this.props.history.push('/music-home?songs&alid=' + albumId + '&arid=' + artistId);
        
        const queryParams = [];
        queryParams.push(encodeURIComponent('songs'));
        queryParams.push(encodeURIComponent('alid') + '=' + encodeURIComponent(albumId));
        queryParams.push(encodeURIComponent('arid') + '=' + encodeURIComponent(artistId));
        
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/music-home',
            search: '?' + queryString
        });
    }

    render() {

        return (
            <Auxil>
                <h1 className="albums-heading">You might also like</h1>
                <div className="albums">
                    {
                        this.state.albums.map(album => (
                            <Album key={album.id} albumId={album.id} artistId={album.artist} pic={album.artworkPath} 
                                name={album.title} click={this.openSongs} />
                        ))
                    }
                </div>
                
            </Auxil>
        );
    }
};

export default withRouter(Albums);