/*
  Show
  <Show />
*/

import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class Show extends React.Component {

  createShow(event) {
    // 1. Stop the form from submitting
    event.preventDefault();

    // 2. Take data from the search results and create an object
    var tvShow = {
      title : this.refs.title.value,
      cosmoid : this.refs.cosmoid.value,
      tvdb_id : this.refs.tvdb_id.value,
      synopsis : this.refs.synopsis.value,
      img : this.refs.img.value
    }
    // 3. Add the show to the App State
    this.props.addShow(tvShow);
    // this.refs.showForm.reset();
  }

  render() {

    return (
      <form className="show-search" ref="showForm" onSubmit={this.addShow}>
        <input type="text" ref="title" placeholder="Title" />
        <button type="submit">Search</button>
      </form>
    )
  }
};

export default Show;
