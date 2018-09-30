import React, { Component } from 'react';
import {TodoItem} from './TodoItem';

export class ListDetail extends Component{
  constructor (props) {
    super(props);
    this.deleteList = this.deleteList.bind(this);
    this.updateListData = this.updateListData.bind(this);
    this.state = {
      data: []
    };
  }

  componentDidMount () {

      this.updateListData(this.props.list.listId);
    }

    updateListData (listId){
      const apiUrl = 'http://localhost:8080/getAllItemsByListId';

      fetch(apiUrl + "/" +listId)
        .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              data: responseJson
            });
          });
    }

  deleteList(e){
    const deleteUrl = "http://localhost:8080/deleteTodoList";
    fetch(deleteUrl + '/' + e.target.id, {
      method: 'delete'
    }).then(response => {
        if (response.ok) {
          this.props.changeData();
        }

      });
  }

  render(){

    let listId = this.props.list.listId;
    let listName = this.props.list.listName;
    const items = this.state.data.map(item => {
      return <TodoItem item={item} changeData={this.updateListData} />
    });

    return (

      <div className="tab-pane fade show" id={"v-pills-" + listId} role="tabpanel" aria-labelledby={"v-pills-" + listId + "-tab"}>
        <h2>{listName} <button id={listId} onClick={this.deleteList} className="btn btn-danger btn-sm pull-right">
          <i className="fa fa-trash"></i> Delete List</button></h2>
        <p>Click on the items to mark them as done or undone</p>


        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Deadline</th>
              <th scope="col">Dependencies</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {items}

            </tbody>
          </table>

        <AddItemForm listId={listId} changeData={this.updateListData} />

      </div>


    );
  }
}

class AddItemForm extends Component{
  constructor (props) {
    super(props);
    this.state = {
      itemName: "",
      list: this.props.listId,
      itemDesc: "",
      deadline: "",
      dependencies: []
    };

    this.addItem = this.addItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  addItem(e){
    const apiUrl = "http://localhost:8080/addItem";
    e.preventDefault();



    var params = this.state;

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
          itemName: "",
          list: this.props.listId,
          itemDesc: "",
          deadline: "",
          dependencies: []
        });
        this.props.changeData(this.state.list);
      }

    });
  }

  handleInputChange(e){
    const target = e.target;
      this.setState({
        [target.name]: target.value
      });

    }

  render(){
    return(
      <form onSubmit={this.addItem}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Deadline</th>
            <th scope="col">Dependencies</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        <tr>

          <td><input type="text" className="form-control form-control-sm" name="itemName" placeholder="name" onChange={this.handleInputChange} value={this.state.itemName} /></td>
          <td><input type="text" className="form-control form-control-sm" name="itemDesc" placeholder="description" onChange={this.handleInputChange} value={this.state.itemDesc} /></td>
          <td><input type="text" className="form-control form-control-sm" name="deadline" placeholder="23-01-2019" onChange={this.handleInputChange} value={this.state.deadline} /></td>
          <td> add dependency</td>
          <td><button type="submit" className="btn btn-primary btn-sm">Add</button>  </td>

        </tr>
        </tbody>
      </table>
      </form>
    );
  }
}
