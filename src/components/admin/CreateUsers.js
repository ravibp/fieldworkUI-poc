import React, { Component } from "react";
import axios from "axios";

export default class CreateUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        password: "",
      },
    };
  }
  handleChange = (event) => {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  };
  getUser = async () => {
    const { connection } = this.props;

    const path = "/bookmarks/users/74491d2c-3ee4-494a-a8ce-0acb887cd5dc";

    const response = await connection.get({ path });
    console.log("all crops", response);
  };
  addUser = async (event) => {
    event.preventDefault();
    const { username, password } = this.state.user;
    const { connection } = this.props;
    const headers = { "Content-Type": "application/json" };
    // generate crop resource and get the resource id
    let path = "/users/";
    let data = {
      username,
      password,
    };
    let response = await connection.post({ path, data, headers });
  };
  render() {
    return (
      <div>
        CreateUsers
        <form>
          <input
            placeholder="user name"
            type="text"
            name="username"
            value={this.state.user.username}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={this.state.user.password}
            onChange={this.handleChange}
          />
          <button onClick={this.addUser}>Add User</button>
        </form>
        <button onClick={this.getUser}>Get User</button>
      </div>
    );
  }
}
