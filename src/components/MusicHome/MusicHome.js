import React, { Component } from 'react';
import './MusicHome.scss';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

import LowerSection from './LowerSection/LowerSection';
import UpperSection from './UpperSection/UpperSection';

import StoneBwoy from '../../assets/artwork/stonebwoy.jpg';

class MusicHome extends Component {

    render() {
        let param = this.props.location.search;
        
        if(param === '') this.props.history.push('/music-home?browse');

        return (
            <div className="music-home">
                <div className="fixed-bar">
                    <section className="mobile-nav">
                        <NavLink to='/music-home?albums'><FontAwesomeIcon icon={faHome} /></NavLink>
                        <NavLink to='/music-home?search'><FontAwesomeIcon icon={faSearch} /></NavLink>
                        <NavLink to='/music-home?browse'><FontAwesomeIcon icon={faPlay} /></NavLink>
                        <NavLink to='/music-home?playlists'><FontAwesomeIcon icon={faListAlt} /></NavLink>
                        <NavLink to='/music-home?settings'><FontAwesomeIcon icon={faUserAlt} /></NavLink>
                    </section>
                </div>

                {/* Upper Section */}
                <UpperSection urlParam={param} name="Joshua Gato" />


                {/* Lower Section */}
                <LowerSection albumArt={StoneBwoy} title="Tomorrow" artist="StoneBwoy" current={2.56} remaining={5.32} />

            </div>
        );
    }
}

export default MusicHome;
