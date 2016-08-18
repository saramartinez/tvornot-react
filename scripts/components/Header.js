/*
  Header component
  <Header />
*/

import React from 'react';
import Nav from './Nav';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>
          TV...or not TV
        </h1>
        <Nav />
      </header>
    )
  }
};

export default Header;
