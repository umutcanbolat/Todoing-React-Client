import React, { Component } from 'react';
import {TodoItem} from './TodoItem';

export class ListDetail extends Component{
  constructor (props) {
    super(props);

  }

  render(){

    let listId = this.props.list.listId;
    let listName = this.props.list.listName;

    const items = this.props.list.items.map(item => {
      return <TodoItem item={item} />
    });

    return (

      <div className="tab-pane fade show" id={"v-pills-" + listId} role="tabpanel" aria-labelledby={"v-pills-" + listId + "-tab"}>
        <h2>{listName}</h2>
        <p>Click on the items to mark them as done or undone</p>
        <div className="list-group">
          {items}
        </div>
      </div>


    );
  }
}
