import React, { Component } from 'react';
import './App.css';
import Content from './components/content';
import axios from 'axios';

class App extends Component<{}, { listUsers: [] }> {

  constructor(props: any) {
    super(props);
    this.state = { listUsers: [] };
  } 

  callAPI() {
      axios.get('/api/users')
      .then((result) => {
        this.setState({ listUsers: result.data.Users })
      })
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    return (
          <Content users={this.state.listUsers} />
        );
  }
}

export default App;
