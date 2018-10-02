import React, { Component } from 'react';
import './main.css';
import { Header } from "./Header";
import { TodoLists } from "./TodoLists";
import { Footer } from "./Footer";

window.apiUrl = "http://localhost:8080";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data: []
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount () {
    const apiUrl = window.apiUrl + '/getTodoListAll/';

    fetch(apiUrl)
      .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            data: responseJson
        });
      });
  }

  render() {
    return (
      <div>
        <Header changeData={this.componentDidMount} />
        <TodoLists data={this.state.data} changeData={this.componentDidMount}/>
        <Footer />
      </div>
    );
  }
}

export default App;
