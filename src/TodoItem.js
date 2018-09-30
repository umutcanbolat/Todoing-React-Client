import React, { Component } from 'react';

export class TodoItem extends Component{
  render(){

    const icon_check = <i className="fa fa-check"></i>;
    const icon_times = <i className="fa fa-times"></i>

    return (

      <tr>
        <td>{this.props.item.itemName}</td>
        <td>{this.props.item.itemDesc}</td>
        <td>{this.props.item.deadline}</td>
        <td>{this.props.item.dependencies.length > 0 ? "show deps" : "-"}</td>
        <td><button className="btn btn-outline-danger btn-sm">{icon_times}</button></td>
      </tr>
    );
  }
}
