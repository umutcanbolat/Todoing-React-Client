import React, { Component } from 'react';

export class TodoItem extends Component{
  render(){
    return (
      <a href="#" className="list-group-item">{this.props.item.itemName}</a>
    );
  }
}
