import React from 'react';
import './Album.scss';

// http://localhost:4000/images/999b8d64-0aff-4fad-810a-19d43452e1c5-download
// http://localhost:4000/assets/artwork/999b8d64-0aff-4fad-810a-19d43452e1c5-download
// \assets\artwork

const Album = (props) => (
    <div className="album-container" onClick={() => props.click(props.albumId, props.artistId)}>
        <div className="album-pic">
            
            <img className="playlist-img" src={require( "../../../../../assets/artwork/" + props.pic )} alt="" />
            {/* <img className="playlist-img" src={require( "http://localhost:4004/assets/artwork/" + props.pic )} alt="" /> */}
            {/* <img className="playlist-img" src={"http://localhost:4004/assets/artwork/" + props.pic} alt="" /> */}
            
        </div>
        <div className="album-name">
            {props.name}
        </div>
    </div>
);

export default Album;