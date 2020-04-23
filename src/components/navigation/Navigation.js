import React from "react";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import * as authActions from "../../actions/authActions";

const Navigation = (props) => {
  const { user } = props;
  return <div>{!user ? <Login /> : <Logout />}</div>;
};
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(authActions.setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
