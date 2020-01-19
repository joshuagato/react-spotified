import React from 'react';
import './Album.scss';

const Album = (props) => (
    <div className="album-container" onClick={() => props.click(props.albumId, props.artistId)}>
        <div className="album-pic">
            
            <img className="playlist-img" src={require( "../../../../../assets/artwork/" + props.pic )} alt="" />
            
        </div>
        <div className="album-name">
            {props.name}
        </div>
    </div>
);

export default Album;