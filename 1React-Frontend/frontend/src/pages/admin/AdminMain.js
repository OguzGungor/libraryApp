import React from "react";
import { Row, Col, Table, Button } from "antd";
import Title from "antd/lib/skeleton/Title";
import { Route, Switch, Redirect } from "react-router-dom";
import ManageBooks from "./books/ManageBooks";
import ManageAuthors from "./author/ManageAuthors";
import UserManageMain from "./users/UserManageMain";
import BookManageRoute from "./books/BookManageRoute";
import { roleRequest } from "../../util/LoginManager";

class AdminMain extends React.Component {
  state = {
    role: null,
    error: null,
  };

  back = () => {
    const { history, match } = this.props;

    history.push(`login`);
  };

  componentDidMount() {
    roleRequest()
      .then((role) => {
        this.setState({ role });
      })
      .catch((error) => this.setState({ error }));
  }

  render() {
    const { role, error } = this.state;
    if (this.state.role == "admin") {
      return (
        <Switch>
          <Route path="/admin/home">
            <h1>Home</h1>
            <body></body>
          </Route>
          <Route path="/admin/books" component={BookManageRoute} />
          <Route path="/admin/users" component={UserManageMain} />
          <Route path="/admin/authors" component={ManageAuthors} />
        </Switch>
      );
    } else if (this.state.role == "admin") {
      return (
        <div>
          <h1>Unauthorized Request for role:{role}</h1>
          <Button type="primary" onClick={this.back.bind(this)}>
            Back
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Unauthorized access,please Login</h1>
          <Button type="primary" onClick={this.back.bind(this)}>
            Login
          </Button>
        </div>
      );
    }
  }
}

export default AdminMain;

/**/
