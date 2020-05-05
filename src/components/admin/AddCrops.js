import React, { Component } from "react";

export default class AddCrops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cropDetails: {
        cropName: "",
        recommendations: {},
        subcriptions: {},
      },
    };
  }
  handleChange = (event) => {
    const cropDetails = { ...this.state.cropDetails };
    cropDetails[event.target.name] = event.target.value;
    this.setState({ cropDetails });
  };
  getAllCrops = async () => {
    const { connection } = this.props;
    
    const path = "/bookmarks/crops/cropsList";
    const tree = {
      bookmarks: {
        //Represents a user's "home" directory
        _type: "application/vnd.oada.bookmarks.1+json",
        _rev: 0,
        crops: {
          _type: "application/vnd.oada.todoList.1+json",
          _rev: 0,
          cropsList: {
            _type: "application/vnd.oada.todoList.1+json",
            _rev: 0,
            "*": {
              _type: "application/vnd.oada.todoItem.1+json",
              _rev: 0,
            },
          },
        },
      },
    };
    const response = await connection.get({ path, tree });
    console.log("all crops", response);
  };
  addCrop = async (event) => {
    event.preventDefault();
    const { cropName, recommendations, subcriptions } = this.state.cropDetails;
    const { connection } = this.props;
    const headers = { "Content-Type": "application/json" };
    // generate crop resource and get the resource id
    let path = "/resources/";
    let data = {
      cropName,
      recommendations,
      subcriptions,
    };
    let response = await connection.post({ path, data, headers });
    const resourceID = response.headers["content-location"].slice(1);

    // link the resource with a POST request to cropsList
    path = "/resources/crops/cropsList";
    data = { _id: resourceID };
    response = await connection.post({ path, data, headers });
    console.log("post crop", response);
    this.getAllCrops();
  };
  render() {
    return (
      <div>
        AddCrops
        <form>
          <input
            placeholder="crop name"
            name="cropName"
            value={this.state.cropDetails.cropName}
            onChange={this.handleChange}
          />
          <button onClick={this.addCrop}>Add Crop</button>
        </form>
        <button onClick={this.getAllCrops}>Get all Crops</button>
      </div>
    );
  }
}
