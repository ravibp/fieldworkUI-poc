import React, { Fragment } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navigation from "./components/navigation/Navigation";

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* Field Crop App */}
        <Fragment>
          <div className="app-title">
            <h1>Field Work App</h1>
          </div>
          <Navigation />
          <Switch>
            <Route exact path="/" render={() => <Dashboard />} />
            <PrivateRoute path="/admin" component={AdminDashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
