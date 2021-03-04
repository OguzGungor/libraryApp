import React from "react";
import { Row, Col, Table, Button } from "antd";
import Title from "antd/lib/skeleton/Title";
import { Route, Switch } from "react-router-dom";
import { roleRequest } from "../../util/LoginManager";
import Books from "./books/Books";
import FavBooks from "./books/FavBooks";
import ReadBooks from "./books/ReadBooks";

class UserMain extends React.Component {
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
        console.log(role);
        this.setState({ role });
      })
      .catch((error) => this.setState({ error }));
  }
  render() {
    const { role, error } = this.state;
    if (this.state.role == "user") {
      return (
        <Switch>
          <Route path="/user/home">
            <h1>Home</h1>
            <body></body>
          </Route>
          <Route path="/user/books" component={Books} />
          <Route path="/user/favourites" component={FavBooks} />             
          <Route path="/user/readlist" component={ReadBooks} />         
        </Switch>
      );
    }else{
        return (
            <>
              <h1>Unauthorized Request for role :{role}</h1>
              <Button type="primary" onClick={this.back.bind(this)}>
                Back
              </Button>
            </>
          );
    }
  }
}

export default UserMain;
