import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Welcome from './components/Welcome/Welcome';
import NotFound from './components/NotFound/NotFound';
import MusicHome from './components/MusicHome/MusicHome';
import Experiment from './components/Experiment/Experiment';

class App extends Component {

  state = {
    username: '',
    password: '',
    fullname: null
  }

  getCredentials = (un, pw) => {
    this.setState({ username: un, password: pw });
  }

  sessionHandler = (sessionname) => {
    this.setState({ fullname: sessionname });
  }

  componentDidMount() {
    // console.log(localStorage.getItem('name'));
    // console.log(localStorage.name);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' exact render={(props) => <Welcome {...props} sess={this.sessionHandler} details={this.getCredentials} />} />
          {localStorage.name !== undefined ? <Route path='/music-home' exact render={(props) => <MusicHome {...props} />} /> : <Redirect to='/' /> }
          <Route path='/experiment' exact render={(props) => <Experiment {...props} />} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
