import React from "react";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";
import axios from "axios";

function Logout(props) {
  const handleAxiosConfig = () => {
    const { connection } = props;
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
  const logout = async () => {
    if (props.user || props.connection) {
      // await axios.get("https://3.93.72.126/oadaauth/logout", handleAxiosConfig()) // cors error
      props.setConnectionObject(null);
      props.setUser(null);
      props.setAdminFlag(false);
      props.setCustomerFlag(false);
    }
  };
  return (
    <div>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setAdminFlag: (isAdmin) => dispatch(authActions.setAdminFlag(isAdmin)),
  setCustomerFlag: (isCustomer) => dispatch(authActions.setCustomerFlag(isCustomer)),
  setConnectionObject: (connection) =>
    dispatch(authActions.setConnectionObject(connection)),
  setUser: (user) => dispatch(authActions.setUser(user)),
});

const mapStateToProps = (state) => ({
  isAdmin: state.authReducer.isAdmin,
  isCustomer: state.authReducer.isCustomer,
  connection: state.authReducer.connection,
  user: state.authReducer.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
