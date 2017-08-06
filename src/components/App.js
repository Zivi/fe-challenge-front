import React, { Component } from 'react';
import '../styles/App.css';
import Search from './Search';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSearch: ''
    }
    this.timerStarted = false;
  }

  handlSearchChange(event) {
    this.setState({
      currentSearch: event.target.value
    });
    if (!this.timerStarted) {
      this.timerStarted = true;
      window.setTimeout(this.timerEnd.bind(this), 1000);
    }
  }

  timerEnd() {
    this.timerStarted = false;
    this.callApi();
  }

  callApi() {
    //todo: add labour types and start position filters

    var request = `/api/companies/?q=${this.state.currentSearch}`; //&start=${startPosition}`;
    fetch(request).then(function(result) {
      return result.json();
    }).then(function(response) {
      debugger;
    })
  }

  // set state of the search results to populate
  render() {
    return (
      <div className="App">
        <Search value={this.state.currentSearch} onChange={this.handlSearchChange.bind(this)}/>
      </div>
    );
  }
}

export default App;
