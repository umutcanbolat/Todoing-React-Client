import React, { Component } from 'react';

export class Header extends Component {
  render () {
    return (
      <div className="jumbotron text-center">
        <h1>Todoing Todo-List App</h1>
          <p>Type below to create a new todo list!</p>
            <div className="col-sm-4 offset-4">
              <TodoListForm changeData={this.props.changeData}/>
            </div>
      </div>
    );
  }
}

class TodoListForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: ""
    };

    this.addList = this.addList.bind(this);
    this.changeInput = this.changeInput.bind(this);
  }



  addList (e) {
    const apiUrl = window.apiUrl + '/addTodoList/';
    e.preventDefault();

    var params = {
        listName: this.state.text
    };
    var formData = new FormData();
    for (var k in params) {
        formData.append(k, params[k]);
    }
    var request = {
        method: 'POST',
        body: formData
    };
    fetch(apiUrl, request).then(response => {
      if (response.ok) {
        this.setState({
          text: ''
        })
        this.props.changeData();
      }
    });
  }

  changeInput (e) {
    this.setState({
      text: e.target.value
    })
  }

  render(){
    return(
      <form onSubmit={this.addList}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Name of the list" onChange={this.changeInput} value={this.state.text} />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}
