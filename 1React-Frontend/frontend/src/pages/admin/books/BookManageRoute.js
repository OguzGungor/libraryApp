import React from "react";
import { Row, Col, Table } from "antd";

import { Route, Switch } from "react-router-dom";
import BookSpecification from "./BookSpecification";
import ManageBooks from "./ManageBooks";

class BookManageRoute extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/admin/books/addBook" component={BookSpecification} />
        <Route path="/admin/books" component={ManageBooks} />
      </Switch>
    );
  }
}

export default BookManageRoute;
