import React, { Component } from 'react';
import './MusicHome.scss';
import { connect } from 'react-redux';
// import axios from 'axios';

import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";

import LowerSection from './LowerSection/LowerSection';
import UpperSection from './UpperSection/UpperSection';
import * as actions from '../../store/actions/index';
import Audio from './Audio/Audio';

class MusicHome extends Component {

    constructor(props) {
        super(props);

        this.audioInstance = React.createRef();
    }

    componentDidMount() {
        if(this.props.location.search === '') this.props.history.push('/music-home?browse');
        
        // Fetching the logged in user's details
       this.props.onFetchUser(this.props.userId);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.userData.firstname !== this.props.userData.firstname || 
            prevProps.userData.lastname !== this.props.userData.lastname) {
                
                this.props.onFetchUser(this.props.userId);
            }
    }

    render() {
        // I NEEED TO FIX A BUG HERE || I'VE FIXED IT
        let param = this.props.location.search;

        return (
            <div className="music-home">
                <Audio ref={this.audioInstance} />

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
                <UpperSection urlParam={param} name={this.props.userData.firstname + ' ' + this.props.userData.lastname} />


                {/* Lower Section */}
                <LowerSection artist="StoneBwoy" 
                    current={2.56} remaining={5.32}  />

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userId: state.auth.userId,
        userData: state.userDet.userDataForAll,
        // userData: state.userDet.userDataForHome,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: userId => dispatch(actions.fetchUserForMusicHome(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(MusicHome);
