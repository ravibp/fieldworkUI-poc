import React from "react";
import * as authActions from "../../actions/authActions";
import { connect } from "react-redux";

function Logout(props) {
  const logout = () => {
    if (props.user || props.connection) {
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
