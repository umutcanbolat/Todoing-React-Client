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
    const icon_times = <i className="fa fa-times"></i>;

    const dependentItems = this.props.item.dependencies.map(dep => {
      return <DependentItem itemId={dep.dependentTo} />

    });

    var show_deps_button = (
      <div>
        <button type="button" className="btn btn-outline-primary  btn-sm" data-toggle="modal" data-target={"#showDependencyModal" + this.props.item.itemId}>
          Show dependencies
        </button>
        <div className="modal fade" id={"showDependencyModal"  + this.props.item.itemId} tabindex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="showDependencyModalLongTitle">Dependencies</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul>{dependentItems}</ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <tr className={this.props.item.status ? "disabled" : "umut"}>
        <td onClick={this.changeItemStatus}>{this.props.item.itemName}</td>
        <td onClick={this.changeItemStatus}>{this.props.item.itemDesc}</td>
        <td onClick={this.changeItemStatus}>{this.props.item.deadline}</td>
        <td>{this.props.item.dependencies.length > 0 ? show_deps_button : "-"}</td>
        <td><button onClick={this.deleteItem} className="btn btn-outline-danger btn-sm">{icon_times}</button></td>
      </tr>
    );
  }
}

class DependentItem extends Component{
  constructor(props){
    super(props);
    this.getDependentDetails = this.getDependentDetails.bind(this);
    this.state = {
      depDetail: ""
    };
  }

  componentDidMount(){
    this.getDependentDetails();
  }

  getDependentDetails(){
    const apiUrl = 'http://localhost:8080/getItemById?itemId=' + this.props.itemId;
    fetch(apiUrl)
      .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            depDetail: responseJson.itemName
          });
        });
  }

  render(){
    return(
      <li>{this.state.depDetail}</li>
    );
  }
}
