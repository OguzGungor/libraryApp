import React from "react";
import { Row, Col, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import { Route, Switch } from "react-router-dom";
import UserSpecification from "./UserSpecification";
import ManageUsers from "./ManageUsers";

class UserManageMain extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/admin/users/addUser" component={UserSpecification} />
        <Route path="/admin/users" component={ManageUsers} />
      </Switch>
    );
  }
}

export default UserManageMain;
