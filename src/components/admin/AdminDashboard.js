import React, { Component } from "react";
import AddCrops from "./AddCrops";
import { connect } from "react-redux";
import * as authActions from "../../actions/authActions";

class AdminDashboard extends Component {
  render() {
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <AddCrops {...this.props}/>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setAdminFlag: (isAdmin) => dispatch(authActions.setAdminFlag(isAdmin)),
  // setCustomerFlag: (isCustomer) =>
  //   dispatch(authActions.setCustomerFlag(isCustomer)),
  // setConnectionObject: (connection) =>
  //   dispatch(authActions.setConnectionObject(connection)),
  // setUser: (user) => dispatch(authActions.setUser(user)),
});

const mapStateToProps = (state) => ({
  // isAdmin: state.authReducer.isAdmin,
  // isCustomer: state.authReducer.isCustomer,
  connection: state.authReducer.connection,
  // user: state.authReducer.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
