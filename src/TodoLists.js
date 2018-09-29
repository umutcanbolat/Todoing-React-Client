import React, { Component } from 'react';
import {TodoList} from './TodoList';
import {ListDetail} from './ListDetail';

export class TodoLists extends Component {
  render () {
    const lists = this.props.data.map(list => {
      return <TodoList list={list} />

    });

    const listDetails = this.props.data.map(list => {
      return <ListDetail list={list} />

    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

              {lists}

            </div>
          </div>
          <div className="col-sm-8">
            <div className="tab-content" id="v-pills-tabContent">

              {listDetails}

            </div>
          </div>
        </div>
      </div>
    );

  }
}