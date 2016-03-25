/*
  Routes
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import NotFound from './NotFound';
import App from './App';
import Show from './Show';
import Favorites from './Favorites';
import Search from './Search';
import SearchResults from './SearchResults';

var Routes = (
  <Router history={browserHistory} >
    <Route path="/" component={App} />
    <Route path="*" component ={NotFound} />
    <Route path="/favorites" component={Favorites} />
    <Route path="/search" component={Search} />
    <Route path="/search/results/:searchTerms" component={SearchResults} />
    <Route path="/show/:showId" component={Show} />
  </Router>
)

ReactDOM.render(
  Routes,
  document.querySelector('#main')
);

export default Routes;
