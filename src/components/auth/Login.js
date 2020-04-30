import React, { useEffect } from "react";
import * as authActions from "../../actions/authActions";
import axios from "axios";
import { connect } from "react-redux";
const oada = require("@oada/oada-cache");

function Login(props) {
  useEffect(() => {
    console.log("use effect did mount");
    login();
  }, []);
  const connect = async () => {
    const connection = await props.initializeConnection();
    if (connection && connection.token) {
      return connection;
    }
  };
  const getCurrentUser = async (connection) => {
    console.log("connection", connection);

    let user = null;
    const response = await connection.get({
      path: "/users/me",
    });
    console.log("user", response);

    const ADMINS = ["users/default:users_frank_123", "users/1809301"];
    if (response && response.status === 200 && response.data) {
      user = response.data;
      if (ADMINS.includes(response.data._id)) {
        props.setAdminFlag(true);
        props.setCustomerFlag(false);
      } else {
        props.setAdminFlag(false);
        props.setCustomerFlag(true);
      }
    } else {
      props.setAdminFlag(false);
      props.setCustomerFlag(false);
    }
    return user;
  };
  const login = async () => {
    const connection = await connect();

    if (connection && connection.token) {
      const user = await getCurrentUser(connection);
      props.setUser(user);
    }
  };

  return (
    <div>
      <button onClick={() => login()}>login</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setAdminFlag: (isAdmin) => dispatch(authActions.setAdminFlag(isAdmin)),
  setCustomerFlag: (isCustomer) =>
    dispatch(authActions.setCustomerFlag(isCustomer)),
  setConnectionObject: (connection) =>
    dispatch(authActions.setConnectionObject(connection)),
  setUser: (user) => dispatch(authActions.setUser(user)),
  initializeConnection: (user) =>
    dispatch(authActions.initializeConnection(user)),
});

const mapStateToProps = (state) => {
  return {
    isAdmin: state.authReducer.isAdmin,
    isCustomer: state.authReducer.isCustomer,
    connection: state.authReducer.connection,
    user: state.authReducer.user,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
