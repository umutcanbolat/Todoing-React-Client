import React, { Component } from 'react';
import {TodoItem} from './TodoItem';

export class ListDetail extends Component{
  constructor (props) {
    super(props);
    this.deleteList = this.deleteList.bind(this);
    this.updateListData = this.updateListData.bind(this);
    this.orderListData = this.orderListData.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.handleFilterStatusChange = this.handleFilterStatusChange.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
    this.filterListData = this.filterListData.bind(this);
    this.state = {
      data: [],
      nonFilteredData: [],
      orderBy: "",
      filterByStatus: "",
      filterByName: ""
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
            data: responseJson,
            nonFilteredData: responseJson
          },
          () => {
              (() => { this.orderListData() })();
              (() => { this.filterListData() })();
          }

        );
      });

    }

  orderListData (){
    switch(this.state.orderBy) {
      case "itemName":
        var sortedData = [].concat(this.state.data).sort((a, b) => a.itemName > b.itemName);
        this.setState({
          data: sortedData
        });
        break;
      case "status":
        sortedData = [].concat(this.state.data).sort((a, b) => a.status > b.status);
        this.setState({
          data: sortedData
        });
        break;
      case "deadline":
        sortedData = [].concat(this.state.data).sort((a, b) => new Date(a.deadline.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) > new Date(b.deadline.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")));
        this.setState({
          data: sortedData
        });
        break;
      case "createDate":
        sortedData = [].concat(this.state.data).sort((a, b) => new Date(a.createDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) > new Date(b.createDate.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")));
        this.setState({
          data: sortedData
        });
        break;
      default:
        break;
    }
  }

  handleOrderSubmit(event){
    event.preventDefault();
    this.orderListData();
  }

  handleOrderChange(event){
    this.setState({
      orderBy: event.target.value
    });
  }

  filterListData(){
    let filteredData = this.state.data;
    if(this.state.filterByName !== ""){
      let filterByName = this.state.filterByName;
      filteredData = filteredData.filter(function(item){
        var patt = new RegExp(filterByName.toLowerCase());
        return patt.test(item.itemName);
      });
    }

    switch (this.state.filterByStatus) {
      case "completed":
        filteredData = filteredData.filter(function(item){
          return item.status;
        });
        break;
      case "notCompleted":
        filteredData = filteredData.filter(function(item){
          return !item.status;
        });
        break;
      case "expired":
        filteredData = filteredData.filter(function(item){
          return new Date(item.deadline.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")) < new Date() && !item.status;
        });
        break;
      default:
        break;
    }

    this.setState({
      data: filteredData
    });
  }

  handleFilterSubmit(event){
    event.preventDefault();
    this.setState({
      data: this.state.nonFilteredData
      },
      this.filterListData
    );
  }
  handleFilterStatusChange(event){
    this.setState({
      filterByStatus: event.target.value
    });
  }
  handleFilterNameChange(event){
    this.setState({
      filterByName: event.target.value
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
      return <TodoItem key={item.itemId} item={item} changeData={this.updateListData} />
    });

    return (

      <div className="tab-pane fade show" id={"v-pills-" + listId} role="tabpanel" aria-labelledby={"v-pills-" + listId + "-tab"}>
        <h2>{listName}
          <div className="btn-group pull-right" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-success btn-sm" data-toggle="modal" data-target={"#sortlist" + listId}>
              <i className="fa fa-sort"></i> Sort List
            </button>
            <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target={"#filterlist" + listId}>
              <i className="fa fa-filter"></i> Filter List
            </button>
            <button id={listId} onClick={this.deleteList} className="btn btn-danger btn-sm">
              <i className="fa fa-trash"></i> Delete List
            </button>
          </div>
          <form onSubmit={this.handleOrderSubmit} >
            <div className="modal fade" id={"sortlist" + listId}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Sort By</h5>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"radioName" + listId}>
                        <input type="radio" className="form-check-input" id={"radioName" + listId} name="orderRadio" value="itemName" checked={this.state.orderBy === "itemName"} onChange={this.handleOrderChange}/><h6>Name</h6>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"radioStatus" + listId}>
                        <input type="radio" className="form-check-input" id={"radioStatus" + listId} name="orderRadio" value="status" checked={this.state.orderBy === "status"} onChange={this.handleOrderChange}/><h6>Status</h6>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"radioDeadline" + listId}>
                        <input type="radio" className="form-check-input" id={"radioDeadline" + listId} name="orderRadio" value="deadline" checked={this.state.orderBy === "deadline"} onChange={this.handleOrderChange}/><h6>Deadline</h6>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"radioCrateDate" + listId}>
                        <input type="radio" className="form-check-input" id={"radioCrateDate" + listId} name="orderRadio" value="createDate" checked={this.state.orderBy === "createDate"} onChange={this.handleOrderChange}/><h6>Create date</h6>
                      </label>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success btn-sm" >Sort List</button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          <form onSubmit={this.handleFilterSubmit} >
            <div className="modal fade" id={"filterlist" + listId}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Filter</h5>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                    <div className="col-sm-6">
                    <h5>Filter by status:</h5>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"radioCompleted" + listId}>
                        <input type="radio" className="form-check-input" id={"radioCompleted" + listId} name="filterStatus" value="completed" checked={this.state.filterByStatus === "completed"} onChange={this.handleFilterStatusChange}/><h6>Completed</h6>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"radioNotCompleted" + listId}>
                        <input type="radio" className="form-check-input" id={"radioNotCompleted" + listId} name="filterStatus" value="notCompleted" checked={this.state.filterByStatus === "notCompleted"} onChange={this.handleFilterStatusChange}/><h6>Not Completed</h6>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"radioExpired" + listId}>
                        <input type="radio" className="form-check-input" id={"radioExpired" + listId} name="filterStatus" value="expired" checked={this.state.filterByStatus === "expired"} onChange={this.handleFilterStatusChange}/><h6>Expired</h6>
                      </label>
                    </div>
                    <div className="form-check">
                      <label className="form-check-label" htmlFor={"radioNone" + listId}>
                        <input type="radio" className="form-check-input" id={"radioNone" + listId} name="filterStatus" value="" checked={this.state.filterByStatus === ""} onChange={this.handleFilterStatusChange}/><h6>None</h6>
                      </label>
                    </div>
                    <br/>
                    </div>
                    <div className="col-sm-6">
                    <h5>Filter by name:</h5>
                    <input className="form-control form-control-sm" type="text" placeholder="item name" value={this.state.filterByName} onChange={this.handleFilterNameChange}/>
                    </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-info btn-sm">Filter List</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </h2>
        <p>Click on the items to mark them as <b className="disabled">done</b> or <b>undone</b>. Set deadlines to see when items are <b className="expired">expired</b>.</p>
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
        <AddItemForm listId={listId} changeData={this.updateListData} items={this.state.data}/>
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
    this.handleDepsChange = this.handleDepsChange.bind(this);
    this.addDependency = this.addDependency.bind(this);
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
        response.json().then(responseJson => {
          this.addDependency(responseJson.itemId);
        });

      }
    });
  }
  addDependency(itemId){
    const apiUrl = "http://localhost:8080/addDependency";
    var deps=this.state.dependencies;
    if(deps.length < 1){
      this.setState({
        itemName: "",
        list: this.props.listId,
        itemDesc: "",
        deadline: "",
        dependencies: []
      });
      this.props.changeData(this.state.list);
    }else{
      for(var dep in deps){
        var formData = new FormData();
          formData.append("todoItem", itemId);
          formData.append("dependentTo", deps[dep]);
          var request = {
            method: 'POST',
            body: formData
          };
        fetch(apiUrl, request).then(response =>{
            if(dep == deps.length-1){
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
    }
  }
  handleInputChange(e){
    const target = e.target;
      this.setState({
        [target.name]: target.value
      });
  }
  handleDepsChange(e){
    const target = e.target;
    var dependencies = [];
    for (var i = 0; i < target.options.length; i++) {
        if (target.options[i].selected) dependencies.push(target.options[i].value);
    }
    this.setState({
      dependencies: dependencies
    });
  }
  render(){
    const depItems = this.props.items.map(item => {
      return <option key={item.itemId} value={item.itemId}>{item.itemName}</option>;
    });
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
              <td><input type="text" className="form-control form-control-sm" name="itemName" placeholder="name" onChange={this.handleInputChange} value={this.state.itemName} required /></td>
              <td><input type="text" className="form-control form-control-sm" name="itemDesc" placeholder="description" onChange={this.handleInputChange} value={this.state.itemDesc} /></td>
              <td><input type="text" className="form-control form-control-sm" name="deadline" placeholder="23-01-2019" onChange={this.handleInputChange} value={this.state.deadline} required /></td>
              <td>
                <button type="button" className="btn btn-outline-primary  btn-sm" data-toggle="modal" data-target={"#addDependencyModal" + this.state.list}>
                  Add dependency
                </button>
                <div className="modal fade" id={"addDependencyModal" + this.state.list} role="dialog" aria-labelledby="Add Dependency" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="addDependencyModalLongTitle">Add Dependency</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <h6>Please select below the dependencies you want to add. You can use ctrl + click to choose multiple.</h6>
                        <select multiple value={this.state.dependencies} className="form-control" id="sel" onChange={this.handleDepsChange}>
                          {depItems}
                        </select>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td><button type="submit" className="btn btn-primary btn-sm">Create item</button>  </td>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }
}
