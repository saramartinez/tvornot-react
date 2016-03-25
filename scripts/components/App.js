/*
  App
  <App />
*/
import React from 'react';
import { History } from 'react-router';

import Catalyst from 'react-catalyst';
import autobind from 'autobind-decorator';
import reactMixin from 'react-mixin';

import Header from './Header';
import Search from './Search';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://tvornottv.firebaseio.com/');

@autobind
class App extends React.Component {
  // constructor method is going to run every time we create the App class
  constructor() {
    super(); // calls parent constructor: React.Component

    this.state = {
      tvShows : {},
      userFaves : {},
      listings : {},
      uid : ''
    }
  }

  componentDidMount() {
    // base.syncState( (this.props.params.storeId + '/fishes'), {
    //   context : this,
    //   state : 'tvShows'
    // });

    // then store order in local storage
    var localStorageRef = localStorage.getItem('tvShow-' + this.props.params.tvShow);

    if (localStorageRef) {
      // update component state to reflect what's in local storage
      this.setState( {
        order : JSON.parse(localStorageRef)
      });
    }
  }



  // method to add show to database
  addShow(tvShow) {
    // for each in show do this
    var timestamp = (new Date()).getTime();

    // update the state object
    // creates unique key and value is fish obj
    this.state.tvShows['tvShow-' + timestamp] = tvShow

    // set the state
    // explicitly tell it to set state and pass it itself -- done for performance so it does as little comparison as possible
    this.setState({ tvShows : this.state.tvShows });
  }

  renderShows(key) {
    return <Show key={key} index={key} details={this.state.userFaves[key]} addToOrder={this.addToOrder} />
  }

  // renderSearchResults(key) {
  //   return <Show key={key} index={key} details={this.state.searchResults[key]} addToOrder={this.addToOrder} />
  // }






  render() {
    return (
      <div className="tv-or-not-tv">
        <Header />
        <Search listProviders={this.listProviders} />
        <ul className="favorites">
          {Object.keys(this.state.userFaves).map(this.renderShows)}
        </ul>

      </div>
    )
  }

};

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;
