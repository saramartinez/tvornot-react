/*
  Navigation component
  <Nav />
*/

import React from 'react';
import Search from './Search';
import autobind from 'autobind-decorator';

// for firebase oauth
import Firebase from 'firebase'; // imports Firebase script library
// const gives us a variable that can't be overwritten
const ref = new Firebase('https://tvornottv.firebaseio.com');

@autobind
class Nav extends React.Component {

  constructor() {
    super(); // inherits parent class
    this.state = {
      uid : '',
      owner : ''
    }
  }

  authenticate(provider) {
    console.log('trying to log in');
    ref.authWithOAuthPopup(provider, this.authHandler);
  }

  // run after authenticate --> authHandler so that before component
  // renders, communicate back with firebase that they've been there
  // before and don't need to log in again, will reauthenticate them.
  componentWillMount() {
    // runs when component will mount
    // componentShouldRender() would skip lag
    var token = localStorage.getItem('token');
    if (token) {
      ref.authWithCustomToken(token, this.authHandler);
    }
  }

  logout() {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
      uid : null
    });
  }

  // authentication callback function
  authHandler(error, authData) {
    // console.log("here");
    if (error) {
      console.log(error);
      return;
    }

    // save login token in the browser, so it'll be there on reload
    // can use cookie or localStorage
    localStorage.setItem('token', authData.token);

      this.setState({
        uid : authData.uid,
      });

  }

  renderLogin() {
    return (
      <nav className="top">
        <p>Sign in to add shows to your favorites.</p>
        <button className="github" onClick={this.authenticate.bind(this, 'github')}>Log in with GitHub</button>
        <button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}>Log in with Facebook</button>
      </nav>
    )
  }

  logout() {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
      uid : null
    });
  }


  render() {
    let logoutButton = <button onClick={this.logout}>Log Out</button>;

    // first check if user is NOT logged in / does not have a user ID
    if (!this.state.uid) {
      return (
        <div>
          {this.renderLogin()}
        </div>
      )
    }

    // if (this.state.uid !== this.state.owner) {
    //   return (
    //     <div>
    //       <p>You are logged in.</p>
    //       {logoutButton}
    //     </div>
    //   )
    // }

    // then render nav
    return (
      <nav className="top">
        <ul className="navbar">
          <li>Favorites</li>
          <li>{logoutButton}</li>
        </ul>
      </nav>
    )

  }
};

export default Nav;
