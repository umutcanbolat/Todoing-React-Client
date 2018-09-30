import React, { Component } from 'react';

export class TodoList extends Component{
  render(){
    const id = this.props.list.listId;
    return (
      <a className="nav-link" id={"v-pills-" + id + "-tab"} data-toggle="pill" href={"#v-pills-" + id} role="tab" aria-controls={"#v-pills-" + id}> {this.props.list.listName} </a>
    );
  }
}
