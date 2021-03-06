import React, { PureComponent, useState } from "react";
import { useHistory, useRouteMatch, withRouter } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Input, Button, Row, Col, Form, Table } from "antd";
import Title from "antd/lib/skeleton/Title";
import { getBooks } from "../../../util/admin/Books";
import { getUsers, removeUser } from "../../../util/admin/Users";

class ManageUsers extends PureComponent {
  addHandler = () => {
    const { history, match } = this.props;

    history.push(`${match.url}/addUser`);
  };

  updateHandler = (id) => {
    const { history, match } = this.props;

    history.push(`${match.url}/addUser?bookid=${id}`);
  };

  removeHandler = (id) => {
    const { history, match } = this.props;
    removeUser(id).then((result) => {
      alert(result);
      window.location.reload(false);
    });
  };

  state = {
    users: [{}],
    isLoading: true,
    error: null,
  };

  columns = [
    {
      title: "image",
      dataIndex: "image",
      render :(image) =><img alt={image} src={image} width ="50"/>      
    },
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "role",
      dataIndex: "role",
    },
    {
      title: "name",
      dataIndex: "name",
    },
    {
      title: "",
      dataIndex: "action",
      render: (id) => (
        <div>
          <Button id={id} onClick={this.updateHandler.bind(this, id)}>
            update
          </Button>
          <Button id={id} onClick={this.removeHandler.bind(this, id)}>
            remove
          </Button>
        </div>
      ),
    },
  ];


  componentDidMount() {
    getUsers()
      .then((users) => {
        let data = [];

        users.map((user, index) => {
          data.push({
            key: user.id,
            id: user.id,
            name: user.name, 
            role : user.role,           
            image : (user.image != "null") ? (user.image):("data:image/png;base64,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"),
            action: user.id,
          });
          return data;
        });
        this.setState({
          users: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }
  search() {
    getUsers(document.getElementById("searchBox").value)
      .then((users) => {
        let data = [];

        users.map((user, index) => {
          data.push({
            key: user.id,
            id: user.id,
            name: user.name, 
            role : user.role,           
            image : (user.image != "null")? (user.image):("data:image/png;base64,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"),
            action: user.id,
          });
          return data;
        });
        this.setState({
          users: data,
          isLoading: false,
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }

  render() {
    const { isLoading, users, error } = this.state;

    return (
      <React.Fragment>
        {!isLoading ? (
          error ? (
            `An error occured : ${error}`
          ) : (
            <>
              <Input
                id="searchBox"
                type="text"
                onChange={this.search.bind(this)}
              />
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Title level={2}>UserList</Title>
                </Col>
              </Row>
              <Row glutter={[40, 0]}>
                <Col span={24}>
                  <Table columns={this.columns} dataSource={users} />
                </Col>
              </Row>
              <Button onClick={this.addHandler.bind(this)}>Add New User</Button>
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(ManageUsers);


