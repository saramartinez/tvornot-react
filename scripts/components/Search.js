/*
  Search component
  <Search />
*/

import React from 'react';
import { browserHistory } from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import $ from 'jquery';

var ROVI_LISTINGS_API_KEY = "kdh9bsjtym5sm4vuuj9xn93g";

@autobind
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providersList : {},
      tvServiceProvider : {}
    };
    this.findProviders = this.findProviders.bind(this);
    this.listProviders = this.listProviders.bind(this);
  }

  findProviders(event) {

    event.preventDefault();

    // if user enters a string or a zip code shorter/longer than 5 digits, zip automatically set to 90210
    var zipcode = this.refs.zipcode.value;
    zipcode = (isNaN(zipcode) || zipcode.toString().length !== 5) ? 90210 : zipcode;

    var providerRequest = 'http://api.rovicorp.com/TVlistings/v9/listings/services/postalcode/' + zipcode + '/info?locale=en-US&countrycode=US&format=json&apikey=' + ROVI_LISTINGS_API_KEY;

    $.ajax({
      type : 'GET',
      contentType : 'application/json; charset=utf-8',
      url : providerRequest,
      dataType : 'jsonp',
      headers : { 'Access-Control-Allow-Origin': '*' },
      crossDomain : true,
      success : function (data) {
        var providers = data.ServicesResult.Services.Service;
        this.setState({
          providersList : providers
        });
        this.listProviders(providers);
      }.bind(this),
      error : function(err) {
        console.log('error', err);
      }.bind(this)
    });

    // return (
    //   // list services!!!
    // )

  }



  listProviders(providers) {
    console.log("providers list", providers);
    var i;

    // $('#service-options').empty();
    // $('.show-options').html('Choose your TV service provider:');


    for (i=0; i < providers.length; i++) {
      console.log("here", i, providers[i].ServiceId, providers[i].Name);
      var providerId = providers[i].ServiceId,
          providerName = providers[i].Name;
      console.log(this.state.providersList);
      // $('#service-options').append('<div class="radio"><li><label><input type="radio" name="service-provider" value="' + providerId + '">' + providerName + '</label></li></div>');

    }
  }

  renderProviders(key) {
    var linkState = this.props.linkState;
    console.log("key", key);
    return (
      <div className="radio">
        <li>
          <label>
            <input type="radio" name="service-provider" value="{key.ServiceId}" />
            {key.Name}
          </label>
        </li>
      </div>
    )
  }


  render() {
    return (
      <form className="zip-search" onSubmit={this.findProviders} >
        <span>Search for Zip Code:</span>
        <input type="text" ref="zipcode" />
        <input type="Submit" />
        <p className="show-options"></p>
        <ul id="service-options">
          {Object.keys(this.state.providersList).map(this.renderProviders)}
        </ul>
      </form>
    )
  }
};

// reactMixin.onClass(Search, History);

export default Search;
