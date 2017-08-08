import React, { Component } from 'react';
import '../styles/App.css';
import Search from './Search';
import Result from './Result';
import Pagination from './Pagination';
import Filter from './Filter';

const laborTypes = ['Union', 'Non-Union', 'Prevailing Wages', 'None'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSearch: '',
      results: [],
      total: null,
      startPosition: 1,
      listHeading: '',
      laborTypes: []
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
    var request = `/api/companies/?q=${this.state.currentSearch}&start=${this.state.startPosition}&laborTypes=${this.state.laborTypes.join(',')}`;
    fetch(request)
    .then(response => response.json())
    .then(res => {
      res.results.forEach(company =>
        company.hide = true
      )
      this.setState({
        results: res.results,
        total: res.total
      }, () => this.setCompanyList());
    });
  }

  setCompanyList() {
    if (this.state.results.length === 0) {
      this.setState({ listHeading: `No search results for ${this.state.currentSearch}`});
    } else {
      this.setState({ listHeading: `Showing search results for ${this.state.currentSearch}`});
    }
  }

  setFilters(event) {
    const laborType = event.target.value;
    const checked = event.target.checked;
    const laborTypes = this.state.laborTypes.filter(lt => lt !== laborType);

    if (checked) {
      laborTypes.push(laborType);
    }
    this.setState({ laborTypes }, () => this.callApi());
  }

  showMoreInfo(company, event) {

    this.setState({
      results: this.state.results.map(rCompany => {
        if (rCompany === company) {
          return Object.assign({}, company, { hide: false });
        } else {
          return rCompany;
        }
      })
    })
  }

  handlePageChange(startPosition, event) {
    if (startPosition < 0 || startPosition > this.state.total) {
      return;
    }
    this.setState({ startPosition }, () => this.callApi());
  }

  render() {
    const { results, listHeading, total, startPosition } = this.state;
    return (
      <div className="App">
        <Search value={this.state.currentSearch} onChange={this.handlSearchChange.bind(this)} />
        <Filter laborTypes={laborTypes} onChange={this.setFilters.bind(this)} />
        <h2 className="list-heading">{listHeading}</h2>
        <ul>
          {results.map(company =>
            <Result key={company.name} company={company} onClick={this.showMoreInfo.bind(this)} />
          )}
        </ul>
        <Pagination total={total} startPosition={startPosition} onClick={this.handlePageChange.bind(this)} />
      </div>
    );
  }
}

export default App;
