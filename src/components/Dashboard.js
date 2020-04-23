import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
// import * as authActions from "../actions/authActions";
import { Redirect } from "react-router-dom";

// const oada = require("@oada/oada-cache");

class Dashboard extends Component {
  handleAxiosConfig = () => {
    const { connection } = this.props;
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (connection && connection.token) {
      axiosConfig.headers.Authorization = `Bearer ${connection.token}`;
    }
    return axiosConfig;
  };

  async componentDidMount() {
    // await this.login();
  }

  postResource = async () => {
    const response = await axios.put(
      "https://3.93.72.126/resources/a1r1",
      { a1r111: "a1r111" },
      this.handleAxiosConfig()
    );
  };
  getResource = async () => {
    const response = await axios.get(
      "https://3.93.72.126/resources/a1r1",
      this.handleAxiosConfig()
    );
  };
  getBookmarks = async () => {
    const response = await axios.get(
      "https://3.93.72.126/bookmarks",
      this.handleAxiosConfig()
    );
  };
  render() {
    let token = null;
    const { isAdmin } = this.props;
    if (isAdmin) {
      return <Redirect to="/admin" />;
    }

    return (
      <div>
        <h2>Dashboard</h2>
        <button onClick={() => this.postResource()}>POST resource</button>
        <button onClick={() => this.getResource()}>GET resource</button>
        <button onClick={() => this.getBookmarks()}>GET bookmarks</button>
        <button onClick={() => this.getCurrentUser()}>GET CurrentUser</button>
        <button onClick={() => window.localStorage.clear()}>
          Clear Localstorage
        </button>
      </div>
    );
  }
}
// const mapDispatchToProps = (dispatch) => ({
//   setAdminFlag: (flag) => dispatch(authActions.setAdminFlag(flag)),
//   setCustomerFlag: (flag) => dispatch(authActions.setCustomerFlag(flag)),
//   setConnectionObject: (connection) =>
//     dispatch(authActions.setConnectionObject(connection)),
// });

const mapStateToProps = (state) => ({
  isAdmin: state.authReducer.isAdmin,
  isCustomer: state.authReducer.isCustomer,
  connection: state.authReducer.connection,
});
export default connect(mapStateToProps)(Dashboard);
