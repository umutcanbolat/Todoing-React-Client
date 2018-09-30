import React, { Component } from 'react';
import http from 'axios';
import logo from './logo.svg';
import './main.css';
import { Header } from "./Header";
import { TodoLists } from "./TodoLists";


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {
    const apiUrl = 'http://localhost:8080/getTodoListAll/';
      http.get(apiUrl).then(res => {

        this.setState({
          data: res.data
        })
      });
    }

  render() {
    return (
      <div>
        <Header changeData={this.componentDidMount} />
        <TodoLists data={this.state.data} changeData={this.componentDidMount}/>
      </div>
    );
  }
}

export default App;
