import React, { Component } from 'react';

export class TodoItem extends Component{
  constructor(props){
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
    this.changeItemStatus = this.changeItemStatus.bind(this);
  }

  deleteItem(event){
    const deleteUrl = 'http://localhost:8080/deleteItemById';
    fetch(deleteUrl + '/' + this.props.item.itemId, {
      method: 'delete'
    }).then(response => {
        if (response.ok) {
          this.props.changeData(this.props.item.list);
        }
      });
  }

  changeItemStatus(event){
    const updateUrl = 'http://localhost:8080/changeItemStatusById';
    fetch(updateUrl + '/' + this.props.item.itemId, {
      method: 'put'
    }).then(response => {
        if (response.ok) {
          this.props.changeData(this.props.item.list);
        }
      });
  }


  render(){
    const icon_times = <i className="fa fa-times"></i>

    return (
      <tr onClick={this.changeItemStatus} className={this.props.item.status ? "disabled" : "umut"}>
        <td>{this.props.item.itemName}</td>
        <td>{this.props.item.itemDesc}</td>
        <td>{this.props.item.deadline}</td>
        <td>{this.props.item.dependencies.length > 0 ? "show deps" : "-"}</td>
        <td><button onClick={this.deleteItem} className="btn btn-outline-danger btn-sm">{icon_times}</button></td>
      </tr>
    );
  }
}
