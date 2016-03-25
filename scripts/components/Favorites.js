/*
  Favorites component
  <Favorites />
*/

import React from 'react';
import Show from './show';

class Favorites extends React.Component {
  render() {
    return (
      <div className="top">
        <h1>
          Favorites
        </h1>
        <Show />
      </div>
    )
  }
};

export default Favorites;
