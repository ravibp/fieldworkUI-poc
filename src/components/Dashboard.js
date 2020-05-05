import React, { Component } from "react";
import { connect } from "react-redux";
// import * as authActions from "../actions/authActions";
import { Redirect } from "react-router-dom";

const oada = require("@oada/oada-cache");

class Dashboard extends Component {
  async componentDidMount() {
    // await this.login();
  }

  render() {
    const { isAdmin, isCustomer } = this.props;
    if (isAdmin) {
      return <Redirect to="/admin" />;
    } else if (isCustomer) {
      return <Redirect to="/customer" />;
    }

    return (
      <div>
        <h2>Dashboard</h2>
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
