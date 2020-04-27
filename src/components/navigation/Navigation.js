import React from "react";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import * as authActions from "../../actions/authActions";
import axios from "axios";

const Navigation = (props) => {
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
  const getCurrentUser = async () => {
    const response = await axios.get(
      "https://3.93.72.126/users/me",
      handleAxiosConfig()
    );
    console.log("current user", response);
  };
  const postResource = async () => {
    const response = await axios.put(
      "https://3.93.72.126/resources/a1r1",
      { a1r111: "a1r111" },
      handleAxiosConfig()
    );
  };
  const getResource = async () => {
    const response = await axios.get(
      "https://3.93.72.126/resources/a1r1",
      handleAxiosConfig()
    );
  };
  const getBookmarks = async () => {
    const response = await axios.get(
      "https://3.93.72.126/bookmarks",
      handleAxiosConfig()
    );
  };
  const { user } = props;
  return (
    <div>
      {!user ? <Login /> : <Logout />}
      <button onClick={() => postResource()}>POST resource</button>
      <button onClick={() => getResource()}>GET resource</button>
      <button onClick={() => getBookmarks()}>GET bookmarks</button>
      <button onClick={() => getCurrentUser()}>GET CurrentUser</button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    connection: state.authReducer.connection,
  };
};
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(authActions.setUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
