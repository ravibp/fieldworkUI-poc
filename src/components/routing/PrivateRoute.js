import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAdmin ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

PrivateRoute.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAdmin: state.authReducer.isAdmin,
});

export default connect(mapStateToProps)(PrivateRoute);
