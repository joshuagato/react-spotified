import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import logo from './logo.svg';
import './App.css';
import Welcome from './components/Welcome/Welcome';
// import NotFound from './components/NotFound/NotFound';
import MusicHome from './components/MusicHome/MusicHome';
import Logout from './components/Welcome/Logout/Logout';
import Experiment from './components/Experiment/Experiment';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/' exact render={(props) => <Welcome {...props} />} />
        <Route path='/experiment' exact render={(props) => <Experiment {...props} />} />
        <Redirect to='/' />
        {/* <Route component={NotFound} /> */}
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/music-home' render={(props) => <MusicHome {...props} />} />
          <Logout path='/logout' component={Logout} />
          <Redirect to='/music-home' />
          {/* <Route component={NotFound} /> */}
        </Switch>
      );
    }
    return (
      <div className="App">
        { routes }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    // isAuthenticated: state.auth.isAuthenticated,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
