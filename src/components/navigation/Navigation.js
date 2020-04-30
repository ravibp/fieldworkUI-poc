import React from "react";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import { connect } from "react-redux";
import * as authActions from "../../actions/authActions";
import axios from "axios";

const Navigation = (props) => {
  const getCurrentUser = async () => {
    const response = await axios.get("https://3.93.72.126/users/me");
    console.log("current user", response);
  };
  let tree = {
    bookmarks: {
      //Represents a user's "home" directory
      _type: "application/vnd.oada.bookmarks.1+json",
      _rev: 0,
      crops: {
        _type: "application/vnd.oada.todoList.1+json",
        _rev: 0,
        cropsList: {
          _type: "application/vnd.oada.todoList.1+json",
          _rev: 0,
          "*": {
            _type: "application/vnd.oada.todoList.1+json",
            _rev: 0,
          },
        },
      },
    },
  };

  const postResource = async () => {
    const response = await axios.put("https://3.93.72.126/resources/a1r1", {
      a1r111: "a1r111",
    });
  };
  const getResource = async () => {
    const response = await axios.get("https://3.93.72.126/resources/a1r1");
    console.log("getResource", response);
  };
  const getBookmarks = async () => {
    const path = "/bookmarks/crops/cropsList";
    const response = await props.connection.get({ path });
    console.log("getBookmarks", response);
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
