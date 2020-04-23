import React from "react";
import * as authActions from "../../actions/authActions";
import axios from "axios";
import { connect } from "react-redux";

function Login(props) {
  const handleAxiosConfig = (token) => {
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    // if (token) {
    // axiosConfig.headers.Authorization = `Bearer ${tokenStr}`;
    // }

    return axiosConfig;
  };
  const connect = async () => {
    const connection = await axios.get("http://localhost:5000");
    if (connection && connection.data) {
      props.setConnectionObject(connection.data);
      return connection.data.token;
    }
  };
  const getCurrentUser = async (token) => {
    let user = null;
    const response = await axios.get(
      "https://3.93.72.126/users/me",
      handleAxiosConfig(token)
    );
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
    const token = await connect();
    if (token) {
      const user = await getCurrentUser(token);
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
